/**
 * Search aggregator: JioSaavn first (full-length 320 kbps), iTunes as
 * automatic fallback when Saavn is thin or unreachable. Dedupes by
 * normalized title+artist so the merged list never repeats itself.
 */

import type { SearchResult, Track } from '../types';
import { searchSaavn } from './saavn';
import { searchItunes } from './itunes';

function dedupeKey(t: Track): string {
  return `${t.title.toLowerCase().trim()}|${t.artist.toLowerCase().trim()}`;
}

export async function searchMusic(query: string): Promise<SearchResult> {
  const trimmed = query.trim();
  if (!trimmed) return { tracks: [], degraded: false };

  let saavn: Track[] = [];
  try {
    saavn = await searchSaavn(trimmed);
  } catch {
    saavn = [];
  }

  if (saavn.length >= 8) {
    return { tracks: saavn, degraded: false };
  }

  // Thin/failed Saavn — top up with iTunes previews (clearly badged).
  let itunes: Track[] = [];
  try {
    itunes = await searchItunes(trimmed);
  } catch {
    itunes = [];
  }

  const seen = new Set(saavn.map(dedupeKey));
  const merged = [...saavn];
  for (const t of itunes) {
    const key = dedupeKey(t);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(t);
    }
  }
  return { tracks: merged, degraded: saavn.length === 0 && itunes.length > 0 };
}
