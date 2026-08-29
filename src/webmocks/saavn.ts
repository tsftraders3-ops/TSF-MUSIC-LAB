/**
 * WEB MOCK of src/api/saavn.ts — fixture-backed, same export surface.
 * Metro redirects this only for platform=web (screenshot harness).
 */

import type { Collection, Track } from '../types';
import { isClean } from '../safety';
import { art, CHARTS, TRACKS, searchFixtures } from './fixtures';

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

export interface HomepageFeed {
  newAlbums: Collection[];
  featured: Collection[];
}

const NEW_ALBUMS: Collection[] = [
  { id: 'a1', title: 'Cocktail 2', subtitle: 'Pritam', artwork: art.cocktail2, kind: 'album' },
  { id: 'a2', title: 'Dhurandhar The Revenge', subtitle: 'G.V. Prakash Kumar', artwork: art.dhurandhar, kind: 'album' },
  { id: 'a4', title: 'Awarapan 2', subtitle: 'Mithoon', artwork: art.awarapan, kind: 'album' },
  { id: 'a5', title: 'Boom Shaka', subtitle: 'Dhanda Nyoliwala', artwork: art.boom, kind: 'album' },
  { id: 'a7', title: 'Meera Ke Krishna', subtitle: 'Jasleen Royal', artwork: art.meera, kind: 'album' },
  { id: 'a8', title: 'Hanuman Ansh', subtitle: 'Amit Trivedi', artwork: art.hanuman, kind: 'album' },
];

const FEATURED: Collection[] = [
  { id: 'chart-1', title: 'Now Trending', subtitle: 'JioSaavn', artwork: art.trending, kind: 'chart' },
  { id: 'chart-2', title: 'Bollywood Chartbusters', subtitle: 'JioSaavn', artwork: art.cocktail2, kind: 'chart' },
  { id: 'chart-3', title: 'Punjabi 101', subtitle: 'JioSaavn', artwork: art.boom, kind: 'chart' },
  { id: 'chart-4', title: 'Lo-Fi Beats', subtitle: 'JioSaavn', artwork: art.lofi, kind: 'chart' },
  { id: 'chart-5', title: 'Old Hindi Hits', subtitle: 'JioSaavn', artwork: art.old, kind: 'chart' },
  { id: 'fp-6', title: 'Sad Love Hits', subtitle: 'JioSaavn', artwork: art.emraan, kind: 'chart' },
  { id: 'fp-7', title: 'Romance Top 50', subtitle: 'JioSaavn', artwork: art.mashooqa, kind: 'chart' },
];

export async function getHomepageFeed(): Promise<HomepageFeed> {
  await new Promise((r) => setTimeout(r, 150));
  return { newAlbums: NEW_ALBUMS, featured: FEATURED };
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
