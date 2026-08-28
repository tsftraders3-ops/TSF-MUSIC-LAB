/**
 * WEB MOCK of react-native-track-player — an in-memory playback engine
 * for the browser screenshot harness. Starts with a demo track "playing"
 * so the mini player, player screen and dynamic theming all render.
 * Metro redirects this module ONLY for platform=web.
 */

import { useEffect, useState } from 'react';
import './seed';

type RNTrack = Record<string, any>;

/* ── internal state ─────────────────────────────────────────────────── */

let queue: RNTrack[] = [];
let activeIndex = 0;
let playing = true;
let position = 47;
let duration = 224;
let repeatMode: 'off' | 'queue' | 'track' = 'off';
let shuffle = false;
let tick: ReturnType<typeof setInterval> | null = null;

const listeners: Array<(e?: any) => void> = [];
function emit(event?: any) {
  listeners.forEach((l) => l(event));
}

function startTicker() {
  if (tick) return;
  tick = setInterval(() => {
    if (playing && duration > 0) {
      position += 0.5;
      if (position >= duration) {
        position = 0;
        if (activeIndex < queue.length - 1) activeIndex += 1;
        duration = Number(queue[activeIndex]?.duration ?? 214) || 214;
      }
    }
  }, 500);
}

// ── demo state: a track is "already playing" when the harness boots ──
queue = [
  {
    id: 'w1',
    title: 'Mashooqa',
    artist: 'Pritam, Shilpa Rao',
    album: 'Cocktail 2',
    artwork:
      'https://c.saavncdn.com/465/Mashooqa-From-Cocktail-2-Hindi-2026-20260519130936-500x500.jpg',
    duration: 224,
    url: 'mock://demo-1',
    isRecommended: false,
  },
  {
    id: 'demo-2',
    title: 'Dhurandhar',
    artist: 'G.V. Prakash Kumar',
    album: 'Dhurandhar The Revenge',
    artwork:
      'https://c.saavncdn.com/581/Dhurandhar-The-Revenge-Hindi-2026-20260409161002-500x500.jpg',
    duration: 198,
    url: 'mock://demo-2',
    isRecommended: false,
  },
  {
    id: 'demo-3',
    title: 'Boom Shaka',
    artist: 'Dhanda Nyoliwala, KR$NA',
    album: 'Boom Shaka',
    artwork: 'https://c.saavncdn.com/307/Boom-Shaka-Hindi-2026-20260428064906-500x500.jpg',
    duration: 176,
    url: 'mock://demo-3',
    isRecommended: true,
  },
  {
    id: 'demo-4',
    title: 'Tere Bina (Sad Version)',
    artist: 'Arijit Singh',
    album: 'Emraan Hashmi Sad Love Hits',
    artwork:
      'https://c.saavncdn.com/732/Emraan-Hashmi-Sad-Love-Hits-Hindi-2026-20260604155755-500x500.jpg',
    duration: 268,
    url: 'mock://demo-4',
    isRecommended: false,
  },
];
activeIndex = 0;
startTicker();

/* ── enums (mirrored) ───────────────────────────────────────────────── */

export const State = {
  None: 'none',
  Ready: 'ready',
  Playing: 'playing',
  Paused: 'paused',
  Stopped: 'stopped',
  Buffering: 'buffering',
  Connecting: 'connecting',
} as const;

export const Event = {
  RemotePlay: 'remote-play',
  RemotePause: 'remote-pause',
  RemoteNext: 'remote-next',
  RemotePrevious: 'remote-previous',
  RemoteSeek: 'remote-seek',
  RemoteDuck: 'remote-duck',
  PlaybackQueueEnded: 'playback-queue-ended',
  PlaybackActiveTrackChanged: 'playback-active-track-changed',
  PlaybackProgressUpdated: 'playback-progress-updated',
  PlayerError: 'player-error',
} as const;

export const Capability = {
  Play: 'play',
  Pause: 'pause',
  Stop: 'stop',
  SkipToNext: 'skipToNext',
  SkipToPrevious: 'skipToPrevious',
  SeekTo: 'seekTo',
  JumpForward: 'jumpForward',
  JumpBackward: 'jumpBackward',
} as const;

export const RepeatMode = { Off: 0, Track: 1, Queue: 2 } as const;

export const AppKilledPlaybackBehavior = {
  ContinuePlayback: 'continue-playback',
  PausePlayback: 'pause-playback',
  StopPlaybackAndRemoveNotification: 'stop-playback-and-remove-notification',
} as const;

export type { RNTrack as Track };

/* ── the TrackPlayer object ─────────────────────────────────────────── */

