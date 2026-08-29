/** WEB MOCK of src/api/itunes.ts — returns [] (avoids browser CORS
 *  noise in the lab; the merged-thin top-up path is still exercised
 *  through the fixture saavn pool). */

import type { Track } from '../types';

export async function searchItunes(_query: string, _limit = 20): Promise<Track[]> {
  await new Promise((r) => setTimeout(r, 80));
  return [];
}
