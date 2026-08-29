/**
 * Vibe Search (§9.8) — the NLP mode for Search.
 *
 * Keyword mode stays the default; Vibe mode routes the query through the
 * S1 intent parser (same code as the AI playlist generator) and returns a
 * small ranked set + the parsed intent (so the UI can show "Sufi · calm ·
 * Hindi" chips). "songs like kun faya kun" resolves via similarity; typos
 * like "sahd songs" resolve through fuzzy mood matching.
 */

import type { Track } from '../../types';
import { parseIntent, type Catalog, type Intent } from './playlist';
import { estimateFeatures } from '../core/features';
import { MOOD_PRIORS } from '../core/priors';

export interface VibeResult {
  tracks: Track[];
  intent: Intent;
  shortcut?: { label: string; query: string };
}

/** Levenshtein-lite: single-edit tolerance for typo'd moods ("sahd"→"sad"). */
function fuzzyMood(word: string): string | null {
  const w = word.toLowerCase();
  for (const mo of MOOD_PRIORS) {
    for (const mword of mo.words) {
      if (editDistance(w, mword) <= 1 && w.length >= 3) return mo.key;
    }
  }
  return null;
}

function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 1) return 9;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

export async function vibeSearch(catalog: Catalog, query: string, limit = 20): Promise<VibeResult> {
  let intent = parseIntent(query);

  // Typo rescue: if nothing parsed, try fuzzy mood words.
  if (!intent.moods.length && !intent.artists.length) {
    const words = query.toLowerCase().split(/\s+/);
    const hit = words.map(fuzzyMood).find(Boolean);
    if (hit) {
      intent = parseIntent(hit);
    }
  }

  // Similarity shortcut: "songs like X" / "X jaise gaane".
  const likeMatch = query.toLowerCase().match(/(?:songs? like|like|jaise gaane)\s+(.+)/) ??
    query.toLowerCase().match(/(.+?)\s+(?:jaise gaane|type songs?|similar)/);
  let shortcut: VibeResult['shortcut'] | undefined;
  if (likeMatch) {
    shortcut = { label: `More like ${likeMatch[1].trim()}`, query: likeMatch[1].trim() };
  }

  const searchQueries: string[] = [];
  if (shortcut) searchQueries.push(shortcut.query);
  if (intent.artists.length) searchQueries.push(...intent.artists.slice(0, 2));
  const moodBits = intent.moods
    .map((k) => MOOD_PRIORS.find((mo) => mo.key === k))
    .filter(Boolean) as typeof MOOD_PRIORS;
  if (moodBits.length) {
    searchQueries.push(`${moodBits.map((m) => m.key).join(' ')} ${intent.languages[0] ?? ''} songs`.trim());
  }
  if (!searchQueries.length) searchQueries.push(query);

  const results = await Promise.all(
    searchQueries.slice(0, 4).map((q) => catalog.search(q, Math.ceil(limit * 0.8)).catch(() => [] as Track[])),
  );

  const seen = new Set<string>();
  let tracks: Track[] = [];
  for (const r of results) {
    for (const t of r) {
      if (seen.has(t.id)) continue;
      seen.add(t.id);
      tracks.push(t);
    }
  }

  // Rank by intent fit (energy/valence proximity + artist match).
  const targetE = intent.energyTarget ??
    (moodBits.length ? moodBits.reduce((s, m) => s + m.energy, 0) / moodBits.length : 0.5);
  const targetV = moodBits.length
    ? moodBits.reduce((s, m) => s + m.valence, 0) / moodBits.length
    : 0.5;
  tracks = tracks
    .map((t) => {
      const f = estimateFeatures({ artist: t.artist, title: t.title, album: t.album });
      let s = 0;
      if (intent.artists.some((a) => t.artist.toLowerCase().includes(a.toLowerCase()))) s += 6;
      s += Math.max(0, 5 - Math.abs(f.energy - targetE) * 10);
      s += Math.max(0, 4 - Math.abs(f.valence - targetV) * 8);
      return { t, s };
    })
    .sort((a, b) => b.s - a.s)
    .map((x) => x.t)
    .slice(0, limit);

  return { tracks, intent, shortcut };
}
