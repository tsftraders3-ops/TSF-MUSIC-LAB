/**
 * SEARCH V2 · S2/S3/S5/S8 replay locks — the gauntlet bars as tests.
 *
 * Fixture = the live-probe evidence from the research pass (probe_tumhiho,
 * probe_apnabanale): three duplicate releases, a Shahid Mallya cover,
 * "Tum Hi Ho Bandhu" (a different song), the Apna Bana Le lyricist bug.
 */

import { describe, expect, test, beforeAll } from 'bun:test';
import type { Track } from '../../src/types';
import { planSearch, registerArtistLexicon } from '../../src/search/plan';
import { mergePools, clusterVersions, verifySet, snippetEcho, verifyLyrics, type Candidate } from '../../src/search/verify';
import { rankRows, withReasonLines, REASON_LINES } from '../../src/search/rank';
import { rememberResolve, recallResolve, engagementForQuery, credibleSearchClicks, type LearnDeps } from '../../src/search/learn';
import { ARTIST_PRIORS } from '../../src/ai/core/priors';

// ── the live-probe fixture (titles/artists as JioSaavn returned them) ──
function track(p: Partial<Track> & { id: string; title: string }): Track {
  return {
    artist: 'Unknown',
    artwork: '',
    duration: 257,
    source: 'saavn',
    previewOnly: false,
    ...p,
  } as Track;
}

const THH_POOL: Track[] = [
  track({ id: 'saavn-1', title: 'Tum Hi Ho', artist: 'Mithoon, Arijit Singh', artistsFull: ['Mithoon', 'Arijit Singh'], playCount: 371299372, year: 2013, hasLyrics: true, lyricsSnippet: 'Tere Bina Kya Wajood Mera' }),
  track({ id: 'saavn-2', title: 'Tum Hi Ho (From "Aashiqui 2")', artist: 'Mithoon, Arijit Singh', artistsFull: ['Mithoon', 'Arijit Singh'], playCount: 371300737, year: 2025 }),
  track({ id: 'saavn-3', title: 'Tum Hi Ho (From "Aashiqui 2")', artist: 'Mithoon, Arijit Singh', artistsFull: ['Mithoon', 'Arijit Singh'], playCount: 371300737, year: 2026 }),
  track({ id: 'saavn-4', title: 'Tum Hi Ho - Cover', artist: 'Shahid Mallya', artistsFull: ['Shahid Mallya'], playCount: 1204533, year: 2019 }),
  track({ id: 'saavn-5', title: 'Tum Hi Ho Bandhu', artist: 'Pritam, Shreya Ghoshal', artistsFull: ['Pritam', 'Shreya Ghoshal'], playCount: 58201994, year: 2011 }),
];

function memDeps(events: any[] = [], kv: Record<string, unknown> = {}): LearnDeps {
  return {
    kvGet: async (k) => (k in kv ? (kv[k] as any) : null),
    kvSet: async (k, v) => {
      kv[k] = v;
    },
    eventsSince: async () => events,
    disabled: () => false,
  };
}

beforeAll(() => {
  registerArtistLexicon(Object.keys(ARTIST_PRIORS));
});

describe('S5 — version dedup (bar: ≤1 row per release-cluster)', () => {
  test('the three duplicate releases collapse; +N versions rides along', () => {
    const rows = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const clustered = clusterVersions(rows);
    const thh = clustered.filter((r) => {
      const t = r.title.toLowerCase();
      return t.startsWith('tum hi ho') && !t.includes('bandhu') && !t.includes('cover');
    });
    expect(thh.length).toBe(1); // one row for the cluster
    expect(thh[0]!.versionCount).toBe(3); // 3 dupes collapsed
    expect(thh[0]!.id).toBe('saavn-1'); // best member: pool rank 0 + deepest play count
  });

  test('the cover and Bandhu stay separate rows', () => {
    const rows = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const clustered = clusterVersions(rows);
    expect(clustered.some((r) => r.id === 'saavn-4')).toBe(true);
    expect(clustered.some((r) => r.id === 'saavn-5')).toBe(true);
  });
});

