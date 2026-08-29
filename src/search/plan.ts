/**
 * SEARCH V2 · S0 — PREPARE: query understanding.
 *
 * Input: raw string (pure, sync, <8 ms). Output: a frozen SearchPlan.
 *
 * Pipeline: normalize → tokenize → SymSpell corrections → classify
 * intent (ordered rules, Instacart/Tunkelang pattern) → split
 * artist/title tokens → select lyric windows (idf-distinctive n-grams).
 */

import { normalizeQuery, foldToken, TYPE_WORDS } from './normalize';
import { correctToken, type Correction } from './lexicon';

export type QueryKind =
  | 'entity_title'
  | 'entity_artist'
  | 'artist_title'
  | 'lyric_fragment'
  | 'vibe'
  | 'browse';

export interface SearchPlan {
  raw: string;
  normalized: string;
  tokens: string[];
  kind: QueryKind;
  titleTokens: string[];
  artistTokens: string[];
  windows: string[];
  corrections: Correction[];
  cacheKey: string;
}

/** Known-artist lexicon assembled from priors + seeds (set at init). */
let KNOWN_ARTISTS = new Set<string>();
let VIBE_WORDS = new Set<string>();
let LYRIC_MARKERS = new Set<string>();

/** Register artist names (normalized, lowercase). */
export function registerArtistLexicon(names: string[]): void {
  KNOWN_ARTISTS = new Set(
    names
      .map((n) => normalizeQuery(n))
      .filter(Boolean),
  );
}

/** Register vibe vocabulary (moods/genres/activities/eras/languages). */
export function registerVibeVocab(words: string[]): void {
  VIBE_WORDS = new Set(words.map((w) => normalizeQuery(w)).filter(Boolean));
}

/** Register lyric-mode marker words (config for the classifier). */
export function registerLyricMarkers(words: string[]): void {
  LYRIC_MARKERS = new Set(words.map((w) => normalizeQuery(w)).filter(Boolean));
}

const DEFAULT_LYRIC_MARKERS = ['lyrics', 'bol', 'lyric', 'lines', 'line', 'song with'];

function artistTokensIn(tokens: string[]): string[] {
  // full-phrase match first ("arijit singh"), then single-token matches
  // for distinctive surnames — word-boundary guarded ("badshah" must not
  // match "badshaholic")
  const found: string[] = [];
  const joined = tokens.join(' ');
  KNOWN_ARTISTS.forEach((a) => {
    if (a.length < 3) return;
    const first = a.split(' ')[0] ?? '';
    if (a.includes(' ')) {
      if (joined.includes(a)) found.push(a);
    } else if (first && tokens.includes(a)) {
      found.push(a);
    }
  });
  return found;
}

/** Is this token a vibe word (with variance fold)? */
function isVibeToken(tok: string): boolean {
  return VIBE_WORDS.has(tok) || VIBE_WORDS.has(foldToken(tok));
}

