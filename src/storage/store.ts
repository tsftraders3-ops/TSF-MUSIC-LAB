/**
 * On-device persistence — favorites, play history, recent searches,
 * download index and home cache. Everything lives in AsyncStorage;
 * downloaded audio files live in the app's document directory.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Track } from '../types';

const KEYS = {
  favorites: 'tsf.favorites.v1',
  recents: 'tsf.recents.v1',
  searches: 'tsf.recentSearches.v1',
  downloads: 'tsf.downloads.v1',
  chartsCache: 'tsf.chartsCache.v1',
};

async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full — non-fatal */
  }
}

// ── Favorites ──────────────────────────────────────────────────────────

export async function getFavorites(): Promise<Track[]> {
  return readJSON<Track[]>(KEYS.favorites, []);
}

let writeChain: Promise<unknown> = Promise.resolve();

/** Serialize a storage mutation so rapid taps can't clobber each other. */
function serialized<T>(job: () => Promise<T>): Promise<T> {
  const run = writeChain.then(job, job);
  writeChain = run.catch(() => undefined);
  return run;
}

export async function toggleFavorite(track: Track): Promise<boolean> {
  return serialized(async () => {
    const list = await getFavorites();
    const idx = list.findIndex((t) => t.id === track.id);
    let nowFavorite: boolean;
    if (idx >= 0) {
      list.splice(idx, 1);
      nowFavorite = false;
    } else {
      list.unshift(track);
      nowFavorite = true;
    }
    await writeJSON(KEYS.favorites, list.slice(0, 500));
    return nowFavorite;
  });
}

export async function isFavorite(track: Track): Promise<boolean> {
  const list = await getFavorites();
  return list.some((t) => t.id === track.id);
}

// ── Play history ───────────────────────────────────────────────────────

export async function getRecents(): Promise<Track[]> {
  return readJSON<Track[]>(KEYS.recents, []);
}

export async function pushRecent(track: Track): Promise<void> {
  return serialized(async () => {
    const list = await getRecents();
    const filtered = list.filter((t) => t.id !== track.id);
    filtered.unshift(track);
    await writeJSON(KEYS.recents, filtered.slice(0, 50));
  });
}

// ── Recent searches ────────────────────────────────────────────────────

export async function getRecentSearches(): Promise<string[]> {
  return readJSON<string[]>(KEYS.searches, []);
}

export async function pushRecentSearch(query: string): Promise<void> {
  const q = query.trim();
  if (!q) return;
  const list = await getRecentSearches();
  const filtered = list.filter((s) => s.toLowerCase() !== q.toLowerCase());
  filtered.unshift(q);
  await writeJSON(KEYS.searches, filtered.slice(0, 12));
}

export async function clearRecentSearches(): Promise<void> {
  await writeJSON(KEYS.searches, []);
}

// ── Downloads index (files managed by storage/downloads.ts) ────────────

export async function getDownloadIndex(): Promise<Track[]> {
  return readJSON<Track[]>(KEYS.downloads, []);
}

export async function setDownloadIndex(tracks: Track[]): Promise<void> {
  await writeJSON(KEYS.downloads, tracks);
}

export async function removeFromDownloadIndex(trackId: string): Promise<Track[]> {
  const list = await getDownloadIndex();
  const next = list.filter((t) => t.id !== trackId);
  await writeJSON(KEYS.downloads, next);
  return next;
}

// ── Home charts cache (6h TTL — charts don't move faster than that) ────

interface ChartsCache {
  at: number;
  shelves: Array<{ collection: { id: string; title: string; subtitle?: string; artwork: string; trackCount?: number }; tracks: Track[] }>;
}

export async function getChartsCache(allowStale = false) {
  const cache = await readJSON<ChartsCache | null>(KEYS.chartsCache, null);
  if (!cache) return null;
  if (!allowStale && Date.now() - cache.at > 6 * 60 * 60 * 1000) return null;
  return cache.shelves;
}

export async function setChartsCache(shelves: ChartsCache['shelves']): Promise<void> {
  await writeJSON(KEYS.chartsCache, { at: Date.now(), shelves });
}