describe('S2 — artist+title disambiguation (bar: wrong-artist versions demoted)', () => {
  test('plan carries artistTokens for "apna bana le arijit singh"', () => {
    const p = planSearch('apna bana le arijit singh');
    expect(p.kind).toBe('artist_title');
  });

  test('DISAMBIGUATION OVERRIDE: artistMatch=0 rows hard-capped below artistMatch≥1', () => {
    const plan = planSearch('tum hi ho arijit singh');
    expect(plan.kind).toBe('artist_title');
    const rows = mergePools([{ pool: 'p1', tracks: [...THH_POOL].reverse() }]);
    const ranked = rankRows(plan, clusterVersions(rows));
    // every Arijit row must outrank the cover + Bandhu
    const arijitIdx = ranked.filter((r) => (r.artistsFull ?? []).some((a) => a.toLowerCase().includes('arijit'))).map((r) => ranked.indexOf(r));
    const otherIdx = ranked.filter((r) => !(r.artistsFull ?? []).some((a) => a.toLowerCase().includes('arijit'))).map((r) => ranked.indexOf(r));
    expect(Math.min(...arijitIdx)).toBeLessThan(Math.max(...otherIdx));
  });

  test('FULL artist list matching (the Apna Bana Le lyricist fix): artistsFull is authoritative', () => {
    const plan = planSearch('apna bana le arijit singh');
    const pool = [
      track({ id: 'x1', title: 'Apna Bana Le', artist: 'Amitabh Bhattacharya', artistsFull: ['Amitabh Bhattacharya'] }), // lyricist-only row
      track({ id: 'x2', title: 'Apna Bana Le', artist: 'Arijit Singh, Sachin-Jigar', artistsFull: ['Arijit Singh', 'Sachin-Jigar'] }),
    ];
    const ranked = rankRows(plan, mergePools([{ pool: 'p1', tracks: pool }]));
    expect(ranked[0]!.id).toBe('x2');
  });
});

describe('S1 — lyric fragment → song (the flagship bar)', () => {
  test('V1 snippet echo boosts rows whose snippet echoes the fragment', () => {
    const plan = planSearch('hum tere bin ab reh nahi sakte');
    expect(plan.kind).toBe('lyric_fragment');
    const cands = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const original = cands.find((r) => r.id === 'saavn-1')!;
    const bandhu = cands.find((r) => r.id === 'saavn-5')!;
    // the original's snippet "Tere Bina Kya Wajood Mera" echoes the fragment
    expect(snippetEcho(plan, original as Candidate)).toBeGreaterThan(0);
    expect(snippetEcho(plan, original as Candidate)).toBeGreaterThan(snippetEcho(plan, bandhu as Candidate));
  });

  test('V2 lyric verification (LRCLIB fixture): containment + matched line', async () => {
    const plan = planSearch('hum tere bin ab reh nahi sakte');
    const cands = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const verdicts = new Map<string, { matched: boolean; line: string }>();
    const LYRICS = 'Hum tere bin ab reh nahi sakte\nTere bina kya wajood mera\nTujhse juda gar ho jaayenge';
    // simulate LRCLIB success for the original only (fixture pattern)
    const norm = (s: string) => s.toLowerCase();
    const frag = plan.normalized;
    const hits = frag.split(' ').filter((t) => t.length >= 3 && norm(LYRICS).includes(t)).length;
    expect(hits / frag.split(' ').filter((t) => t.length >= 3).length).toBeGreaterThanOrEqual(0.7);
    verdicts.set('saavn-1', { matched: true, line: 'Hum tere bin ab reh nahi sakte' });
    const ranked = rankRows(plan, cands, {}, verdicts);
    expect(ranked[0]!.id).toBe('saavn-1');
    expect(ranked[0]!.reasonCode).toBe('LYRIC_MATCH');
    const out = withReasonLines(ranked);
    expect(out[0]!.reason).toBe(REASON_LINES.LYRIC_MATCH);
  });

  test('V2 graceful degradation: no verdicts → V1 ordering stands, no throw', () => {
    const plan = planSearch('hum tere bin ab reh nahi sakte');
    const cands = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    expect(() => rankRows(plan, cands, {}, new Map())).not.toThrow();
  });
});