function classify(tokens: string[], raw: string): QueryKind {
  // browse = genuinely nothing to search (empty / 1-char). A single
  // real word IS a title search ("mashooqa", "kesariya") — P0-1 fix,
  // locked by search_plan tests.
  if (tokens.length === 0 || tokens.every((t) => t.length <= 1)) return 'browse';
  const words = tokens.map(foldToken);
  const vibeHits = words.filter(isVibeToken).length;
  const hasQuote = /["'“”]/.test(raw);

  // 1. vibe — vibe vocabulary dominates and there's at least one hit,
  //    AND no strong lyric shape (≥6 distinctive tokens reads as a line)
  if (vibeHits >= 1 && tokens.length <= 4 && !hasQuote) {
    const nonVibe = words.filter((w) => !isVibeToken(w) && !TYPE_WORDS.has(w));
    if (nonVibe.length === 0) return 'vibe';
  }

  // 2. lyric_fragment — quoted phrase, ≥6 tokens, or explicit markers
  const hasMarker = words.some((w) => LYRIC_MARKERS.has(w) || DEFAULT_LYRIC_MARKERS.includes(w));
  if (hasQuote && tokens.length >= 2) return 'lyric_fragment';
  if (tokens.length >= 6) return 'lyric_fragment';
  if (hasMarker && tokens.length >= 3) {
    const nonMarker = words.filter((w) => !DEFAULT_LYRIC_MARKERS.includes(w) && !LYRIC_MARKERS.has(w));
    if (nonMarker.length >= 3) return 'lyric_fragment';
  }

  // 3. artist_title — ≥1 known artist matched AND remaining tokens exist
  const artists = artistTokensIn(tokens);
  if (artists.length >= 1) {
    const artistWordCount = artists.reduce((n, a) => n + a.split(' ').length, 0);
    if (tokens.length > artistWordCount) return 'artist_title';
    return 'entity_artist'; // 4. ALL tokens match artist names
  }
  if (artists.length === 1 && tokens.join(' ') === artists[0]) return 'entity_artist';

  // 5. everything else — provider title matching is best
  return 'entity_title';
}

/** token rarity proxy: rare/long tokens carry more idf weight than
 *  stopwords/type words (true idf comes from the lexicon's corpus, this
 *  is the bounded deterministic proxy). */
function idfish(tok: string): number {
  if (TYPE_WORDS.has(tok)) return 0.1;
  if (tok.length <= 2) return 0.4;
  if (tok.length === 3) return 1.0;
  if (tok.length <= 5) return 1.6;
  return 2.2 + Math.min(1.2, (tok.length - 5) * 0.2);
}

/** Lyric mode: pick ≤2 distinctive, non-overlapping 3-grams. */
function selectWindows(tokens: string[]): string[] {
  if (tokens.length < 3) return [tokens.join(' ')].filter(Boolean);
  const grams: Array<{ text: string; score: number; at: number }> = [];
  for (let i = 0; i + 3 <= tokens.length; i += 1) {
    const slice = tokens.slice(i, i + 3);
    const distinct = slice.reduce((s, t) => s + idfish(t), 0);
    // mid-phrase bias: windows after the first 2 tokens are usually the
    // most distinctive part of a remembered line
    const posBias = i > 0 && i + 3 < tokens.length ? 0.35 : 0;
    grams.push({ text: slice.join(' '), score: distinct + posBias, at: i });
  }
  grams.sort((a, b) => b.score - a.score || a.at - b.at);
  const picked: typeof grams = [];
  for (const g of grams) {
    if (picked.length >= 2) break;
    const overlaps = picked.some(
      (p) => Math.abs(p.at - g.at) < 3,
    );
    if (!overlaps) picked.push(g);
  }
  return picked.map((g) => g.text);
}

/** Build the full SearchPlan (pure; the only entry S1+ consumes). */
export function planSearch(raw: string): SearchPlan {
  const normalized = normalizeQuery(raw);
  const baseTokens = normalized.split(' ').filter(Boolean);
  const tokens = baseTokens.map(foldToken);

  // SymSpell pass — corrections recorded, NEVER silently applied to the
  // provider query (the corrected string rides along as an extra probe
  // and surfaces as "Did you mean")
  const corrections: Correction[] = [];
  const corrected = tokens.map((t) => {
    const fix = correctToken(t);
    if (fix && fix !== t) {
      corrections.push({ from: t, to: fix });
      return fix.split(' ')[0] ?? t;
    }
    return t;
  });

  const kind = classify(tokens, raw);

  // artist/title split for artist_title
  let artistTokens: string[] = [];
  let titleTokens = tokens;
  if (kind === 'artist_title' || kind === 'entity_artist') {
    artistTokens = artistTokensIn(tokens);
    if (kind === 'artist_title') {
      const artistWords = new Set(artistTokens.join(' ').split(' '));
      titleTokens = tokens.filter((t) => !artistWords.has(t));
    }
  }

  const windows = kind === 'lyric_fragment' ? selectWindows(tokens) : [];

  return Object.freeze({
    raw,
    normalized,
    tokens,
    kind,
    titleTokens,
    artistTokens,
    windows,
    corrections,
    cacheKey: `q:${normalized}|k:${kind}`,
  });
}

/** Apply corrections to produce the "Did you mean" string. */
export function correctedQuery(plan: SearchPlan): string | null {
  if (plan.corrections.length === 0) return null;
  const map = new Map(plan.corrections.map((c) => [c.from, c.to]));
  return plan.tokens.map((t) => map.get(t) ?? t).join(' ');
}
