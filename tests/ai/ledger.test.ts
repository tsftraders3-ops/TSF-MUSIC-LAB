/**
 * L1 — Event Ledger acceptance tests (§5.5, binary).
 *
 *  ✓ every event type fires with complete fields in a scripted session
 *  ✓ killing the app mid-track loses zero evidence (heartbeat recovery)
 *  ✓ the five grades produce different downstream profile deltas
 *  ✓ 90-day synthetic ledger compacts and stays bounded
 */

import { describe, expect, test } from 'bun:test';
import { EventLedger, gradeFor, skipBucketOf } from '../../src/ai/core/ledger';
import { createLedgerStore } from '../../src/ai/core/storeMemory';
import { buildProfile } from '../../src/ai/core/profile';
import type { TrackStartMeta } from '../../src/ai/core/ledger';

function meta(id: string, artist = 'arijit singh', energy = 0.4): TrackStartMeta {
  return {
    trackId: id,
    artist,
    title: `Song ${id}`,
    durationMs: 210000,
    energy,
    valence: 0.4,
    wasRecommended: false,
  };
}

const T0 = 1700000000000;

describe('L1 ledger — graded evidence', () => {
  test('skip taxonomy grades (§5.2 table)', () => {
    const dur = 210000;
    expect(gradeFor(true, 2000, dur, 2000 / dur)).toBe('INSTANT_REJECT'); // <5s
    expect(gradeFor(true, 15000, dur, 15000 / dur)).toBe('EARLY_SKIP'); // 5–30s
    expect(gradeFor(true, 90000, dur, 0.43)).toBe('MID_SKIP'); // 30–75%
    expect(gradeFor(true, 180000, dur, 0.857)).toBe('LATE_SKIP'); // ≥75%
    expect(gradeFor(true, 205000, dur, 0.976)).toBe('COMPLETED'); // ≥95%
    expect(gradeFor(false, dur, dur, 1.0)).toBe('COMPLETED'); // natural end
  });

  test('skip buckets are deciles 1..10', () => {
    expect(skipBucketOf(0.05)).toBe(1);
    expect(skipBucketOf(0.55)).toBe(6);
    expect(skipBucketOf(1)).toBe(10);
  });

  test('a scripted session fires the full event taxonomy with fields', async () => {
    const store = await createLedgerStore();
    let now = T0;
    const ledger = new EventLedger(store, () => now);
    await ledger.init();

    await ledger.onAppActive();
    await ledger.trackStarted(meta('t1'), 'user_queue');
    now += 10000;
    await ledger.heartbeat(10000);
    now += 10000;
    await ledger.heartbeat(20000);
    await ledger.recExposed('t9', 'smart_shuffle', 1, true);
    await ledger.searchQueried('arijit', 20);
    await ledger.searchClicked('t2', 0);
    now += 5000;
    ledger.markPendingSkip();
    await ledger.finalizeTrack(true, 'skip');
    await ledger.liked({ id: 't2', artist: 'pritam' }, 'search');
    await ledger.queueAdded({ id: 't3', artist: 'pritam' }, 'user_queue');
    await ledger.queueRemoved('t3', false);
    await ledger.notForMe('t4', 'radio');
    await ledger.stationEnded(5, 0.62);
    await ledger.onAppBackground();

    const events = await store.getEvents();
    const types = new Set(events.map((e) => e.type));
    for (const expected of [
      'SESSION_START', 'TRACK_START', 'TRACK_HEARTBEAT', 'TRACK_SKIP',
      'TRACK_LIKE', 'QUEUE_ADD_MANUAL', 'QUEUE_REMOVE', 'REC_EXPOSURE',
      'SEARCH_QUERY', 'SEARCH_CLICK', 'NOT_FOR_ME', 'STATION_ENDED', 'APP_BACKGROUND',
    ]) {
      expect(types.has(expected as never)).toBe(true);
    }
    // Every event carries id/ts/sessionId/payload.
    for (const e of events) {
      expect(e.id.length).toBeGreaterThan(0);
      expect(e.ts).toBeGreaterThan(0);
      expect(e.sessionId.length).toBeGreaterThan(0);
      expect(typeof e.payload).toBe('object');
    }
    // The skip listen was graded and persisted (20s of 210s → EARLY_SKIP).
    const listens = await store.getlistens();
    expect(listens.length).toBe(1);
    expect(listens[0]!.grade).toBe('EARLY_SKIP');
  });

  test('crash recovery: heartbeat reconstructs the partial listen on next boot', async () => {
    // Session 1: app killed mid-track after 3 heartbeats (30s).
    const store = await createLedgerStore();
    let now = T0;
    const ledger1 = new EventLedger(store, () => now);
    await ledger1.init();
    await ledger1.onAppActive();
    await ledger1.trackStarted(meta('t-crash'), 'user_queue');
    now += 30000;
    await ledger1.heartbeat(30000);
    // (app killed — no finalize, no closeSession)

    // Session 2: fresh boot on the same store.
    now += 3600_000;
    const ledger2 = new EventLedger(store, () => now);
    await ledger2.init();
    const listens = await store.getlistens();
    expect(listens.length).toBe(1);
    expect(listens[0]!.trackId).toBe('t-crash');
    expect(listens[0]!.listenedMs).toBe(30000);
    expect(listens[0]!.completionRatio).toBeCloseTo(30000 / 210000, 3);
  });

  test('the five grades produce different downstream profile deltas', async () => {
    const mk = async (ratio: number) => {
      const store = await createLedgerStore();
      const now = T0;
      // Direct graded-listen write (unit level — the ledger path is covered above).
      await store.appendListen({
        ...meta('t-x'),
        trackId: 't-x',
        sessionId: 's-x',
        surface: 'user_queue',
        startedTs: now,
        listenedMs: Math.round(210000 * ratio),
        durationMs: 210000,
        completionRatio: ratio,
        grade: gradeFor(true, 210000 * ratio, 210000, ratio),
        wasRecommended: false,
        explorationSlot: false,
      } as never);
      const listens = await store.getlistens();
      const profile = buildProfile(listens, [], [], { now });
      return profile.artists['arijit singh']?.w ?? 0;
    };
    const wInstant = await mk(0.01);
    const wEarly = await mk(0.12);
    const wMid = await mk(0.5);
    const wLate = await mk(0.8);
    const wDone = await mk(1.0);
    expect(wInstant).toBeLessThan(wEarly);
    expect(wEarly).toBeLessThan(wMid);
    expect(wMid).toBeLessThan(wLate);
    expect(wLate).toBeLessThan(wDone);
    expect(wInstant).toBeCloseTo(-3.0 * 0.4, 2); // INSTANT blame: 40% artist
    expect(wDone).toBeCloseTo(2.0 * 0.6, 2); // COMPLETE blame: 60% artist
  });

  test('REPLAY: a completed re-listen within 7d upgrades the grade', async () => {
    const store = await createLedgerStore();
    let now = T0;
    const ledger = new EventLedger(store, () => now);
    await ledger.init();
    await ledger.onAppActive();
    await ledger.trackStarted(meta('t-replay'), 'user_queue');
    await ledger.heartbeat(210000); // full duration listened
    await ledger.finalizeTrack(false, 'end');
    now += 3600_000;
    await ledger.trackStarted(meta('t-replay'), 'user_queue');
    await ledger.heartbeat(210000);
    await ledger.finalizeTrack(false, 'end');
    const listens = (await store.getlistens()).sort((a, b) => a.startedTs - b.startedTs);
    expect(listens[0]!.grade).toBe('COMPLETED');
    expect(listens[1]!.grade).toBe('REPLAY');
  });

  test('compaction enforces the 20k raw-event cap', async () => {
    const store = await createLedgerStore();
    let now = T0;
    const ledger = new EventLedger(store, () => now);
    await ledger.init();
    // Write 22k events quickly via direct store append (faster than emit).
    const events = Array.from({ length: 22000 }, (_, i) => ({
      id: `e-${i}`,
      ts: T0 + i * 1000,
      type: 'TRACK_HEARTBEAT' as const,
      sessionId: 's',
      trackId: 't',
      payload: { elapsedMs: i },
    }));
    await store.appendEvents(events);
    now = T0 + 22000 * 1000 + 1000;
    await ledger.maybeCompact();
    const count = await store.countEvents();
    expect(count).toBeLessThanOrEqual(20000);
    expect(count).toBeGreaterThan(15000);
  });
});
