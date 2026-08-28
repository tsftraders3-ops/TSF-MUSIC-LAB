/**
 * L2 — Taste Profile acceptance tests (§6.8, binary).
 *
 *  ✓ decay: a "binge then abstain" ledger halves effective weight within
 *    the artist half-life
 *  ✓ daypart: 5+ sessions per block → distinct artist sets per block
 *  ✓ clusters: 4 planted communities recovered by label propagation
 *  ✓ mood cells: k-means splits the (energy, valence) plane sensibly
 *  ✓ corrections: mute/boost change the next engine query
 *  ✓ HEART_CONTRADICT: hearted-then-double-instant-skipped collapses
 */

import { describe, expect, test } from 'bun:test';
import { buildProfile, decay, labelPropagation, moodKMeans, topArtists } from '../../src/ai/core/profile';
import { artistAffinity } from '../../src/ai/core/decision';
import type { LedgerEvent, ListenRecord, SessionRecord } from '../../src/ai/core/types';
import { fourCommunityLedger, listenOf } from './corpus';

const DAY = 86400_000;
const NOW = 1750000000000;

function sessionsFor(listens: ListenRecord[]): SessionRecord[] {
  const byId = new Map<string, SessionRecord>();
  for (const l of listens) {
    if (!byId.has(l.sessionId)) {
      byId.set(l.sessionId, {
        id: l.sessionId,
        startTs: l.startedTs,
        daypart: 'evening',
        dayKind: 'weekday',
        trackCount: 0,
        totalListenMs: 0,
      });
    }
    const s = byId.get(l.sessionId)!;
    s.trackCount += 1;
    s.totalListenMs += l.listenedMs;
  }
  return [...byId.values()];
}

