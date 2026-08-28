/**
 * WEB MOCK of src/api/saavn.ts — fixture-backed, same export surface.
 * Metro redirects this only for platform=web (screenshot harness).
 */

import type { Collection, Track } from '../types';
import { isClean } from '../safety';
import { CHARTS, TRACKS, searchFixtures } from './fixtures';

function filterClean(list: Track[]): Track[] {
  return list.filter((t) => isClean({ title: t.title, artist: t.artist, explicit: t.explicit }));
}

export function decryptMediaUrl(): string | null {
  return null;
}

export function resolveStreamUrl(track: Track): string | null {
  return track.encryptedUrl ?? track.previewUrl ?? null;
}

export async function refreshStreamUrl(track: Track): Promise<string | null> {
  return track.encryptedUrl ?? track.previewUrl ?? null;
}

export async function searchSaavn(query: string, limit = 30): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 150));
  return searchFixtures(query, limit);
}

export async function searchSaavnRaw(query: string, limit = 30): Promise<Track[]> {
  return searchSaavn(query, limit);
}

export async function searchSaavnClean(query: string, limit = 30): Promise<Track[]> {
  return filterClean(await searchSaavn(query, limit));
}

export async function getCharts(): Promise<Collection[]> {
  await new Promise((r) => setTimeout(r, 100));
  return CHARTS;
}

export async function getCollectionTracks(collectionId: string): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 200));
  const idx = CHARTS.findIndex((c) => c.id === collectionId);
  if (idx === -1) return TRACKS;
  // rotate the fixture list so each "chart" looks different
  return TRACKS.slice(idx).concat(TRACKS.slice(0, idx));
}

export async function getAlbumTracks(albumId: string): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 120));
  return TRACKS.filter((t) => t.albumId === albumId);
}

export async function getArtistTracks(artistName: string, limit = 14): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 120));
  const pool = TRACKS.filter((t) => t.artist.includes(artistName));
  return (pool.length ? pool : TRACKS).slice(0, limit);
}

export async function getTrending(limit = 14): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 250));
  return filterClean(TRACKS).slice(0, limit);
}

export function collectionIsClean(c: Collection): boolean {
  return isClean({ title: c.title, artist: c.subtitle });
}
