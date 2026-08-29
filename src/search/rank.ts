/**
 * SEARCH V2 · S3 — RANK (pure, deterministic, ≤40 ms for 60 cands).
 *
 *   score = 3.0 · providerRank        (position decay 1.0 → 0.15)
 *         + 2.5 · queryMatch          (title-token coverage)
 *         + 2.0 · artistMatch         (FULL artist list, 1.0 per token)
 *         + 1.0 · personalization     (artistAffinity, capped; mutes demote)
 *         + 1.2 · engagement          (past clicks for THIS query, cap 1.2)
 *         + 0.5 · quality             (playCount/320k/preview)
 *         + lyricBonus                (lyric mode: +2.0 V2 / +1.0 V1)
 *
 *   NOTE (plan §5.4 amendment, S8 bar): engagement weight/cap are 1.2,
 *   not 0.8 — the S8 bar requires 2 fresh clicks to beat provider-rank
 *   deltas. The 21-day half-life decay + 1.2 cap + provider 3.0 weight
 *   keep explicit intent above taste; ruts still decay out.
 *
 * The DISAMBIGUATION OVERRIDE (P3 fix, test-locked): when the plan
 * carries artistTokens, rows with artistMatch=0 are hard-capped below
 * every artistMatch≥1 row. Ties break by (score, trackId) — same-query
 * determinism is replay-tested.
 *
 * Reason lines come from a CLOSED set (MINDBEAT house rule).
 */

import type { Track } from '../types';
import type { SearchPlan } from './plan';
import type { Candidate } from './verify';
import { normalizeQuery } from './normalize';

export type SearchReasonCode =
  | 'MATCHES_SEARCH'
  | 'LYRIC_MATCH'
  | 'YOU_LISTEN'
  | 'YOUR_PAST_CLICK'
  | 'PROVIDER_TOP';

export const REASON_LINES: Record<SearchReasonCode, string> = {
  MATCHES_SEARCH: 'Best match for your search',
  LYRIC_MATCH: 'Matches the lyric you typed',
  YOU_LISTEN: 'You listen to this artist a lot',
  YOUR_PAST_CLICK: 'You chose this for this search before',
  PROVIDER_TOP: 'Top result from the catalog',
};

export interface RankContext {
  /** normalized-query → trackId → engagement score (0..1, decayed) */
  engagement?: Record<string, number>;
  /** artist (lowercased) → affinity 0..N */
  artistAffinity?: Record<string, number>;
  /** lowercased muted artist names — demoted hard */
  mutedArtists?: Set<string>;
  now?: number;
}

export interface RankedRow extends Candidate {
  score: number;
  artistMatch: number;
  queryMatch: number;
  reasonCode: SearchReasonCode;
}

function providerRankScore(poolRank: number): number {
  // 1.0 at rank 0 → 0.15 at rank 29 (smooth decay)
  return Math.max(0.15, 1.0 * Math.pow(0.91, poolRank));
}

/** Query-token coverage across the row's title AND artist names — a row
 *  is relevant when the user's words match what the row IS (title) or
 *  WHO made it (artists). Artist-name searches must never zero out. */
function titleCoverage(plan: SearchPlan, row: Candidate): number {
  const STOP = new Set(['from', 'the', 'a', 'an']);
  const hay = new Set(
    `${row.title} ${row.artistsFull?.join(' ') ?? row.artist} ${row.featuredArtists?.join(' ') ?? ''}`
      .toLowerCase()
      .split(/[^a-z0-9\u0900-\u097f]+/),
  );
  const wanted = plan.tokens.filter((t) => t.length >= 2 && !STOP.has(t));
  if (wanted.length === 0) return 0;
  let hits = 0;
  for (const t of wanted) {
    if (hay.has(t)) hits += 1;
  }
  return Math.min(1, hits / wanted.length);
}

function artistMatchScore(plan: SearchPlan, row: Candidate): number {
  if (plan.artistTokens.length === 0) return 0;
  const hay = normalizeQuery(
    `${row.artistsFull?.join(' ') ?? row.artist} ${row.featuredArtists?.join(' ') ?? ''}`,
  );
  let score = 0;
  for (const a of plan.artistTokens) {
    if (hay.includes(a)) score += 1;
  }
  return score;
}

/** Fraction of the row's TITLE tokens the query actually asked for —
 *  "Tum Hi Ho Bandhu" for query "tum hi ho" = 3/4 = 0.75; an exact
 *  "Tum Hi Ho" title = 1.0. Distinguishes the song from its neighbors. */
function titlePrecision(plan: SearchPlan, row: Candidate): number {
  const STOP = new Set(['from', 'the', 'a', 'an', 'vol']);
  const wanted = new Set(plan.tokens.filter((t) => t.length >= 2 && !STOP.has(t)));
  const titleTokens = normalizeQuery(row.title)
    .split(' ')
    .filter((t) => t.length >= 2 && !STOP.has(t));
  if (titleTokens.length === 0) return 0;
  let matched = 0;
  for (const t of titleTokens) {
    if (wanted.has(t)) matched += 1;
  }
  return matched / titleTokens.length;
}