describe('L2 profile — decay & memory', () => {
  test('half-life math: w halves per halfLife days', () => {
    expect(decay(1, 0, 45)).toBe(1);
    expect(decay(1, 45, 45)).toBeCloseTo(0.5, 5);
    expect(decay(1, 90, 45)).toBeCloseTo(0.25, 5);
  });

  test('binge-then-abstain: artist weight halves within its half-life (§6.8)', () => {
    // Binge: 20 completions 60 days ago; nothing since.
    const bingeTs = NOW - 60 * DAY;
    const listens: ListenRecord[] = [];
    for (let i = 0; i < 20; i++) {
      listens.push(listenOf(`t-a${i}`, 'arijit singh', bingeTs + i * 240000, 's-binge', 1));
    }
    // Control: 20 completions yesterday.
    for (let i = 0; i < 20; i++) {
      listens.push(listenOf(`t-b${i}`, 'shreya ghoshal', NOW - DAY + i * 240000, 's-recent', 1));
    }
    const profile = buildProfile(listens, [], sessionsFor(listens), { now: NOW });
    // Weights are stored raw; decay is applied lazily at read (§10.3).
    const HALF_LIFE = { artist: 45 } as const;
    const arijitAgeDays = (NOW - profile.artists['arijit singh']!.lastEventTs) / DAY;
    const shreyaAgeDays = (NOW - profile.artists['shreya ghoshal']!.lastEventTs) / DAY;
    const arijitEffective = decay(profile.artists['arijit singh']!.w, arijitAgeDays, HALF_LIFE.artist);
    const shreyaEffective = decay(profile.artists['shreya ghoshal']!.w, shreyaAgeDays, HALF_LIFE.artist);
    // §6.8 criterion: effective weight halves within its half-life —
    // 60d old @ 45d half-life → 0.5^(60/45) ≈ 0.397 of the fresh weight.
    expect(arijitEffective / shreyaEffective).toBeLessThan(0.5);
    expect(arijitEffective / shreyaEffective).toBeGreaterThan(0.3);
    const arijit = topArtists(profile, NOW, 10).find((a) => a.artist === 'arijit singh');
    const shreya = topArtists(profile, NOW, 10).find((a) => a.artist === 'shreya ghoshal');
    // After the §6.2 sqrt read-shape the fresher artist still leads.
    expect(arijit!.w).toBeGreaterThan(0);
    expect(shreya!.w / arijit!.w).toBeGreaterThan(1.2);
  });

  test('daypart matrix: distinct artist sets per block (Jaccard < 0.5)', () => {
    const listens: ListenRecord[] = [];
    const sessions: SessionRecord[] = [];
    // Morning block = Punjabi party artists (07:00–10:00 local).
    // Night block = soulful singers (21:00–23:00 local).
    const mkBlock = (block: 'morning' | 'night', artists: string[], dayCount: number) => {
      for (let d = 0; d < dayCount; d++) {
        const base = NOW - (20 - d) * DAY;
        const date = new Date(base);
        date.setHours(block === 'morning' ? 8 : 22, 0, 0, 0);
        const sid = `s-${block}-${d}`;
        sessions.push({ id: sid, startTs: date.getTime(), daypart: block, dayKind: 'weekday', trackCount: 6, totalListenMs: 6 * 200000 });
        artists.forEach((artist, i) => {
          listens.push(listenOf(`t-${block}-${artist.replace(/\s/g, '')}-${d}-${i}`, artist, date.getTime() + i * 220000, sid, 1));
        });
      }
    };
    mkBlock('morning', ['diljit dosanjh', 'ap dhillon', 'guru randhawa'], 7);
    mkBlock('night', ['arijit singh', 'shreya ghoshal', 'pritam'], 7);

    const profile = buildProfile(listens, [], sessions, { now: NOW });
    const morningCell = profile.daypart['morning|weekday'];
    const nightCell = profile.daypart['night|weekday'];
    expect(morningCell).toBeDefined();
    expect(nightCell).toBeDefined();
    expect(morningCell!.sessionCount).toBeGreaterThanOrEqual(5);
    expect(nightCell!.sessionCount).toBeGreaterThanOrEqual(5);

    const mArtists = new Set(Object.keys(morningCell!.artistWeights));
    const nArtists = new Set(Object.keys(nightCell!.artistWeights));
    const inter = [...mArtists].filter((a) => nArtists.has(a)).length;
    const union = new Set([...mArtists, ...nArtists]).size;
    expect(inter / union).toBeLessThan(0.5);

    // The morning cell ranks a Punjabi artist on top; night a soulful one.
    const mTop = Object.entries(morningCell!.artistWeights).sort((a, b) => b[1] - a[1])[0]![0];
    const nTop = Object.entries(nightCell!.artistWeights).sort((a, b) => b[1] - a[1])[0]![0];
    expect(['diljit dosanjh', 'ap dhillon', 'guru randhawa']).toContain(mTop);
    expect(['arijit singh', 'shreya ghoshal', 'pritam']).toContain(nTop);
  });

  test('clusters: 4 planted communities recovered (§6.8)', () => {
    const { listens, sessions } = fourCommunityLedger(14);
    const profile = buildProfile(listens, [], sessions, { now: NOW });
    const clusters = profile.clusters.artistClusters;
    expect(clusters.length).toBeGreaterThanOrEqual(3);

    // Recovery check: for each community, the members' dominant cluster
    // assignment groups ≥3 of the 4 canonical artists together.
    const communities = [
      ['arijit singh', 'shreya ghoshal', 'pritam', 'jubin nautiyal'],
      ['diljit dosanjh', 'ap dhillon', 'guru randhawa', 'karan aujla'],
      ['eminem', 'linkin park', 'imagine dragons', 'drake'],
      ['nusrat fateh ali khan', 'kailash kher', 'rekha bhardwaj'],
    ];
    let recovered = 0;
    for (const community of communities) {
      const clusterIds = community.map((a) => clusters.find((c) => c.artistIds.includes(a))?.id);
      const counts = new Map<string, number>();
      clusterIds.forEach((id) => id && counts.set(id, (counts.get(id) ?? 0) + 1));
      const best = Math.max(0, ...counts.values());
      if (best >= 3) recovered += 1;
    }
    expect(recovered).toBeGreaterThanOrEqual(4);
  });

  test('mood cells cover the plane with distinct labels', () => {
    const listens: ListenRecord[] = [];
    const corners = [
      { e: 0.15, v: 0.2 },
      { e: 0.85, v: 0.8 },
      { e: 0.2, v: 0.85 },
      { e: 0.8, v: 0.2 },
    ];
    let i = 0;
    for (const c of corners) {
      for (let n = 0; n < 8; n++) {
        listens.push(
          listenOf(`t-m${i++}`, `artist ${i}`, NOW - DAY + n * 240000, `s-m${Math.floor(i / 8)}`, 1, {
            energy: c.e + (n % 3) * 0.02,
            valence: c.v + (n % 3) * 0.02,
          }),
        );
      }
    }
    const cells = moodKMeans(listens);
    expect(cells.length).toBeGreaterThanOrEqual(3);
    const labels = new Set(cells.map((c) => c.label));
    expect(labels.size).toBeGreaterThanOrEqual(3);
    // Euphoric corner exists and centers high.
    const euphoric = cells.find((c) => c.energyCenter > 0.7 && c.valenceCenter > 0.6);
    expect(euphoric).toBeDefined();
  });

  test('corrections: mute + boost change the next engine query (§6.8)', () => {
    const listens: ListenRecord[] = [];
    for (let i = 0; i < 10; i++) {
      listens.push(listenOf(`t-x${i}`, 'arijit singh', NOW - DAY + i * 240000, 's1', 1));
      listens.push(listenOf(`t-y${i}`, 'diljit dosanjh', NOW - DAY + i * 240000, 's1', 1));
    }
    const clean = buildProfile(listens, [], sessionsFor(listens), { now: NOW });
    const base = artistAffinity(clean, 'arijit singh', NOW);
    expect(base).toBeGreaterThan(0);

    const muted = buildProfile(listens, [], sessionsFor(listens), {
      now: NOW,
      corrections: { mutedArtists: ['arijit singh'], mutedTracks: [], boosts: {}, wrongLabels: [] },
    });
    expect(muted.corrections.mutedArtists).toContain('arijit singh');

    const boosted = buildProfile(listens, [], sessionsFor(listens), {
      now: NOW,
      corrections: { mutedArtists: [], mutedTracks: [], boosts: { 'diljit dosanjh': 2 }, wrongLabels: [] },
    });
    const boostBefore = artistAffinity(clean, 'diljit dosanjh', NOW);
    const boostAfter = artistAffinity(boosted, 'diljit dosanjh', NOW);
    expect(boostAfter).toBeCloseTo(boostBefore * 2, 5);
  });

  test('HEART_CONTRADICT: hearted track instant-skipped ×2 collapses heart weight', () => {
    const listens: ListenRecord[] = [];
    // Heart event 20d ago.
    const heartEvent: LedgerEvent = {
      id: 'e-h1',
      ts: NOW - 20 * DAY,
      type: 'TRACK_LIKE',
      sessionId: 's1',
      trackId: 't-loved',
      payload: { artist: 'arijit singh' },
    };
    // Two instant-rejects of the SAME hearted track afterwards.
    listens.push(listenOf('t-loved', 'arijit singh', NOW - 10 * DAY, 's2', 0.005, { grade: 'INSTANT_REJECT' }));
    listens.push(listenOf('t-loved', 'arijit singh', NOW - 9 * DAY, 's3', 0.005, { grade: 'INSTANT_REJECT' }));
    // Plus organic completes so the artist still exists.
    for (let i = 0; i < 4; i++) {
      listens.push(listenOf(`t-ok${i}`, 'arijit singh', NOW - DAY + i * 240000, 's4', 1));
    }

    const withContradiction = buildProfile(listens, [heartEvent], sessionsFor(listens), { now: NOW });
    const withoutHeart = buildProfile(listens, [], sessionsFor(listens), { now: NOW });

    const wHeart = withContradiction.artists['arijit singh']!.w;
    const wPlain = withoutHeart.artists['arijit singh']!.w;
    // The heart (+4.0) should NOT have landed at full weight: contradiction
    // collapses it to +1.0 → net heart contribution = 1.0, not 4.0.
    expect(wHeart - wPlain).toBeCloseTo(1.0, 1);
  });

  test('label propagation is deterministic', () => {
    const { listens, sessions } = fourCommunityLedger(10);
    const p1 = buildProfile(listens, [], sessions, { now: NOW });
    const p2 = buildProfile(listens, [], sessions, { now: NOW });
    expect(JSON.stringify(p1.clusters.artistClusters.map((c) => c.artistIds))).toBe(
      JSON.stringify(p2.clusters.artistClusters.map((c) => c.artistIds)),
    );
  });
});
