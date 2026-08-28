/**
 * react-native-track-player background service — the piece that makes
 * this a real music app: lock-screen / notification controls, audio
 * focus handling, automatic recovery when a CDN stream URL has gone
 * stale (refetch → decrypt → reload), and ENDLESS RADIO:
 *
 * When the queue runs dry and Autoplay is on, the TSF AI engine builds
 * a song radio from the last played artist and keeps the party going —
 * even when the UI process is gone. That is the Spotify "autoplay"
 * behavior, fully on-device.
 */

import TrackPlayer, { Event } from 'react-native-track-player';
import { resolveStreamUrl, refreshStreamUrl } from '../api/saavn';
import { getRadio } from '../ai/engine';
import { getAutoplay } from '../storage/store';
import type { Track } from '../types';

let refreshing = false;
let extending = false;

export async function playbackService(): Promise<void> {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener(Event.RemoteSeek, (e) => TrackPlayer.seekTo(e.position));

  // Android: headphones unplugged → pause politely.
  TrackPlayer.addEventListener(Event.RemoteDuck, async (e) => {
    if (e.paused) await TrackPlayer.pause();
  });

  // A stale/expired stream URL failed to load → refresh & retry once;
  // if the fresh URL is dead too, move on instead of stalling forever.
  TrackPlayer.addEventListener(Event.PlaybackError, async () => {
    if (refreshing) return;
    refreshing = true;
    try {
      const idx = await TrackPlayer.getActiveTrackIndex();
      if (idx == null) return;
      const current = await TrackPlayer.getTrack(idx);
      if (!current || current.source === 'itunes') return;
      const fresh = await refreshStreamUrl(current as unknown as Track);
      if (fresh) {
        await TrackPlayer.load({ ...current, url: fresh });
        await TrackPlayer.play();
      } else {
        await TrackPlayer.skipToNext().catch(() => undefined);
      }
    } catch {
      await TrackPlayer.skipToNext().catch(() => undefined);
    } finally {
      refreshing = false;
    }
  });

  // Queue finished → endless radio (Autoplay). Runs here — not in React —
  // so it survives the UI being killed.
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
    if (extending) return;
    extending = true;
    try {
      const autoplay = await getAutoplay();
      if (!autoplay) return;
      const rntpQueue = (await TrackPlayer.getQueue()) as unknown as Track[];
      const seed =
        [...rntpQueue].reverse().find((t) => !t.isRecommended && t.source === 'saavn') ??
        rntpQueue[rntpQueue.length - 1];
      if (!seed) return;

      const radioTracks = await getRadio(seed, 10);
      const existing = new Set(rntpQueue.map((t) => t.id));
      const fresh = radioTracks
        .filter((t) => !existing.has(t.id))
        .map((t) => ({ ...t, isRecommended: true }));
      if (!fresh.length) return;

      const playable = fresh
        .map((t) => {
          const url = resolveStreamUrl(t);
          if (!url) return null;
          return { ...(t as any), url };
        })
        .filter(Boolean);
      if (playable.length) {
        await TrackPlayer.add(playable as any);
        await TrackPlayer.play();
      }
    } catch {
      /* offline or API hiccup — stop silently, user can retry */
    } finally {
      extending = false;
    }
  });
}

export { resolveStreamUrl };
