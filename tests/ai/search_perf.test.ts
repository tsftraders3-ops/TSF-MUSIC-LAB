/**
 * SEARCH V2 · latency budgets (plan §6) — every on-device budget is
 * measured, printed, and asserted at 2× headroom for mid-range Android.
 *
 * L1  S0 prepare           p50 <3 ms   p95 <8 ms
 * L2  lexicon build        p50 <20 ms  p95 <50 ms (one-time)
 * L3  cache-hit retrieve   p95 <15 ms
 * L4  S2 verify 60 cands   p50 <25 ms  p95 <80 ms
 * L5  lyric V1 (60 cands)  p50 <10 ms  p95 <25 ms
 * L6  S3 rank 60 cands     p50 <10 ms  p95 <40 ms
 */

import { describe, expect, test, beforeAll } from 'bun:test';
import { planSearch, registerArtistLexicon, registerVibeVocab } from '../../src/search/plan';
import { buildLexicon, restoreLexicon, snapshotLexicon } from '../../src/search/lexicon';
import { verifySet, snippetEcho } from '../../src/search/verify';
import { rankRows } from '../../src/search/rank';
import { retrieve, rememberResults } from '../../src/search/retrieve';
import type { Track } from '../../src/types';
import { ARTIST_PRIORS, MOOD_PRIORS, GENRE_PRIORS } from '../../src/ai/core/priors';

const QUERIES = [
  'tum hi ho',
  'apna bana le arijit singh',
  'hum tere bin ab reh nahi sakte',
  'kun fya kun',
  'sad songs',
  'punjabi gym bangers',
  'अपना बना ले',
  'kesariya brahmastra',
  'arijit singh',
  '90s hindi heartbreak',
  'zz qq xx',
  'meri aashiqui ab tum hi ho bandhu version',
];

/** 60 synthetic candidates across 4 pools. */
function syntheticPool(n: number, salt: string): Track[] {
  const out: Track[] = [];
  for (let i = 0; i < n; i += 1) {
    out.push({
      id: `saavn-${salt}${i}`,
      saavnId: `${salt}${i}`,
      title: `Tum Hi Ho${i % 7 === 0 ? ' (From "Aashiqui 2")' : i % 11 === 0 ? ' Bandhu' : ''}`,
      artist: 'Mithoon, Arijit Singh',
      artistsFull: ['Mithoon', 'Arijit Singh'],
      artwork: '',
      duration: 257,
      source: 'saavn',
      previewOnly: false,
      playCount: 371299372 - i * 1000,
      lyricsSnippet: i % 3 === 0 ? 'Tere Bina Kya Wajood Mera' : undefined,
    });
  }
  return out;
}

const POOLS = [
  { pool: 'p1', tracks: syntheticPool(20, 'a') },
  { pool: 'p2', tracks: syntheticPool(20, 'b') },
  { pool: 'p3', tracks: syntheticPool(10, 'c') },
  { pool: 'p4', tracks: syntheticPool(10, 'd') },
];

function p50(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length * 0.5)] ?? 0;
}
function p95(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * 0.95))] ?? 0;
}

beforeAll(() => {
  registerArtistLexicon(Object.keys(ARTIST_PRIORS));
  const vibe = new Set<string>();
  for (const m of MOOD_PRIORS) {
    vibe.add(m.key);
    (m.words ?? []).forEach((w: string) => vibe.add(w));
  }
  Object.keys(GENRE_PRIORS).forEach((g) => vibe.add(g));
  registerVibeVocab(Array.from(vibe));
  buildLexicon(
    [Object.keys(ARTIST_PRIORS), Array.from(vibe), QUERIES],
    QUERIES.slice(0, 8),
  );
});

