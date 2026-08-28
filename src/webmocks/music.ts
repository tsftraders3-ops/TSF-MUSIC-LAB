/** WEB MOCK of src/api/music.ts — fixture-backed search. */
import type { Track } from '../types';
import { searchFixtures } from './fixtures';

export interface SearchResult {
  tracks: Track[];
  degraded: boolean;
}

export async function searchMusic(query: string): Promise<SearchResult> {
  await new Promise((r) => setTimeout(r, 250));
  return { tracks: searchFixtures(query, 30), degraded: false };
}
