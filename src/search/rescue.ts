/**
 * SEARCH V2 · SIG RESCUE (SEARCH-INTENT-RESCUE-PLAN §3.5, M3/M4).
 *
 * When a specific-intent query (song + artist) produced no row matching
 * BOTH axes, the engine must escalate instead of painting confidently
 * wrong results. Rungs, first hit wins:
 *
 *   R0 youtube  — full-length playback, the user's priority over 30 s
 *                 previews; dual-verified + stream-resolvable
 *   R1 itunes   — 30 s preview fallback (truthfully labelled)
 *   R3 variants — re-probe JioSaavn with orthographic spellings
 *                 ("tu chaiye" → "tu chahiye") for the reachable-miss
 *                 class
 *   R2 album    — search the album route for the exists-but-not-in-song-
 *                 search catalog class (full length)
 *
 * All providers are INJECTED — the engine orchestrator passes its real
 * implementations, tests pass fixtures. No rung ever throws; failures
 * degrade to "no row", which the orchestrator turns into an honest
 * S-PARTIAL / S-ZERO state.
 */

import type { Track } from '../types';
import type { SearchPlan } from './plan';
import { artistContains } from './rank';
import { titleQueryTokens } from './rank';
import { normalizeQuery } from './normalize';
import { searchSaavn } from '../api/saavn';
import { searchItunes } from '../api/itunes';
import { ytSearchMusic, ytStreamUrlForTrack, ytAvailable } from '../api/youtube';
import { searchAlbumResults, getAlbumTracks } from '../api/saavn';

export type RescueRung = 'youtube' | 'itunes' | 'variant' | 'album';

export interface RescueDeps {
  disabled?: () => boolean;
  signal?: AbortSignal;
  /** deadline for the WHOLE ladder (ms epoch) — rungs check before firing */
  deadline?: number;
}

export interface RescueOutcome {
  tracks: Track[];
  rung?: RescueRung;
  /** which rungs were attempted (for the ledger + honest-zero copy) */
  attempted: RescueRung[];
}

/** SIG M3 — is the specific intent still unmet after the first rank? */
export function sigUnmet(plan: SearchPlan, rows: Array<{ artistMatch: number; queryMatch: number }>): boolean {
  if (plan.kind !== 'artist_title' || plan.artistTokens.length === 0) return false;
  if (rows.length === 0) return true;
  return !rows.some((r) => r.artistMatch >= 1 && r.queryMatch >= 0.5);
}

/** Dual-axis verification for rescue rows (the rescue row must be the
 *  song the user asked for — same bar as a native S-HIT row). */
export function verifyRescueRow(plan: SearchPlan, track: Track): boolean {
  if (!plan.artistTokens.length) return true;
  const titleTokens = titleQueryTokens(plan);
  const hay = new Set(
    normalizeQuery(track.title)
      .split(/[^a-z0-9\u0900-\u097f]+/)
      .filter(Boolean),
  );
  const hits = titleTokens.filter((t) => hay.has(t)).length;
  const titleOk = titleTokens.length > 0 && hits / titleTokens.length >= 0.5;
  const credits = track.artistsFull?.length ? track.artistsFull : track.artist.split(/,\s*/);
  const artistOk = plan.artistTokens.some((a) =>
    credits.some((c) => artistContains(normalizeQuery(c), a)),
  );
  return titleOk && artistOk;
}

function within(deadline: number | undefined): boolean {
  return deadline === undefined || Date.now() < deadline;
}

function mark(track: Track, rung: RescueRung): Track {
  return { ...track, rescued: true, rescueRung: rung };
}

