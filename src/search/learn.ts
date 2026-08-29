/**
 * SEARCH V2 · S5 — LEARN (async, AFTER paint — 0 ms on critical path).
 *
 *   • correlated (query → click) evidence via ledger v2 payloads
 *   • fragment→track kv cache (repeat lyric searches ≈ instant)
 *   • engagement reads for the ranker (past clicks for THIS query,
 *     21-day half-life — feedback ruts are impossible by design)
 *   • sourceTrust.search feeding (clicked track ≥30 s = credit)
 *
 * Kill switch: `intelligenceDisabled` pauses all S5 writes.
 */

import { normalizeQuery } from './normalize';

const FRAGMENT_KEY = 'searchResolves';
const ENGAGEMENT_WINDOW_DAYS = 21;
const HALF_LIFE_DAYS = 21;
const MAX_RESOLVES = 500;

export interface ResolvedFragment {
  trackId: string;
  saavnId?: string;
  title: string;
  artist: string;
  at: number;
}

/** Minimal kv + event-reader interfaces — satisfied by the mindbeat
 *  facade on-device and by fixtures in replay tests. */
export interface LearnDeps {
  kvGet<T>(key: string): Promise<T | null>;
  kvSet(key: string, value: unknown): Promise<void>;
  eventsSince(ts: number): Promise<Array<{
    type: string;
    ts: number;
    trackId?: string;
    payload: Record<string, unknown>;
  }>>;
  disabled(): boolean;
}

export interface SearchCorrelation {
  query: string;
  normalized: string;
  resultCount: number;
  planKind: string;
  probes: string[];
  latencyMs: number;
  corrections: Array<{ from: string; to: string }>;
  correlationId: string;
}

/** Persist a fragment→track resolution (called on click). */
export async function rememberResolve(
  deps: LearnDeps,
  normalizedQuery: string,
  track: { id: string; saavnId?: string; title: string; artist: string },
): Promise<void> {
  if (deps.disabled()) return;
  try {
    const map = (await deps.kvGet<Record<string, ResolvedFragment>>(FRAGMENT_KEY)) ?? {};
    map[normalizedQuery] = {
      trackId: track.id,
      saavnId: track.saavnId,
      title: track.title,
      artist: track.artist,
      at: Date.now(),
    };
    const keys = Object.keys(map);
    if (keys.length > MAX_RESOLVES) {
      // evict oldest
      keys
        .sort((a, b) => (map[a]?.at ?? 0) - (map[b]?.at ?? 0))
        .slice(0, keys.length - MAX_RESOLVES)
        .forEach((k) => delete map[k]);
    }
    await deps.kvSet(FRAGMENT_KEY, map);
  } catch {
    /* learning is best-effort by contract */
  }
}

/** Look up a remembered resolution for a normalized query. */
export async function recallResolve(
  deps: LearnDeps,
  normalizedQuery: string,
): Promise<ResolvedFragment | null> {
  try {
    const map = (await deps.kvGet<Record<string, ResolvedFragment>>(FRAGMENT_KEY)) ?? {};
    return map[normalizedQuery] ?? null;
  } catch {
    return null;
  }
}

/**
 * Engagement for the ranker: trackId → 0..1, computed from correlated
 * SEARCH_CLICK events for the SAME normalized query, decayed by a
 * 21-day half-life. Capped so a couple of clicks can boost but never
 * hijack (provider 3.0 + disambig override still dominate).
 */
export async function engagementForQuery(
  deps: LearnDeps,
  normalizedQuery: string,
  now = Date.now(),
): Promise<Record<string, number>> {
  try {
    if (deps.disabled()) return {};
    const since = now - ENGAGEMENT_WINDOW_DAYS * 24 * 3600 * 1000;
    const events = await deps.eventsSince(since);
    const out: Record<string, number> = {};
    const lambda = Math.LN2 / (HALF_LIFE_DAYS * 24 * 3600 * 1000);
    for (const e of events) {
      if (e.type !== 'SEARCH_CLICK' || !e.trackId) continue;
      const q = typeof e.payload.normalizedQuery === 'string' ? e.payload.normalizedQuery : null;
      if (!q || q !== normalizedQuery) continue;
      const age = now - e.ts;
      const decay = Math.exp(-lambda * age);
      // 0.6/click (decayed), cap 1.2 — S8 bar: 2 fresh clicks MUST be
      // able to out-rank provider-order deltas (weight 1.2 in rank.ts)
      out[e.trackId] = Math.min(1.2, (out[e.trackId] ?? 0) + 0.6 * decay);
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * sourceTrust.search feeding: search-clicked tracks that reach ≥30 s
 * listened credit the channel. Returns [{trackId}] for the caller to
 * join against listen evidence (kept pure for replay tests).
 */
export function credibleSearchClicks(
  events: Array<{ type: string; ts: number; trackId?: string; payload: Record<string, unknown> }>,
  listensSince: Array<{ trackId: string; ts: number; ratio: number }>,
): Set<string> {
  const clicked = new Set<string>();
  for (const e of events) {
    if (e.type === 'SEARCH_CLICK' && e.trackId) clicked.add(e.trackId);
  }
  const credited = new Set<string>();
  for (const l of listensSince) {
    if (clicked.has(l.trackId) && l.ratio * 100 >= 30) credited.add(l.trackId);
  }
  return credited;
}

/** Normalize through the shared pipeline (exported for the UI). */
export function norm(raw: string): string {
  return normalizeQuery(raw);
}
