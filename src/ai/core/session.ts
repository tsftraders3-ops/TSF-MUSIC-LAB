/**
 * L3 — THE SESSION BRAIN (§7, "modeling the now").
 *
 * While the ledger remembers across time, the Session Brain models THIS
 * listening run:
 *
 *   • a 12-track sliding window with recency tiers (§7.1)
 *   • the vibe state machine — WARMUP / FLOW / PEAK / WIND_DOWN /
 *     SKIP_STORM / EXPLORING — recomputed on every track transition (§7.2)
 *   • the SKIP_STORM emergency protocol ("it's listening back")
 *   • cross-session dedup memory (last 100 radio/shuffle serves, 7-day TTL)
 */

import { SESSION } from './constants';
import type { ListenRecord, SessionState, VibeState } from './types';
import { blockOf, dayKindOf } from './time';

export class SessionBrain {
  state: SessionState;

  constructor(startTs: number, id = 's-live') {
    this.state = {
      id,
      startTs,
      daypart: blockOf(startTs),
      dayKind: dayKindOf(startTs),
      window: [],
      sessionArtists: new Map(),
      sessionGenres: new Map(),
      energyTrajectory: [],
      instantRejects: [],
      completionRate: 0,
      dedupSet: new Map(),
      vibe: 'WARMUP',
    };
  }

  /** Feed a finalized listen; recomputes the vibe. */
  push(listen: Pick<ListenRecord,
    'trackId' | 'artist' | 'genre' | 'energy' | 'valence' | 'completionRatio' | 'grade' | 'startedTs'
  >): VibeState {
    const s = this.state;
    s.window.push(listen as ListenRecord);
    if (s.window.length > SESSION.windowTracks) s.window.shift();

    const tier = tierOf(s.window.length - 1, s.window.length);
    s.sessionArtists.set(listen.artist, (s.sessionArtists.get(listen.artist) ?? 0) + tier);
    if (listen.genre) s.sessionGenres.set(listen.genre, (s.sessionGenres.get(listen.genre) ?? 0) + tier);
    s.energyTrajectory.push(listen.energy);
    if (s.energyTrajectory.length > SESSION.windowTracks) s.energyTrajectory.shift();
    if (listen.grade === 'INSTANT_REJECT') {
      s.instantRejects.push(listen.startedTs);
      if (s.instantRejects.length > SESSION.stormWindow) s.instantRejects.shift();
    }

    const completed = s.window.filter((l) => l.completionRatio >= 0.95).length;
    s.completionRate = s.window.length ? completed / s.window.length : 0;

    s.vibe = this.computeVibe();
    return s.vibe;
  }

  /** Instant-rejects INSIDE the last `stormWindow` tracks of the window. */
  get rejectsInWindow(): ListenRecord[] {
    return this.state.window.slice(-SESSION.stormWindow).filter((l) => l.grade === 'INSTANT_REJECT');
  }

  /** A track was served to the user (dedup memory, §7.1). */
  served(trackId: string, ts: number): void {
    this.state.dedupSet.set(trackId, ts);
    if (this.state.dedupSet.size > SESSION.windowTracks * 12) {
      // Keep the freshest 100-ish entries.
      const entries = [...this.state.dedupSet.entries()].sort((a, b) => b[1] - a[1]).slice(0, 100);
      this.state.dedupSet = new Map(entries);
    }
  }

  /** True when the track was served within the 7-day dedup window. */
  isDuplicate(trackId: string, now: number): boolean {
    const ts = this.state.dedupSet.get(trackId);
    if (ts == null) return false;
    return now - ts < 7 * 86400_000;
  }

