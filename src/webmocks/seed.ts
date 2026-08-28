/**
 * WEB SEED — pre-populates localStorage (AsyncStorage web backend) with
 * realistic listening history so the screenshot harness renders a
 * "lived-in" app: favorites, recents, play counts (→ Daily Mixes),
 * recent searches. WEB ONLY.
 */

import { TRACKS } from './fixtures';

const LS_PREFIX = '';

function set(key: string, value: unknown) {
  try {
    window.localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch {
    /* harness only */
  }
}

const favorites = [TRACKS[0], TRACKS[4], TRACKS[5], TRACKS[6], TRACKS[9], TRACKS[10], TRACKS[11]];
const recents = [TRACKS[0], TRACKS[9], TRACKS[4], TRACKS[8], TRACKS[1], TRACKS[10], TRACKS[2], TRACKS[11]];
const playCounts = [
  { track: TRACKS[9], count: 23 },
  { track: TRACKS[0], count: 18 },
  { track: TRACKS[10], count: 15 },
  { track: TRACKS[4], count: 12 },
  { track: TRACKS[8], count: 9 },
  { track: TRACKS[1], count: 7 },
  { track: TRACKS[2], count: 5 },
  { track: TRACKS[11], count: 4 },
];
const recentSearches = ['arijit singh', 'punjabi hits'];

set('tsf.favorites.v1', favorites);
set('tsf.recents.v1', recents);
set('tsf.playCounts.v1', playCounts);
set('tsf.recentSearches.v1', recentSearches);
set('tsf.autoplay.v1', true);
set('tsf.smartShuffle.v1', false);
