/**
 * YT TAB TITLE-TRUTH (v3.4.0-lab.5 — the "Lo-Fi Mix as Top result" fix).
 *
 * The YouTube tab paints `ytSearchMusic` output directly, and YT Music's
 * own ordering is ENGAGEMENT-first: for "tu chaiye" it returns a Lo-Fi
 * Mix (188K views) inside the Top-result card, REMIXes above the official
 * recording, and — through the recursive shelf walker — Episode/Podcast/
 * Profile rows that are not even music. Device screenshot (lab.4 field
 * report) showed exactly that paint.
 *
 * This module imposes the app-wide TITLE-TRUTH contract on that stream,
 * using the same math family as rank.ts (coverage × precision, ortho-aware
 * through the plan's variants) so the Catalog and YouTube tabs agree on
 * what "the right song" is:
 *
 *   rank  — canonical-title rows top the list; edit-class junk (remix /
 *           lo-fi / slowed / cover / …) sinks below every clean title;
 *           views only break ties, never outrank truth
 *   gate  — `topConfident` = the best row genuinely matches the query
 *           title (coverage ≥ 0.5); the SearchScreen "Top result" hero
 *           only paints on a confident top, never on a junk card
 *
 * Pure + deterministic (stable tiebreak by provider order) so the same
 * response always paints the same list.
 */

import type { Track } from '../types';
import { planSearch } from './plan';
import {
  artistContains,
  acceptableTitleTokens,
  titleHitCount,
  titleQueryTokens,
} from './rank';
import { normalizeQuery } from './normalize';

/** Edit-class derivatives — NOT the canonical recording. Each match is a
 *  demotion; several matches stack (capped) so "TU CHAHIYE (Lo-Fi Mix)"
 *  and "Siddharth Slathia Unplugged Cover" sink far below clean titles.
 *  \b guards keep "mix" out of "mixtape" and "cover" out of "discover". */
const EDIT_CLASS =
  /\b(slowed|reverb|lofi|lo-fi|remix|nightcore|8d|bass ?boosted|sped ?up|unplugged|cover|karaoke|instrumental|tribute|reaction|mashup|mix|flip|edit)\b/gi;

/** Lyric/status/compilation surfaces of the song — legitimate results,
 *  but below clean recordings (the official audio/video comes first). */
const LYRIC_CLASS = /\b(lyrics?|lyrical|full ?video|audio ?song|jukebox|status|whatsapp)\b/gi;

export interface YtRankOutcome {
  tracks: Track[];
  /** the top row genuinely matches the query title → the hero may paint */
  topConfident: boolean;
}

function titleTokenSet(title: string): string[] {
  return normalizeQuery(title)
    .split(/[^a-z0-9\u0900-\u097f]+/)
    .filter((t) => t.length >= 2);
}

/** Rank YT rows by title truth. Provider order is the stable tiebreak. */
export function rankYtTracks(query: string, rows: Track[]): YtRankOutcome {
  const plan = planSearch(query);
  const orig = titleQueryTokens(plan);
  const acceptable = acceptableTitleTokens(plan);
  const artistTokens = plan.artistTokens;

  const scored = rows.map((t, idx) => {
    const tokens = titleTokenSet(t.title);
    const hay = new Set(tokens);
    // coverage — ortho-aware ("chaiye"→"chahiye" both accepted)
    const cov = orig.length ? titleHitCount(orig, acceptable, hay) / orig.length : 0;
    // precision — how much of the row's title the query actually asked for
    let matched = 0;
    for (const w of tokens) if (acceptable.has(w)) matched += 1;
    const prec = tokens.length ? matched / tokens.length : 0;
    // artist axis — full word-boundary credit match, capped at 2
    let artist = 0;
    const credits = t.artistsFull?.length ? t.artistsFull : t.artist.split(/,\s*/);
    for (const a of artistTokens) {
      if (credits.some((c) => artistContains(normalizeQuery(c), a))) artist += 1;
    }
    // edit-class junk demotion — stacks, capped so a single hard-marker
    // class can never be "un-drowned" by view counts
    const editHits = (t.title.match(EDIT_CLASS) ?? []).length;
    const editDemotion = Math.min(2.8, editHits * 1.4);
    const lyricHits = (t.title.match(LYRIC_CLASS) ?? []).length;
    const lyricDemotion = lyricHits > 0 ? 0.6 : 0;
    // authority — views break ties among same-truth rows only
    const viewsBonus = t.playCount
      ? Math.min(0.35, (Math.log10(t.playCount + 1) / 8) * 0.35)
      : 0;
    // catalog songs (no view metric) carry a structural edge over videos
    const songBonus = t.ytKind === 'song' ? 0.3 : 0;

    const score =
      2.6 * cov * (0.55 + 0.45 * prec) +
      1.6 * Math.min(2, artist) +
      songBonus +
      viewsBonus -
      editDemotion -
      lyricDemotion;

    return { t, idx, score, cov };
  });

  scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
  return {
    tracks: scored.map((s) => s.t),
    topConfident: orig.length > 0 && (scored[0]?.cov ?? 0) >= 0.5,
  };
}
