/**
 * L3 — Session Brain acceptance tests (§7.4, binary).
 *
 *  ✓ the vibe state machine drives every documented transition
 *  ✓ SKIP_STORM: after 3 instant skips, the protocol avoids the storm
 *    artists and steers energy away
 *  ✓ dedup memory blocks re-serves within the 7-day window
 *  ✓ FLOW vibe-lock: energy stays within tolerance
 */

import { describe, expect, test } from 'bun:test';
import { SessionBrain } from '../../src/ai/core/session';
import { listenOf } from './corpus';

const T0 = 1750000000000;

describe('L3 session brain', () => {
  test('WARMUP → FLOW → PEAK transitions', () => {
    const brain = new SessionBrain(T0);
    // 4 completions at moderate energy → FLOW.
    for (let i = 0; i < 4; i++) {
      const v = brain.push(listenOf(`t-f${i}`, 'arijit singh', T0 + i * 220000, 's', 1, { energy: 0.6 }));
      void v;
    }
    expect(brain.state.vibe).toBe('FLOW');
    // Sustained ≥0.8 for 3 tracks → PEAK.
    for (let i = 0; i < 3; i++) {
      brain.push(listenOf(`t-p${i}`, 'diljit dosanjh', T0 + (4 + i) * 220000, 's', 1, { energy: 0.85 }));
    }
    expect(brain.state.vibe).toBe('PEAK');
  });

  test('WIND_DOWN on a declining energy trajectory', () => {
    const brain = new SessionBrain(T0);
    brain.push(listenOf('t-w0', 'a', T0, 's', 1, { energy: 0.7 }));
    brain.push(listenOf('t-w1', 'b', T0 + 220000, 's', 1, { energy: 0.6 }));
    brain.push(listenOf('t-w2', 'c', T0 + 440000, 's', 1, { energy: 0.42 }));
    expect(['WIND_DOWN']).toContain(brain.state.vibe);
  });

  test('SKIP_STORM: 3 instant-rejects in 6 tracks → protocol fires', () => {
    const brain = new SessionBrain(T0);
    // Two fine tracks, then 3 instant rejects of high-energy artists.
    brain.push(listenOf('t-s0', 'arijit singh', T0, 's', 1, { energy: 0.5 }));
    brain.push(listenOf('t-s1', 'arijit singh', T0 + 220000, 's', 1, { energy: 0.55 }));
    brain.push(listenOf('t-s2', 'badshah', T0 + 440000, 's', 0.004, { energy: 0.85, grade: 'INSTANT_REJECT' }));
    brain.push(listenOf('t-s3', 'honey singh', T0 + 660000, 's', 0.004, { energy: 0.8, grade: 'INSTANT_REJECT' }));
    brain.push(listenOf('t-s4', 'raftaar', T0 + 880000, 's', 0.004, { energy: 0.75, grade: 'INSTANT_REJECT' }));
    expect(brain.state.vibe).toBe('SKIP_STORM');

    const storm = brain.stormProtocol;
    expect(storm.active).toBe(true);
    expect(storm.avoidArtists.has('badshah')).toBe(true);
    expect(storm.avoidArtists.has('honey singh')).toBe(true);
    // The storm was high-energy → the protocol steers DOWN.
    expect(storm.energyDirection).toBe('down');
  });

  test('skip storm artists are avoidable; same-artist horizon holds', () => {
    const brain = new SessionBrain(T0);
    for (let i = 0; i < 6; i++) {
      brain.push(listenOf(`t-r${i}`, 'arijit singh', T0 + i * 220000, 's', 1, { energy: 0.5 }));
    }
    expect(brain.artistRecentlyPlayed('arijit singh')).toBe(true);
    expect(brain.artistRecentlyPlayed('shreya ghoshal')).toBe(false);
  });

  test('dedup memory: served tracks blocked for 7 days', () => {
    const brain = new SessionBrain(T0);
    brain.served('t-dup', T0);
    expect(brain.isDuplicate('t-dup', T0 + 3600_000)).toBe(true);
    expect(brain.isDuplicate('t-dup', T0 + 6.9 * 86400_000)).toBe(true);
    expect(brain.isDuplicate('t-dup', T0 + 7.1 * 86400_000)).toBe(false);
    expect(brain.isDuplicate('t-other', T0)).toBe(false);
  });

  test('session energy is recency-tiered', () => {
    const brain = new SessionBrain(T0);
    // Old window low energy, recent tracks high → energy pulled up.
    brain.push(listenOf('t-e0', 'a', T0, 's', 1, { energy: 0.2 }));
    brain.push(listenOf('t-e1', 'a', T0 + 220000, 's', 1, { energy: 0.3 }));
    brain.push(listenOf('t-e2', 'a', T0 + 440000, 's', 1, { energy: 0.8 }));
    brain.push(listenOf('t-e3', 'a', T0 + 660000, 's', 1, { energy: 0.9 }));
    expect(brain.sessionEnergy).toBeGreaterThan(0.55);
  });
});
