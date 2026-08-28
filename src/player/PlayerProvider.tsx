/**
 * PlayerProvider — wraps react-native-track-player into a simple app-level
 * API: play a queue, shuffle, repeat, like, and downloads-aware playback.
 *
 * Design notes (gauntlet round 2):
 *  - setup failures are never cached — next interaction retries cleanly
 *  - the RNTP queue is the single source of truth; React mirrors it
 *    (rehydrated on mount so app-kill-relaunch keeps shuffle/queue intact)
 *  - shuffle reorders only the *upcoming* tracks — never restarts the song
 *  - progress is NOT in this context (see useProgress in components) so
 *    playback doesn't re-render every row twice a second
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import TrackPlayer, {
  Capability,
  RepeatMode,
  usePlaybackState,
  useActiveTrack,
  AppKilledPlaybackBehavior,
  type Track as RNTrack,
} from 'react-native-track-player';
import type { Track } from '../types';
import { resolveStreamUrl } from '../api/saavn';
import { playbackService } from './service';
import {
  getDownloadIndex,
  getFavorites,
  pushRecent,
  toggleFavorite as storeToggleFavorite,
} from '../storage/store';

let setupPromise: Promise<void> | null = null;
let notifAsked = false;

async function askNotificationPermission(): Promise<void> {
  if (notifAsked) return;
  notifAsked = true;
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch {
      /* denied → playback still works, controls just won't show */
    }
  }
}