/** R0 — YouTube full-length: search → verify → resolve stream. */
async function rungYoutube(plan: SearchPlan, deps: RescueDeps): Promise<Track[]> {
  if (!ytAvailable() || !within(deps.deadline)) return [];
  const q = `${plan.titleTokens.join(' ')} ${plan.artistTokens.join(' ')}`.trim();
  if (!q) return [];
  const res = await ytSearchMusic(q, 10, deps.signal).catch(() => ({ tracks: [] as Track[] }));
  const verified = (res.tracks ?? []).filter((t) => verifyRescueRow(plan, t));
  if (verified.length === 0) return [];
  // resolve the best row's stream — an unrescuable row helps nobody
  for (const t of verified.slice(0, 3)) {
    const url = await ytStreamUrlForTrack(t).catch(() => null);
    if (url) {
      return [{ ...t, streamUrl: url } as Track & { streamUrl: string }].map((x) => mark(x, 'youtube'));
    }
  }
  return [];
}

/** R1 — iTunes preview: search → verify. */
async function rungItunes(plan: SearchPlan, deps: RescueDeps): Promise<Track[]> {
  if (!within(deps.deadline)) return [];
  const q = `${plan.titleTokens.join(' ')} ${plan.artistTokens.join(' ')}`.trim();
  if (!q) return [];
  const rows = await searchItunes(q, 10, deps.signal).catch(() => [] as Track[]);
  return rows.filter((t) => verifyRescueRow(plan, t)).map((t) => mark(t, 'itunes'));
}

/** R3 — variant spellings against JioSaavn (the reachable-miss class). */
async function rungVariant(plan: SearchPlan, deps: RescueDeps): Promise<Track[]> {
  if (!within(deps.deadline)) return [];
  const variants = plan.variants.length > 0 ? plan.variants : [];
  for (const v of variants.slice(0, 2)) {
    const q = plan.artistTokens.length ? `${v} ${plan.artistTokens.join(' ')}` : v;
    const rows = await searchSaavn(q, 15, deps.signal).catch(() => [] as Track[]);
    const verified = rows.filter((t) => verifyRescueRow(plan, t));
    if (verified.length > 0) return verified.map((t) => mark(t, 'variant'));
  }
  return [];
}

/** R2 — album route (full length; exists-but-not-in-song-search class). */
async function rungAlbum(plan: SearchPlan, deps: RescueDeps): Promise<Track[]> {
  if (!within(deps.deadline)) return [];
  const q = plan.artistTokens.length ? plan.artistTokens.join(' ') : plan.titleTokens.join(' ');
  const albums = await searchAlbumResults(q, 3, deps.signal).catch(() => []);
  for (const alb of albums.slice(0, 3)) {
    if (!within(deps.deadline)) break;
    const tracks = await getAlbumTracks(alb.id).catch(() => [] as Track[]);
    const verified = tracks.filter((t) => verifyRescueRow(plan, t));
    if (verified.length > 0) return verified.map((t) => mark(t, 'album'));
  }
  return [];
}

const RUNGS: Array<{ rung: RescueRung; fire: (plan: SearchPlan, deps: RescueDeps) => Promise<Track[]> }> = [
  { rung: 'youtube', fire: rungYoutube },
  { rung: 'itunes', fire: rungItunes },
  { rung: 'variant', fire: rungVariant },
  { rung: 'album', fire: rungAlbum },
];

/**
 * Run the ladder. First rung producing ≥1 verified row wins. Never
 * throws; never runs past `deadline` (default: 3 s from call).
 */
export async function runRescueLadder(plan: SearchPlan, deps: RescueDeps = {}): Promise<RescueOutcome> {
  const deadline = deps.deadline ?? Date.now() + 3000;
  const attempted: RescueRung[] = [];
  for (const { rung, fire } of RUNGS) {
    if (deps.signal?.aborted || !within(deadline)) break;
    attempted.push(rung);
    try {
      const tracks = await fire(plan, { ...deps, deadline });
      if (tracks.length > 0) return { tracks, rung, attempted };
    } catch {
      /* rung failure = no row; the ladder keeps climbing */
    }
  }
  return { tracks: [], attempted };
}
