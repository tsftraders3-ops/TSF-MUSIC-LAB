/**
 * Daypart / day-kind math (§6.3) — shared by ledger, profile and surfaces.
 * Pure functions; local time (the listener's clock is the truth).
 */

import {
  BLOCKS,
  BOUNDARY_CALIBRATION_MAX_MIN,
  WEEKEND_SHIFT_HOURS,
  type BlockName,
  type DayKind,
} from './constants';

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function dayKindOf(ts: number): DayKind {
  const day = new Date(ts).getDay(); // 0 = Sunday
  return day === 0 || day === 6 ? 'weekend' : 'weekday';
}

/** Span (hours) of a weekday block definition. */
function spanOf(block: BlockName): number {
  const row = BLOCKS.weekday.find((b) => b.block === block);
  if (!row) return 4;
  return row.to > row.from ? row.to - row.from : row.to + 24 - row.from;
}

/**
 * Which of the five blocks does `ts` fall into?
 *
 * Weekend boundaries shift +2h (morning starts 07:00, not 05:00 — Heggli's
 * diurnal structure). Optional learned per-user boundary offsets (minutes)
 * refine the edges after day 14 (§6.3 personal calibration, ±90 min cap).
 */
export function blockOf(
  ts: number,
  dayKind: DayKind = dayKindOf(ts),
  offsets?: { weekday?: Partial<Record<BlockName, number>>; weekend?: Partial<Record<BlockName, number>> },
): BlockName {
  const d = new Date(ts);
  const h = d.getHours() + d.getMinutes() / 60;
  const shift = dayKind === 'weekend' ? WEEKEND_SHIFT_HOURS : 0;
  const table = offsets?.[dayKind] ?? {};

  // Effective windows on a 0..24 circle (may wrap past midnight).
  const windows = BLOCKS.weekday.map(({ block, from }) => {
    const offset =
      clamp(table[block] ?? 0, -BOUNDARY_CALIBRATION_MAX_MIN, BOUNDARY_CALIBRATION_MAX_MIN) / 60;
    const start = from + shift + offset;
    return { block, start, end: start + spanOf(block) };
  });

  for (const w of windows) {
    if (h >= w.start && h < w.end) return w.block; // start∈[0,24): no wrap for h<24
    if (w.end > 24 && h + 24 >= w.start && h + 24 < w.end) return w.block; // wrapped tail
  }
  // Sliver fallback (offsets can open gaps): nearest window start wins.
  let nearest: BlockName = 'morning';
  let bestDist = Infinity;
  for (const w of windows) {
    const d0 = Math.abs(h - w.start);
    const d1 = Math.abs(h + 24 - w.start);
    const d2 = Math.abs(h - 24 - w.start);
    const dist = Math.min(d0, d1, d2);
    if (dist < bestDist) {
      bestDist = dist;
      nearest = w.block;
    }
  }
  return nearest;
}

/** Era bucket from a release year (JioSaavn year fields are spotty — best effort). */
export function eraOf(year?: number): string {
  if (!year || year < 1980) return 'pre80s';
  if (year < 1990) return '80s';
  if (year < 2000) return '90s';
  if (year < 2010) return '2000s';
  if (year < 2020) return '2010s';
  return 'current';
}

/** Deterministic 32-bit hash — stable ids and seeded randomness. */
export function hash32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 seeded PRNG — deterministic engine decisions for replay tests. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