async function ensureSetup(): Promise<void> {
  if (!setupPromise) {
    setupPromise = (async () => {
      TrackPlayer.registerPlaybackService(() => playbackService);
      try {
        await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
      } catch (e: any) {
        // "already initialized" is fine; anything else must be retryable.
        if (!String(e?.message ?? '').includes('already')) throw e;
      }
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
        progressUpdateEventInterval: 1,
      });
    })();
    setupPromise.catch(() => {
      // Never cache a rejected setup — next tap retries from scratch.
      setupPromise = null;
    });
  }
  return setupPromise;
}

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface PlayerState {
  active: Track | null;
  isPlaying: boolean;
  loading: boolean;
  queue: Track[];
  shuffle: boolean;
  repeat: 'off' | 'queue' | 'track';
  favorites: Set<string>;
  playQueue: (tracks: Track[], startIndex?: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  seek: (seconds: number) => Promise<void>;
  setShuffle: (on: boolean) => Promise<void>;
  cycleRepeat: () => Promise<void>;
  toggleLike: (track: Track) => Promise<void>;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Track[]>([]);
  const [shuffle, setShuffleState] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'queue' | 'track'>('off');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const originalQueue = useRef<Track[]>([]);
  const recentPushed = useRef<string>('');
  const booted = useRef(false);

  // Boot: rehydrate queue from RNTP (app-kill-relaunch continuity) + favorites.
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    (async () => {
      try {
        await ensureSetup();
        const rntpQueue = (await TrackPlayer.getQueue()) as unknown as Track[];
        if (rntpQueue.length) {
          setQueue(rntpQueue);
          originalQueue.current = rntpQueue;
        }
      } catch {
        /* first cold start: empty queue */
      }
    })();
    getFavorites().then((list) => setFavorites(new Set(list.map((t) => t.id))));
  }, []);

  const playback = usePlaybackState();
  const activeRN = useActiveTrack();

  const active: Track | null = useMemo(() => {
    if (!activeRN) return null;
    return activeRN as unknown as Track;
  }, [activeRN]);

  // Record play history (sanitized — no stream URLs in storage).
  useEffect(() => {
    if (active?.id && active.id !== recentPushed.current) {
      recentPushed.current = active.id;
      const { url, localUri, ...meta } = active as any;
      void localUri;
      pushRecent(meta as Track).catch(() => undefined);
    }
  }, [active?.id]);

  const state = playback?.state;
  const isPlaying = state === 'playing';
  const loading = state === 'loading' || state === 'buffering';

  async function buildPlayable(tracks: Track[]): Promise<RNTrack[]> {
    const downloads = await getDownloadIndex();
    const byId = new Map(downloads.map((d) => [d.id, d]));
    const playable: RNTrack[] = [];
    for (const t of tracks) {
      const local = byId.get(t.id);
      const url = local?.localUri || t.localUri || resolveStreamUrl(t);
      if (!url) continue;
      playable.push({
        id: t.id,
        url,
        title: t.title,
        artist: t.artist,
        artwork: t.artwork,
        duration: t.duration || 0,
        source: t.source,
        saavnId: t.saavnId,
        encryptedUrl: t.encryptedUrl,
        previewUrl: t.previewUrl,
        previewOnly: t.previewOnly,
        has320: t.has320,
        localUri: local?.localUri || t.localUri,
      } as unknown as RNTrack);
    }
    return playable;
  }

  async function playQueue(tracks: Track[], startIndex = 0): Promise<void> {
    try {
      await ensureSetup();
      await askNotificationPermission();
      const wantedId = tracks[startIndex]?.id;
      const playable = await buildPlayable(tracks);
      if (!playable.length || !wantedId) return;
      const startAt = Math.max(
        0,
        playable.findIndex((t) => t.id === wantedId),
      );
      const mapped = playable as unknown as Track[];
      setQueue(mapped);
      originalQueue.current = tracks.filter((t) => mapped.some((m) => m.id === t.id));
      await TrackPlayer.reset();
      await TrackPlayer.add(playable);
      await TrackPlayer.skip(startAt);
      await TrackPlayer.play();
    } catch {
      /* transient setup/network failure — next tap retries */
    }
  }

  async function togglePlay(): Promise<void> {
    try {
      await ensureSetup();
      const current = await TrackPlayer.getActiveTrackIndex();
      if (current == null) {
        if (queue.length) await playQueue(queue, 0);
        return;
      }
      if (isPlaying) await TrackPlayer.pause();
      else await TrackPlayer.play();
    } catch {
      /* retry next tap */
    }
  }

  async function next(): Promise<void> {
    await TrackPlayer.skipToNext().catch(() => undefined);
  }

  async function prev(): Promise<void> {
    try {
      const pos = (await TrackPlayer.getProgress()).position;
      if (pos > 3) {
        await TrackPlayer.seekTo(0);
        return;
      }
      await TrackPlayer.skipToPrevious();
    } catch {
      await TrackPlayer.seekTo(0).catch(() => undefined);
    }
  }

  async function seek(seconds: number): Promise<void> {
    await TrackPlayer.seekTo(Math.max(0, seconds)).catch(() => undefined);
  }

  /**
   * Reorder only the UPCOMING tracks. The current song keeps playing
   * untouched: we remove every other queue entry (descending so indices
   * stay valid) and append the reordered remainder.
   */
  async function setShuffle(on: boolean): Promise<void> {
    setShuffleState(on);
    try {
      await ensureSetup();
      const rntpQueue = (await TrackPlayer.getQueue()) as unknown as Track[];
      const currentIdx = await TrackPlayer.getActiveTrackIndex();
      if (currentIdx == null || !rntpQueue.length) return;

      const currentId = rntpQueue[currentIdx]?.id;
      const upcoming = rntpQueue.filter((_, i) => i !== currentIdx);
      const reordered = on ? shuffleArray(upcoming) : originalQueue.current.filter((t) => t.id !== currentId);

      // Remove all other entries, back-to-front so indices stay valid.
      const removeIndices = rntpQueue
        .map((_, i) => i)
        .filter((i) => i !== currentIdx)
        .sort((a, b) => b - a);
      if (removeIndices.length) await TrackPlayer.remove(removeIndices);

      if (reordered.length) {
        const playable = await buildPlayable(reordered);
        if (playable.length) await TrackPlayer.add(playable);
      }

      const full = [rntpQueue[currentIdx], ...reordered].filter(Boolean) as Track[];
      setQueue(full);
    } catch {
      /* keep UI state anyway */
    }
  }

  async function cycleRepeat(): Promise<void> {
    const order: Array<'off' | 'queue' | 'track'> = ['off', 'queue', 'track'];
    const nextMode = order[(order.indexOf(repeat) + 1) % order.length];
    setRepeat(nextMode);
    const mode =
      nextMode === 'queue' ? RepeatMode.Queue : nextMode === 'track' ? RepeatMode.Track : RepeatMode.Off;
    await TrackPlayer.setRepeatMode(mode).catch(() => undefined);
  }

  async function toggleLike(track: Track): Promise<void> {
    const { url, localUri, ...meta } = track as any;
    void url;
    void localUri;
    const nowFav = await storeToggleFavorite(meta as Track);
    setFavorites((prev) => {
      const nextSet = new Set(prev);
      if (nowFav) nextSet.add(track.id);
      else nextSet.delete(track.id);
      return nextSet;
    });
  }

  const value: PlayerState = useMemo(
    () => ({
      active,
      isPlaying,
      loading,
      queue,
      shuffle,
      repeat,
      favorites,
      playQueue,
      togglePlay,
      next,
      prev,
      seek,
      setShuffle,
      cycleRepeat,
      toggleLike,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, isPlaying, loading, queue, shuffle, repeat, favorites],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer outside PlayerProvider');
  return ctx;
}
