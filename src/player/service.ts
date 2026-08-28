/**
 * react-native-track-player background service — the piece that makes
 * this a real music app: lock-screen / notification controls, audio
 * focus handling and automatic recovery when a CDN stream URL has
 * gone stale (refetch → decrypt → reload, all on-device).
 */

import TrackPlayer, { Event } from 'react-native-track-player';
import { resolveStreamUrl, refreshStreamUrl } from '../api/saavn';
import type { Track } from '../types';

let refreshing = false;

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

  // Queue finished → make sure progress UI resets cleanly.
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
    try {
      const order = await TrackPlayer.getQueue();
      if (order.length) await TrackPlayer.seekTo(0);
    } catch {
      /* noop */
    }
  });
}

export { resolveStreamUrl };