  /**
   * The vibe state machine (§7.2). Evaluation order matters:
   * SKIP_STORM (emergency) → PEAK → WIND_DOWN → FLOW → EXPLORING → WARMUP.
   * The storm heals: rejects scroll OUT of the last-6 window as healthy
   * listens arrive — 3 rejects followed by completions is NOT a storm.
   */
  computeVibe(isExploring = false): VibeState {
    const s = this.state;

    // SKIP_STORM: ≥3 instant-rejects within the last 6 TRACKS (not the
    // last 6 rejects — healthy listens push rejects out and heal the storm).
    if (this.rejectsInWindow.length >= SESSION.stormThreshold) {
      return 'SKIP_STORM';
    }

    // PEAK: energy ≥0.8 sustained 3+ tracks while in FLOW-like conditions.
    const last3 = s.energyTrajectory.slice(-3);
    if (last3.length >= 3 && last3.every((e) => e >= 0.8)) return 'PEAK';

    // WIND_DOWN: declining energy 3+ tracks in a row, or lateNight block.
    const last3d = s.energyTrajectory.slice(-3);
    if (
      last3d.length >= 3 &&
      last3d[0] > last3d[1] && last3d[1] > last3d[2] &&
      last3d[0] - last3d[2] >= 0.15
    ) {
      return 'WIND_DOWN';
    }
    if (s.daypart === 'lateNight' && s.energyTrajectory.length >= 3) {
      const recent = s.energyTrajectory.slice(-3);
      const older = s.energyTrajectory.slice(-6, -3);
      if (!older.length || mean(recent) < mean(older)) return 'WIND_DOWN';
    }

    // FLOW: completion ≥70% over the last 4 tracks.
    const last4 = s.window.slice(-4);
    if (last4.length >= 4) {
      const done = last4.filter((l) => l.completionRatio >= 0.95).length;
      if (done / last4.length >= 0.7) return 'FLOW';
    }

    if (isExploring) return 'EXPLORING';

    // Long pause / tiny window → WARMUP (gentle continuity).
    if (s.window.length < 4) return 'WARMUP';

    return s.completionRate >= 0.5 ? 'FLOW' : 'WARMUP';
  }

  /** Current session energy (recency-tiered mean of the window). */
  get sessionEnergy(): number {
    const t = this.state.energyTrajectory;
    if (!t.length) return 0.5;
    const n = t.length;
    const third = Math.max(1, Math.floor(n / 3));
    const recent = t.slice(-third);
    const mid = t.slice(-2 * third, -third);
    const old = t.slice(0, -2 * third);
    const wSum = recent.length * 3 + mid.length * 2 + old.length * 1 || 1;
    return (
      (sum(recent) * 3 + sum(mid) * 2 + sum(old) * 1) / wSum
    );
  }

  /** Recency-weighted session artist map (the "what room are we in" answer). */
  get sessionArtistList(): Array<{ artist: string; w: number }> {
    return [...this.state.sessionArtists.entries()]
      .map(([artist, w]) => ({ artist, w }))
      .sort((a, b) => b.w - a.w);
  }

  /**
   * SKIP_STORM emergency protocol data (§7.2): the artists to avoid and
   * the energy direction to move away from.
   */
  get stormProtocol(): { active: boolean; avoidArtists: Set<string>; energyDirection: 'up' | 'down' | 'hold' } {
    const stormTracks = this.rejectsInWindow;
    const active = stormTracks.length >= SESSION.stormThreshold;
    if (!active) return { active: false, avoidArtists: new Set(), energyDirection: 'hold' };
    const stormSet = new Set<string>();
    for (const l of stormTracks) stormSet.add(l.artist);
    // Move AWAY from the storm's energy: if storm was high-energy, go down.
    const stormEnergy = stormTracks.length ? mean(stormTracks.map((l) => l.energy)) : 0.5;
    const direction = stormEnergy >= 0.6 ? 'down' : stormEnergy <= 0.35 ? 'up' : 'hold';
    return { active: true, avoidArtists: stormSet, energyDirection: direction };
  }

  /** Same-artist horizon check (≤2 per 6-slot window, Appendix C). */
  artistRecentlyPlayed(artist: string, horizon = SESSION.maxSameArtistPer6): boolean {
    const last6 = this.state.window.slice(-6);
    const count = last6.filter((l) => l.artist === artist).length;
    return count >= horizon;
  }
}

function tierOf(indexInWindow: number, windowLength: number): number {
  // newest third ×3, middle ×2, oldest ×1 (§7.1 recency tiers)
  const third = Math.max(1, Math.floor(windowLength / 3));
  const fromEnd = windowLength - 1 - indexInWindow;
  if (fromEnd < third) return 3;
  if (fromEnd < 2 * third) return 2;
  return 1;
}

function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}

function sum(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}
