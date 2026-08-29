/**
 * SEARCH V2 · S1 — RETRIEVE (parallel fan-out, wall-time = max probe).
 *
 * Probe composition by plan kind (≤4 search probes + autocomplete,
 * all through one AbortController per generation). LRU-200 result
 * cache (10 min TTL) + in-flight dedupe answer before the network.
 * A new generation ABORTS the old one — dead work dies the instant
 * intent changes (bandwidth + battery).
 */

import type { Track } from '../types';
import {
  searchSaavn,
  getAutocomplete,
  getSongById,
  type AutocompleteBundle,
} from '../api/saavn';
import { searchItunes } from '../api/itunes';
import type { SearchPlan } from './plan';
import { correctedQuery } from './plan';
import { feedLexicon } from './lexicon';

const CACHE_MAX = 200;
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  at: number;
  tracks: Track[];
}

const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<Track[]>>();

function cacheGet(key: string): Track[] | null {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    cache.delete(key);
    cache.set(key, hit); // refresh recency
    return hit.tracks;
  }
  if (hit) cache.delete(key);
  return null;
}

function cacheSet(key: string, tracks: Track[]): void {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, { at: Date.now(), tracks });
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

/** Probe strings for a plan (the §5.2 table). */
export function probesFor(plan: SearchPlan): string[] {
  switch (plan.kind) {
    case 'entity_title':
      return [plan.normalized];
    case 'entity_artist':
      return [`${plan.normalized} songs`, plan.normalized];
    case 'artist_title': {
      const title = plan.titleTokens.join(' ');
      const surname = plan.artistTokens[plan.artistTokens.length - 1]?.split(' ').slice(-1)[0] ?? '';
      const probes = [plan.raw.trim(), plan.normalized];
      if (title) probes.push(title);
      if (surname) probes.push(surname);
      return probes.slice(0, 3);
    }
    case 'lyric_fragment':
      return [plan.normalized, ...plan.windows].slice(0, 3);
    default:
      return [plan.normalized];
  }
}

export interface RetrievalResult {
  pools: Array<{ pool: string; tracks: Track[] }>;
  autocomplete?: AutocompleteBundle;
  topQueryTrack?: Track;
  cacheHit: boolean;
  probes: string[];
}

/** In-flight dedupe wrapper (exact palette-engine pattern). */
function deduped<T>(map: Map<string, Promise<T>>, key: string, make: () => Promise<T>): Promise<T> {
  const existing = map.get(key);
  if (existing) return existing;
  const p = make().finally(() => map.delete(key));
  map.set(key, p);
  return p;
}

/**
 * Run the fan-out for a plan. Never throws — probe failures degrade
 * to empty pools; the caller decides thin/zero from the merged set.
 */
export async function retrieve(
  plan: SearchPlan,
  opts: { limit?: number; signal?: AbortSignal } = {},
): Promise<RetrievalResult> {
  const { limit = 30, signal } = opts;
  const cached = cacheGet(plan.cacheKey);
  if (cached) {
    return { pools: [{ pool: 'cache', tracks: cached }], cacheHit: true, probes: [] };
  }
  const existing = inFlight.get(plan.cacheKey);
  if (existing) {
    const tracks = await existing;
    return { pools: [{ pool: 'cache', tracks }], cacheHit: true, probes: [] };
  }

  const probeStrings = probesFor(plan);
  const corrected = correctedQuery(plan);
  const allProbes =
    corrected && corrected !== plan.normalized ? [...probeStrings, corrected] : probeStrings;

  const job = (async () => {
    const searchPool = await Promise.all(
      allProbes.slice(0, 4).map(async (q) => {
        try {
          return await searchSaavn(q, limit, signal);
        } catch {
          return [] as Track[];
        }
      }),
    );
    return searchPool;
  })();

  // In-flight dedupe (P1-1): concurrent generations of the SAME key share
  // one fan-out; the slot is cleared on settle (failure included).
  const tracked = job.catch(() => [] as Track[][]);
  void tracked.finally(() => inFlight.delete(plan.cacheKey));
  inFlight.set(plan.cacheKey, tracked.then((pools) => pools.flat()));

  // autocomplete + topquery resolve run CONCURRENTLY with the search
  // probes (P1-5 fix: wall-time = max(search, ac+resolve), not their sum
  // — and never a serial chain the result waits on when probes finish
  // first)
  const topQueryPromise = getAutocomplete(plan.normalized, signal)
    .catch(() => undefined)
    .then(async (ac) => {
      if (ac?.topQuery?.type === 'song' && ac.topQuery.id && !signal?.aborted) {
        const t = await getSongById(ac.topQuery.id, signal).catch(() => null);
        return { ac, topQueryTrack: t ?? undefined };
      }
      return { ac, topQueryTrack: undefined };
    });

  const [poolsRaw, topQueryResult] = await Promise.all([job, topQueryPromise]);
  const { ac, topQueryTrack } = topQueryResult;

  // results feed the lexicon (titles/artists become correction vocab)
  for (const pool of poolsRaw) {
    feedLexicon(pool.slice(0, 10).flatMap((t) => [t.title, ...(t.artistsFull ?? [t.artist])]));
  }

  const pools: Array<{ pool: string; tracks: Track[] }> = allProbes
    .slice(0, 4)
    .map((q, i) => ({ pool: `p${i + 1}`, tracks: poolsRaw[i] ?? [] }));

  if (topQueryTrack) {
    pools.push({ pool: 'topquery', tracks: [topQueryTrack] });
  }

  // iTunes top-up ONLY on merged thinness (existing contract)
  const mergedCount = new Set(pools.flatMap((p) => p.tracks.map((t) => t.id))).size;
  if (mergedCount < 8 && !signal?.aborted) {
    try {
      const it = await searchItunes(plan.normalized, 20, signal);
      if (it.length > 0) pools.push({ pool: 'itunes', tracks: it });
    } catch {
      /* degraded is fine */
    }
  }

  return { pools, autocomplete: ac, topQueryTrack, cacheHit: false, probes: allProbes };
}

/** Cache write — called by the orchestrator AFTER rank (stores the
 *  final ranked list so cache hits return exactly what was painted). */
export function rememberResults(plan: SearchPlan, tracks: Track[]): void {
  if (tracks.length > 0) {
    cacheSet(plan.cacheKey, tracks.slice(0, 30));
    // register the write inside the in-flight map too? No — in-flight is
    // for concurrent generations of the same key; cache covers repeats.
    void tracks;
  }
}

/** Direct access for tests. */
export function cacheSize(): number {
  return cache.size;
}