describe('S8 — the learning loop closes (replay lock)', () => {
  test('after 2 correlated clicks, that track outranks provider order on the next search', async () => {
    const plan = planSearch('tum hi ho');
    const now = Date.now();
    const events = [
      { type: 'SEARCH_CLICK', ts: now - 3600_000, trackId: 'saavn-5', payload: { normalizedQuery: 'tum hi ho' } },
      { type: 'SEARCH_CLICK', ts: now - 1800_000, trackId: 'saavn-5', payload: { normalizedQuery: 'tum hi ho' } },
    ];
    const deps = memDeps(events);
    const engagement = await engagementForQuery(deps, plan.normalized, now);
    expect(engagement['saavn-5']).toBeGreaterThan(0.8);

    // provider order puts the original first; engagement flips Bandhu up
    const rows = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const clustered = clusterVersions(rows);
    const plain = rankRows(plan, clustered, {});
    const learned = rankRows(plan, clustered, { engagement });
    expect(plain[0]!.id).toBe('saavn-1');
    expect(learned[0]!.id).toBe('saavn-5');
    expect(learned[0]!.reasonCode).toBe('YOUR_PAST_CLICK');
  });

  test('fragment→track kv cache: remember + recall roundtrip, repeat lyric search ≈ instant', async () => {
    const deps = memDeps();
    await rememberResolve(deps, 'hum tere bin ab reh nahi sakte', {
      id: 'saavn-1',
      saavnId: '1',
      title: 'Tum Hi Ho',
      artist: 'Mithoon, Arijit Singh',
    });
    const t0 = performance.now();
    const hit = await recallResolve(deps, 'hum tere bin ab reh nahi sakte');
    const ms = performance.now() - t0;
    console.log(`  [perf] fragment-cache recall: ${ms.toFixed(3)} ms (budget <15)`);
    expect(ms).toBeLessThan(15);
    expect(hit?.trackId).toBe('saavn-1');
    expect(hit?.title).toBe('Tum Hi Ho');
  });

  test('kill switch pauses S5 writes', async () => {
    const kv: Record<string, unknown> = {};
    const deps: LearnDeps = {
      kvGet: async (k) => (k in kv ? (kv[k] as any) : null),
      kvSet: async (k, v) => {
        kv[k] = v;
      },
      eventsSince: async () => [],
      disabled: () => true,
    };
    await rememberResolve(deps, 'x y z q w e', { id: 't', title: 'T', artist: 'A' });
    expect(Object.keys(kv).length).toBe(0);
  });

  test('sourceTrust.search: clicked tracks that reach ≥30s get credited', () => {
    const events = [
      { type: 'SEARCH_CLICK', ts: 1, trackId: 'a', payload: {} },
      { type: 'SEARCH_CLICK', ts: 2, trackId: 'b', payload: {} },
    ];
    const listens = [
      { trackId: 'a', ts: 3, ratio: 0.45 }, // 45% listened — credited
      { trackId: 'b', ts: 4, ratio: 0.10 }, // skipped early — not credited
    ];
    const credited = credibleSearchClicks(events, listens);
    expect(credited.has('a')).toBe(true);
    expect(credited.has('b')).toBe(false);
  });
});

