/**
 * Web-harness fixtures — deterministic, realistic JioSaavn-shaped data
 * (real CDN artwork) so the browser screenshot rig renders the app with
 * authentic content. WEB ONLY — never bundled into the Android build
 * (metro.config.js redirects src/api/* → these mocks for platform web).
 */

import type { Track, Collection } from '../types';

const art = {
  cocktail2: 'https://c.saavncdn.com/689/Cocktail-2-Hindi-2026-20260629161048-500x500.jpg',
  mashooqa: 'https://c.saavncdn.com/465/Mashooqa-From-Cocktail-2-Hindi-2026-20260519130936-500x500.jpg',
  dhurandhar: 'https://c.saavncdn.com/581/Dhurandhar-The-Revenge-Hindi-2026-20260409161002-500x500.jpg',
  toxic: 'https://c.saavncdn.com/355/Toxic-Original-Motion-Picture-Soundtrack-Hindi-2026-20260818072032-500x500.jpg',
  awarapan: 'https://c.saavncdn.com/820/Awarapan-2-Hindi-2026-20260811181221-500x500.jpg',
  boom: 'https://c.saavncdn.com/307/Boom-Shaka-Hindi-2026-20260428064906-500x500.jpg',
  raksha: 'https://c.saavncdn.com/440/Raksha-Bandhan-Hindi-2022-20230212112927-500x500.jpg',
  meera: 'https://c.saavncdn.com/708/Meera-Ke-Krishna-Hindi-2025-20250116102117-500x500.jpg',
  hanuman: 'https://c.saavncdn.com/058/Hanuman-Ansh-Original-Motion-Picture-Soundtrack-Hindi-2026-20260710211303-500x500.jpg',
  trending: 'https://c.saavncdn.com/editorial/NowTrending_20260423085344.jpg',
  lofi: 'https://c.saavncdn.com/editorial/ChillMaaro-LoFiMix_20260403095103.jpg',
  old: 'https://c.saavncdn.com/editorial/OldHindiHits_20250826092719.jpg',
  emraan: 'https://c.saavncdn.com/732/Emraan-Hashmi-Sad-Love-Hits-Hindi-2026-20260604155755-500x500.jpg',
};

export const TRACKS: Track[] = [
  { id: 'w1', title: 'Mashooqa', artist: 'Pritam, Shilpa Rao', album: 'Cocktail 2', albumId: 'a1', artwork: art.mashooqa, duration: 224, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w1' },
  { id: 'w2', title: 'Dhurandhar', artist: 'G.V. Prakash Kumar', album: 'Dhurandhar The Revenge', albumId: 'a2', artwork: art.dhurandhar, duration: 198, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w2' },
  { id: 'w3', title: 'Toxic (Title Track)', artist: 'Sachet-Parampara', album: 'Toxic', albumId: 'a3', artwork: art.toxic, duration: 187, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w3' },
  { id: 'w4', title: 'Awarapan 2 Theme', artist: 'Mithoon', album: 'Awarapan 2', albumId: 'a4', artwork: art.awarapan, duration: 241, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w4' },
  { id: 'w5', title: 'Boom Shaka', artist: 'Dhanda Nyoliwala, KR$NA', album: 'Boom Shaka', albumId: 'a5', artwork: art.boom, duration: 176, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w5' },
  { id: 'w6', title: 'Raksha Bandhan (Title Track)', artist: 'Shreya Ghoshal', album: 'Raksha Bandhan', albumId: 'a6', artwork: art.raksha, duration: 210, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w6' },
  { id: 'w7', title: 'Meera Ke Krishna', artist: 'Jasleen Royal', album: 'Meera Ke Krishna', albumId: 'a7', artwork: art.meera, duration: 232, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w7' },
  { id: 'w8', title: 'Hanuman Ansh', artist: 'Amit Trivedi', album: 'Hanuman Ansh', albumId: 'a8', artwork: art.hanuman, duration: 205, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w8' },
  { id: 'w9', title: 'Chill Maaro (Lo-Fi)', artist: 'Lo-Fi Nation', album: 'Chill Maaro: Lo-Fi Mix', albumId: 'a9', artwork: art.lofi, duration: 189, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w9' },
  { id: 'w10', title: 'Tere Bina (Sad Version)', artist: 'Arijit Singh', album: 'Emraan Hashmi Sad Love Hits', albumId: 'a10', artwork: art.emraan, duration: 268, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w10' },
  { id: 'w11', title: 'Old Hindi Medley', artist: 'Kishore Kumar', album: 'Old Hindi Hits', albumId: 'a11', artwork: art.old, duration: 254, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w11' },
  { id: 'w12', title: 'Cocktail Nights', artist: 'Tanishk Bagchi', album: 'Cocktail 2', albumId: 'a1', artwork: art.cocktail2, duration: 203, source: 'saavn', previewOnly: false, encryptedUrl: 'mock://w12' },
];

export const CHARTS: Collection[] = [
  { id: 'chart-1', title: 'Now Trending', subtitle: 'Spotify', artwork: art.trending, kind: 'chart' },
  { id: 'chart-2', title: 'Bollywood Chartbusters', subtitle: 'Spotify', artwork: art.cocktail2, kind: 'chart' },
  { id: 'chart-3', title: 'Punjabi 101', subtitle: 'Spotify', artwork: art.boom, kind: 'chart' },
  { id: 'chart-4', title: 'Lo-Fi Beats', subtitle: 'Spotify', artwork: art.lofi, kind: 'chart' },
  { id: 'chart-5', title: 'Old Hindi Hits', subtitle: 'Spotify', artwork: art.old, kind: 'chart' },
];

/** Search results: deterministic "match" on the first word. */
export function searchFixtures(query: string, limit: number): Track[] {
  const q = query.trim().toLowerCase();
  const matched = TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      (t.album ?? '').toLowerCase().includes(q),
  );
  return (matched.length ? matched : TRACKS).slice(0, limit);
}