const TrackPlayer = {
  async setupPlayer(): Promise<void> {
    /* no-op */
  },
  async updateOptions(): Promise<void> {
    /* no-op */
  },
  registerPlaybackService(): void {
    /* no-op — service events never fire on web */
  },
  addEventListener(_event: string, _handler: (e?: any) => void): { remove: () => void } {
    listeners.push(_handler);
    return { remove: () => undefined };
  },

  async load(track: RNTrack): Promise<void> {
    queue = [track, ...queue.slice(1)];
    activeIndex = 0;
    duration = Number(track?.duration ?? 214) || 214;
    position = 0;
    playing = true;
  },
  async play(): Promise<void> {
    playing = true;
  },
  async pause(): Promise<void> {
    playing = false;
  },
  async stop(): Promise<void> {
    playing = false;
    position = 0;
  },
  async reset(): Promise<void> {
    queue = [];
    activeIndex = -1;
    playing = false;
    position = 0;
  },
  async add(tracks: RNTrack | RNTrack[], insertBeforeIndex?: number): Promise<void> {
    const list = Array.isArray(tracks) ? tracks : [tracks];
    if (insertBeforeIndex == null) queue.push(...list);
    else queue.splice(insertBeforeIndex, 0, ...list);
    if (activeIndex === -1 && queue.length) activeIndex = 0;
  },
  async remove(indices: number | number[]): Promise<void> {
    const list = Array.isArray(indices) ? indices : [indices];
    list
      .sort((a, b) => b - a)
      .forEach((i) => {
        queue.splice(i, 1);
        if (activeIndex >= i && activeIndex > 0) activeIndex -= 1;
      });
  },
  async skip(index: number): Promise<void> {
    activeIndex = index;
    position = 0;
    duration = Number(queue[index]?.duration ?? 214) || 214;
    playing = true;
  },
  async skipToNext(): Promise<void> {
    if (activeIndex < queue.length - 1) {
      activeIndex += 1;
      position = 0;
      duration = Number(queue[activeIndex]?.duration ?? 214) || 214;
    }
  },
  async skipToPrevious(): Promise<void> {
    if (position > 3) {
      position = 0;
      return;
    }
    if (activeIndex > 0) {
      activeIndex -= 1;
      position = 0;
      duration = Number(queue[activeIndex]?.duration ?? 214) || 214;
    }
  },
  async seekTo(seconds: number): Promise<void> {
    position = Math.max(0, Math.min(duration, seconds));
  },
  async seekBy(offset: number): Promise<void> {
    position = Math.max(0, Math.min(duration, position + offset));
  },
  async setVolume(): Promise<void> {
    /* no-op */
  },
  async setRepeatMode(mode: number): Promise<void> {
    repeatMode = mode === 1 ? 'track' : mode === 2 ? 'queue' : 'off';
  },
  async setShuffleEnabled(on: boolean): Promise<void> {
    shuffle = on;
  },

  async getQueue(): Promise<RNTrack[]> {
    return queue;
  },
  async getTrack(index: number): Promise<RNTrack | null> {
    return queue[index] ?? null;
  },
  async getActiveTrackIndex(): Promise<number> {
    return activeIndex;
  },
  async getActiveTrack(): Promise<RNTrack | null> {
    return queue[activeIndex] ?? null;
  },
  async getProgress(): Promise<{ position: number; duration: number; buffered: number }> {
    return { position, duration, buffered: duration };
  },
  async getPlaybackState(): Promise<{ state: string }> {
    return { state: playing ? 'playing' : 'paused' };
  },
};

export default TrackPlayer;

/* ── hooks ──────────────────────────────────────────────────────────── */

export function usePlaybackState(): { state?: string } | string {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return { state: playing ? 'playing' : 'paused' };
}

export function useProgress(_interval = 500): { position: number; duration: number; buffered: number } {
  const [pos, setPos] = useState(position);
  useEffect(() => {
    const t = setInterval(() => setPos(position), _interval);
    return () => clearInterval(t);
  }, [_interval]);
  return { position: pos, duration, buffered: duration };
}

export function useActiveTrack(): RNTrack | null {
  const [track, setTrack] = useState<RNTrack | null>(queue[activeIndex] ?? null);
  useEffect(() => {
    const t = setInterval(() => setTrack(queue[activeIndex] ?? null), 900);
    return () => clearInterval(t);
  }, []);
  return track;
}

export function useTrackPlayerEvents(_events: unknown[], handler: (e: any) => void) {
  useEffect(() => {
    listeners.push(handler);
    return () => {
      const i = listeners.indexOf(handler);
      if (i >= 0) listeners.splice(i, 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { repeatMode, shuffle };