describe('L1 — S0 prepare (normalize + classify + SymSpell)', () => {
  test(`p50 <3 ms, p95 <8 ms across ${QUERIES.length} realistic queries`, () => {
    const times: number[] = [];
    for (let rep = 0; rep < 20; rep += 1) {
      for (const q of QUERIES) {
        const t0 = performance.now();
        planSearch(q);
        times.push(performance.now() - t0);
      }
    }
    console.log(`  [perf] L1 S0: p50=${p50(times).toFixed(3)} ms  p95=${p95(times).toFixed(3)} ms`);
    expect(p50(times)).toBeLessThan(3);
    expect(p95(times)).toBeLessThan(8);
  });
});

describe('L2 — lexicon build', () => {
  test('scratch build <50 ms (one-time, off first paint)', () => {
    const t0 = performance.now();
    buildLexicon([Object.keys(ARTIST_PRIORS), QUERIES], QUERIES.slice(0, 8));
    const ms = performance.now() - t0;
    console.log(`  [perf] L2 lexicon scratch build: ${ms.toFixed(1)} ms`);
    expect(ms).toBeLessThan(50);
  });

  test('snapshot restore <20 ms (cold-start path)', () => {
    const snap = snapshotLexicon();
    const t0 = performance.now();
    expect(restoreLexicon(snap)).toBe(true);
    const ms = performance.now() - t0;
    console.log(`  [perf] L2 lexicon snapshot restore: ${ms.toFixed(1)} ms`);
    // plan L2 p95 = 50 ms; assert at 2x headroom for mid-range Android
    expect(ms).toBeLessThan(40);
  });
});

describe('L3 — cache-hit repeat query', () => {
  test('retrieve() returns cached results <15 ms end-to-end', async () => {
    const plan = planSearch('cache probe tum hi ho');
    rememberResults(plan, POOLS[0]!.tracks);
    const t0 = performance.now();
    const res = await retrieve(plan);
    const ms = performance.now() - t0;
    console.log(`  [perf] L3 cache-hit retrieve: ${ms.toFixed(3)} ms`);
    expect(res.cacheHit).toBe(true);
    expect(ms).toBeLessThan(15);
  });
});

describe('L4 — S2 verify (60 candidates, no lyric mode)', () => {
  test('p50 <25 ms, p95 <80 ms', () => {
    const plan = planSearch('tum hi ho');
    const times: number[] = [];
    for (let rep = 0; rep < 30; rep += 1) {
      const t0 = performance.now();
      verifySet(plan, POOLS);
      times.push(performance.now() - t0);
    }
    console.log(`  [perf] L4 verify: p50=${p50(times).toFixed(3)} ms  p95=${p95(times).toFixed(3)} ms`);
    expect(p50(times)).toBeLessThan(25);
    expect(p95(times)).toBeLessThan(80);
  });
});

describe('L5 — S2 lyric V1 (60 candidates, lyric mode)', () => {
  test('p50 <10 ms, p95 <25 ms', () => {
    const plan = planSearch('hum tere bin ab reh nahi sakte');
    const { rows } = verifySet(plan, POOLS);
    const times: number[] = [];
    for (let rep = 0; rep < 30; rep += 1) {
      const t0 = performance.now();
      for (const r of rows) snippetEcho(plan, r);
      times.push(performance.now() - t0);
    }
    console.log(`  [perf] L5 lyric V1: p50=${p50(times).toFixed(3)} ms  p95=${p95(times).toFixed(3)} ms`);
    expect(p50(times)).toBeLessThan(10);
    expect(p95(times)).toBeLessThan(25);
  });
});

describe('L6 — S3 rank (60 candidates)', () => {
  test('p50 <10 ms, p95 <40 ms', () => {
    const plan = planSearch('tum hi ho');
    const { rows } = verifySet(plan, POOLS);
    const times: number[] = [];
    for (let rep = 0; rep < 30; rep += 1) {
      const t0 = performance.now();
      rankRows(plan, rows, { engagement: { 'saavn-a3': 0.8 } });
      times.push(performance.now() - t0);
    }
    console.log(`  [perf] L6 rank: p50=${p50(times).toFixed(3)} ms  p95=${p95(times).toFixed(3)} ms`);
    expect(p50(times)).toBeLessThan(10);
    expect(p95(times)).toBeLessThan(40);
  });
});