function personalization(ctx: RankContext, row: Candidate): number {
  const aff = ctx.artistAffinity ?? {};
  const list = row.artistsFull?.length ? row.artistsFull : [row.artist];
  let best = 0;
  for (const a of list) {
    const v = aff[a.toLowerCase()] ?? 0;
    if (v > best) best = v;
  }
  const capped = Math.min(best, 2.5) / 2.5;
  if (ctx.mutedArtists) {
    for (const a of list) {
      if (ctx.mutedArtists.has(a.toLowerCase())) return -0.5;
    }
  }
  return capped;
}

function qualityScore(row: Candidate): number {
  let q = 0;
  if (row.playCount && row.playCount > 0) q += Math.min(1, Math.log10(row.playCount) / 9);
  if (row.has320 !== false && row.source === 'saavn') q += 0.15;
  if (!row.previewOnly) q += 0.15;
  return q;
}

/** Rank the verified set for a plan. Pure + deterministic. */
export function rankRows(
  plan: SearchPlan,
  rows: Candidate[],
  ctx: RankContext = {},
  lyricVerdicts?: Map<string, { matched: boolean; line: string }>,
): RankedRow[] {
  const scored: RankedRow[] = rows.map((row) => {
    const pr = providerRankScore(row.poolRank);
    const qm = titleCoverage(plan, row);
    const am = artistMatchScore(plan, row);
    const pers = personalization(ctx, row);
    const eng = Math.min(1.2, ctx.engagement?.[row.id] ?? 0);
    const qual = qualityScore(row);
    // TITLE PRECISION (S2 fix): rows whose titles carry EXTRA tokens the
    // query didn't ask for ("Tum Hi Ho Bandhu" for "tum hi ho") score
    // below exact-alignment titles — precision = matched tokens / title
    // tokens (1.0 for an exact title).
    const precision = titlePrecision(plan, row);
    const v1 = plan.kind === 'lyric_fragment' ? snippetEchoProxy(plan, row) : 0;
    const v2 = lyricVerdicts?.get(row.id)?.matched ? 1 : 0;
    const lyricBonus = plan.kind === 'lyric_fragment' ? v2 * 2.0 + v1 * 1.0 : 0;
    const score =
      3.0 * pr +
      2.5 * qm * (0.55 + 0.45 * precision) +
      2.0 * am +
      1.0 * pers +
      1.2 * eng + // S8 bar amendment: 2 clicks MUST beat provider-rank deltas
      0.5 * qual +
      lyricBonus;
    return {
      ...row,
      score,
      artistMatch: am,
      queryMatch: qm,
      reasonCode: pickReason(plan, { v2, v1, pers, eng, pr, am }),
    };
  });

  // DISAMBIGUATION OVERRIDE: with artistTokens in the plan, artistMatch=0
  // rows can never outrank artistMatch≥1 rows.
  if (plan.artistTokens.length > 0) {
    const cap = scored
      .filter((r) => r.artistMatch >= 1)
      .reduce((m, r) => Math.min(m, r.score), Number.POSITIVE_INFINITY);
    if (Number.isFinite(cap)) {
      for (const r of scored) {
        if (r.artistMatch === 0 && r.score >= cap) r.score = cap - 0.001;
      }
    }
  }

  // deterministic order: score desc, then trackId asc
  scored.sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return scored;
}

function snippetEchoProxy(plan: SearchPlan, row: Candidate): number {
  // same math as verify.snippetEcho but local to keep rank pure (no
  // import cycle; verified equal by test)
  const frag = new Set(
    normalizeQuery(plan.normalized)
      .split(' ')
      .filter((t) => t.length >= 3),
  );
  if (frag.size === 0) return 0;
  const hay = new Set(`${row.lyricsSnippet ?? ''} ${row.title}`.toLowerCase().split(/\W+/));
  let hits = 0;
  frag.forEach((t) => {
    if (hay.has(t)) hits += 1;
  });
  return hits / frag.size;
}

function pickReason(
  plan: SearchPlan,
  s: { v2: number; v1: number; pers: number; eng: number; pr: number; am: number },
): SearchReasonCode {
  if (plan.kind === 'lyric_fragment' && s.v2 > 0) return 'LYRIC_MATCH';
  if (s.eng >= 0.5) return 'YOUR_PAST_CLICK';
  if (s.pers >= 0.4) return 'YOU_LISTEN';
  if (s.am >= 1 || s.v1 >= 0.5 || s.pr >= 0.99) return 'MATCHES_SEARCH';
  return 'PROVIDER_TOP';
}

/** Attach the closed-set reason line text to the track for display. */
export function withReasonLines(rows: RankedRow[]): Track[] {
  return rows.map((r) => ({
    ...r,
    reason: REASON_LINES[r.reasonCode],
    reasonCode: r.reasonCode,
  }));
}