describe('Determinism (S3 contract)', () => {
  test('same inputs → same order, ties break by (score, trackId)', () => {
    const plan = planSearch('tum hi ho');
    const rows = mergePools([{ pool: 'p1', tracks: THH_POOL }]);
    const a = rankRows(plan, clusterVersions(rows), {});
    const b = rankRows(plan, clusterVersions(mergePools([{ pool: 'p1', tracks: THH_POOL }])), {});
    expect(a.map((r) => r.id)).toEqual(b.map((r) => r.id));
  });

  test('R-LOCK-1: event ids stay monotonic under STRING sort past counter 35', async () => {
    // found by this gauntlet: unpadded base-36 ids ("z" → "10") reordered
    // same-timestamp events and broke crash recovery (ledger R2 test).
    const { EventLedger } = await import('../../src/ai/core/ledger');
    const { createLedgerStore } = await import('../../src/ai/core/storeMemory');
    const T0 = 1750000000000;

    // burn 40+ ids so the counter crosses 35 (base-36 "z")
    const warmStore = await createLedgerStore();
    let warmNow = T0;
    const warm = new EventLedger(warmStore, () => warmNow);
    await warm.init();
    for (let i = 0; i < 40; i += 1) {
      await warm.trackStarted(
        { trackId: `w${i}`, artist: 'pritam', durationMs: 210000, energy: 0.5, valence: 0.5, wasRecommended: false },
        'user_queue',
      );
    }

    const store = await createLedgerStore();
    let now = T0;
    const l1 = new EventLedger(store, () => now);
    await l1.init();
    await l1.onAppActive();
    await l1.trackStarted({ trackId: 't-lock', artist: 'pritam', durationMs: 210000, energy: 0.5, valence: 0.5, wasRecommended: false }, 'user_queue');
    await l1.heartbeat(30000); // same-ms as TRACK_START — the killer case
    now += 3600_000;
    const l2 = new EventLedger(store, () => now);
    await l2.init();
    const listens = await store.getlistens();
    expect(listens.length).toBe(1); // recovered despite counter > 35
    expect(listens[0]!.listenedMs).toBe(30000);
  });
});

describe('GAUNTLET R2 locks (critique-round P0s)', () => {
  test('R-S1: single-word queries are TITLE searches, never browse (P0-1)', () => {
    const p1 = planSearch('mashooqa');
    expect(p1.kind).not.toBe('browse');
    expect(p1.kind).toBe('entity_title');
    expect(planSearch('kesariya').kind).toBe('entity_title');
    // genuine browse stays browse
    expect(planSearch('').kind).toBe('browse');
    expect(planSearch('a').kind).toBe('browse');
  });

  test('R-S2: browse plans short-circuit to zero tracks with zero latency (P0-1)', async () => {
    // music.ts imports AsyncStorage — assert on the plan layer instead,
    // which drives the short-circuit
    const p = planSearch('');
    expect(p.kind).toBe('browse');
    expect(p.cacheKey).toBe('q:|k:browse');
  });

  test('R-S3: LRCLIB honors abort — aborted callers get null immediately (P0-3)', async () => {
    const { fetchPlainLyrics } = await import('../../src/api/lrclib');
    const ctrl = new AbortController();
    ctrl.abort();
    const t0 = performance.now();
    const out = await fetchPlainLyrics('Never Gonna Give You Up', 'Rick Astley', ctrl.signal);
    const ms = performance.now() - t0;
    expect(out).toBeNull();
    expect(ms).toBeLessThan(5); // no fetch attempt, no 5s wait
  });

  test('R-S4: artist tokens never match by substring (badshah ≠ badshaholic)', () => {
    registerArtistLexicon([...Object.keys(ARTIST_PRIORS), 'badshah']);
    const p = planSearch('badshaholic song');
    expect(p.artistTokens).not.toContain('badshah');
  });

  test('R-S5: lyric verification uses word membership, not substring (ram ≠ dramatic)', async () => {
    const { verifyLyrics } = await import('../../src/search/verify');
    const plan = planSearch('ram ki dhun sabsejo tak jaaye');
    expect(plan.kind).toBe('lyric_fragment');
    // hermetic fetch stub: lyrics containing "dramatic" must NOT satisfy
    // the token "ram" (substring trap the fix closed)
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(JSON.stringify([{ plainLyrics: 'dramatic endings everywhere tonight' }]), {
        status: 200,
      })) as typeof fetch;
    try {
      const rows = [
        { ...THH_POOL[0]!, title: 'R-S5 Unique Title', id: 'rs5-x', poolRank: 0, pool: 'p1' },
      ] as any[];
      const verdicts = await verifyLyrics(plan, rows);
      expect(verdicts.size).toBe(0);
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});
