/**
 * JioSaavn provider — runs 100% on-device. No server, no proxy.
 *
 * This is the same provider that previously lived in the Next.js API
 * routes, ported to pure client-side code. React Native has no CORS
 * restrictions, so the app talks to JioSaavn's public web API directly,
 * decrypts stream URLs locally (DES-ECB, pure-JS crypto-js) and hands
 * the resulting 320 kbps AAC CDN URL to the native player.
 */

import CryptoJS from 'crypto-js';
import type { Collection, Track } from '../types';

const API = 'https://www.jiosaavn.com/api.php';
const DES_KEY = CryptoJS.enc.Utf8.parse('38346591');
const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36',
  Accept: 'application/json, text/plain, */*',
};

async function saavnGet(params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({
    _format: 'json',
    _marker: '0',
    api_version: '4',
    ctx: 'web6dot0',
    ...params,
  });
  const res = await fetch(`${API}?${qs.toString()}`, {
    headers: BROWSER_HEADERS,
  });
  if (!res.ok) throw new Error(`saavn ${res.status}`);
  const text = await res.text();
  // JioSaavn occasionally prefixes junk before the JSON body.
  const start = text.indexOf('{');
  const arr = text.indexOf('[');
  const from = start === -1 ? arr : arr === -1 ? start : Math.min(start, arr);
  if (from === -1) throw new Error('saavn: no json');
  return JSON.parse(text.slice(from));
}

/** DES-ECB decrypt a JioSaavn encrypted_media_url into a playable CDN url. */
export function decryptMediaUrl(encrypted?: string): string | null {
  if (!encrypted) return null;
  try {
    const bytes = CryptoJS.DES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(encrypted) } as any,
      DES_KEY,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 },
    );
    const url = bytes.toString(CryptoJS.enc.Utf8);
    return url && url.startsWith('http') ? url : null;
  } catch {
    return null;
  }
}

/** Resolve the highest-quality playable URL for a track. */
export function resolveStreamUrl(track: Track): string | null {
  if (track.localUri) return track.localUri;
  const base = decryptMediaUrl(track.encryptedUrl) ?? track.previewUrl ?? null;
  if (!base) return null;
  // Upgrade to 320 kbps only when the provider says it exists.
  if (track.has320 === false) return base;
  return base.replace('_96.mp4', '_320.mp4').replace('_160.mp4', '_320.mp4');
}

/** Ask JioSaavn for a fresh encrypted url (used to recover expired streams). */
export async function refreshStreamUrl(track: Track): Promise<string | null> {
  if (!track.saavnId) return null;
  try {
    const data = await saavnGet({ __call: 'song.getDetails', pids: track.saavnId });
    const songs = Array.isArray(data?.songs) ? data.songs : data ? [data] : [];
    const song = songs[0];
    const enc = song?.more_info?.encrypted_media_url ?? song?.encrypted_media_url;
    const fresh = decryptMediaUrl(enc);
    if (!fresh) return null;
    const has320 = song?.more_info?.['320kbps'] === 'true' || song?.['320kbps'] === 'true';
    if (!has320) return fresh;
    return fresh.replace('_96.mp4', '_320.mp4').replace('_160.mp4', '_320.mp4');
  } catch {
    /* fall through */
  }
  return null;
}

/** Upgrade 150x150 artwork to 500x500 CDN variants. */
function art500(image?: string): string {
  if (!image) return '';
  return image
    .replace('150x150', '500x500')
    .replace('50x50', '500x500')
    .replace(/^http:/, 'https:');
}

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function mapSaavnSong(raw: any): Track | null {
  const mi = raw?.more_info ?? raw ?? {};
  const id = raw?.id ?? mi?.id;
  const enc = mi?.encrypted_media_url ?? raw?.encrypted_media_url;
  if (!id || !enc) return null;
  const artist =
    mi?.artistMap?.primary_artists?.[0]?.name ||
    mi?.primary_artists ||
    raw?.subtitle ||
    'Unknown artist';
  return {
    id: `saavn-${id}`,
    title: decodeEntities(raw?.title ?? mi?.title ?? 'Unknown'),
    artist: decodeEntities(String(artist)),
    album: mi?.album ?? raw?.album ?? undefined,
    artwork: art500(mi?.image ?? raw?.image),
    duration: parseInt(mi?.duration ?? raw?.duration ?? '0', 10) || 0,
    source: 'saavn',
    saavnId: String(id),
    encryptedUrl: enc,
    previewOnly: false,
    has320: mi?.['320kbps'] === 'true' || raw?.['320kbps'] === 'true' || undefined,
  };
}

export async function searchSaavn(query: string, limit = 30): Promise<Track[]> {
  const data = await saavnGet({
    __call: 'search.getResults',
    q: query,
    p: '1',
    n: String(limit),
  });
  const results = Array.isArray(data?.results) ? data.results : [];
  return results.map(mapSaavnSong).filter(Boolean) as Track[];
}

export async function getCharts(): Promise<Collection[]> {
  const data = await saavnGet({ __call: 'content.getCharts' });
  if (!Array.isArray(data)) return [];
  return data.slice(0, 6).map((c: any) => ({
    id: String(c.id),
    title: decodeEntities(c.title ?? ''),
    subtitle: c.more_info?.firstname ?? 'JioSaavn Chart',
    artwork: art500(c.image),
    trackCount: c.count ?? undefined,
  }));
}

export async function getCollectionTracks(collectionId: string): Promise<Track[]> {
  const data = await saavnGet({ __call: 'playlist.getDetails', listid: collectionId });
  const list = Array.isArray(data?.list) ? data.list : [];
  return list.map(mapSaavnSong).filter(Boolean) as Track[];
}
