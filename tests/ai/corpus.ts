/**
 * Synthetic corpora for the replay harness (§11.1).
 *
 * Everything is generated deterministically (seeded) so a failing test
 * always reproduces. Corpora:
 *   • fourCommunityLedger() — 4 planted listening communities for cluster
 *     recovery tests (§6.8)
 *   • ninetyDayLedger()     — ~20k events / ~6k graded listens for perf
 *     budget tests (§10.3)
 *   • PROMPT_CORPUS         — the 20-prompt blind-test set (Appendix D5)
 *   • dodgeCorpus()         — safety filter attack patterns (Appendix D6)
 *   • fixtureCatalog()      — deterministic CatalogApi for surface tests
 */

import type { ListenRecord, SessionRecord, SourceSurface } from '../../src/ai/core/types';
import { seededRandom } from '../../src/ai/core/time';

const ARTIST_COMMUNITIES: string[][] = [
  ['arijit singh', 'shreya ghoshal', 'pritam', 'jubin nautiyal'],
  ['diljit dosanjh', 'ap dhillon', 'guru randhawa', 'karan aujla'],
  ['eminem', 'linkin park', 'imagine dragons', 'drake'],
  ['nusrat fateh ali khan', 'kailash kher', 'rekha bhardwaj'],
];

export function trackIdFor(artist: string, n: number): string {
  return `t-${artist.replace(/\s+/g, '-')}-${n}`;
}

export function listenOf(
  trackId: string,
  artist: string,
  startedTs: number,
  sessionId: string,
  ratio: number,
  overrides: Partial<ListenRecord> = {},
): ListenRecord {
  const durationMs = 210000;
  const grade: ListenRecord['grade'] =
    ratio >= 0.95 ? 'COMPLETED' : ratio >= 0.75 ? 'LATE_SKIP' : ratio >= 0.3 ? 'MID_SKIP' : ratio < 5 / 210 ? 'INSTANT_REJECT' : 'EARLY_SKIP';
  return {
    trackId,
    artist,
    title: `Song ${trackId}`,
    sessionId,
    surface: 'user_queue' as SourceSurface,
    startedTs,
    listenedMs: Math.round(durationMs * ratio),
    durationMs,
    completionRatio: ratio,
    grade,
    skipBucket: Math.max(1, Math.min(10, Math.ceil(ratio * 10))),
    wasRecommended: false,
    explorationSlot: false,
    energy: 0.5,
    valence: 0.5,
    ...overrides,
  };
}

/** 4 planted communities × N sessions each — cluster recovery corpus. */
export function fourCommunityLedger(sessionsPerCommunity = 12): { listens: ListenRecord[]; sessions: SessionRecord[] } {
  const rand = seededRandom(42);
  const listens: ListenRecord[] = [];
  const sessions: SessionRecord[] = [];
  const start = Date.now() - 30 * 86400_000;
  let sessionIdx = 0;
  for (let c = 0; c < 4; c++) {
    for (let s = 0; s < sessionsPerCommunity; s++) {
      const sessionId = `s-${sessionIdx++}`;
      const startTs = start + (c * 5000 + s * 150) * 60000; // spread over 30d
      sessions.push({
        id: sessionId,
        startTs,
        daypart: 'evening',
        dayKind: 'weekday',
        trackCount: 8,
        totalListenMs: 8 * 200000,
      });
      // 8 consecutive listens inside the community (occasionally 1 outsider).
      let prevArtist = -1;
      for (let i = 0; i < 8; i++) {
        let artistIdx = Math.floor(rand() * ARTIST_COMMUNITIES[c].length);
        if (artistIdx === prevArtist) artistIdx = (artistIdx + 1) % ARTIST_COMMUNITIES[c].length;
        prevArtist = artistIdx;
        const artist = ARTIST_COMMUNITIES[c][artistIdx];
        const outsider = rand() < 0.04;
        const finalArtist = outsider ? ARTIST_COMMUNITIES[(c + 1) % 4][0] : artist;
        listens.push(
          listenOf(trackIdFor(finalArtist, Math.floor(rand() * 6)), finalArtist, startTs + i * 220000, sessionId, rand() < 0.8 ? 1 : 0.4, {
            energy: 0.3 + c * 0.15 + rand() * 0.1,
            valence: 0.3 + rand() * 0.3,
          }),
        );
      }
    }
  }
  listens.sort((a, b) => a.startedTs - b.startedTs);
  return { listens, sessions };
}

/** ~20k raw events / ~6k listens over 90 days — the perf corpus. */
export function ninetyDayLedger(): { listens: ListenRecord[]; sessions: SessionRecord[] } {
  const rand = seededRandom(7);
  const listens: ListenRecord[] = [];
  const sessions: SessionRecord[] = [];
  const start = Date.now() - 90 * 86400_000;
  const totalSessions = 180; // 2/day
  for (let s = 0; s < totalSessions; s++) {
    const sessionId = `s90-${s}`;
    const startTs = start + (s * 0.5 * 86400_000) + Math.floor(rand() * 4 * 3600_000);
    sessions.push({
      id: sessionId,
      startTs,
      daypart: 'evening',
      dayKind: s % 7 === 5 || s % 7 === 6 ? 'weekend' : 'weekday',
      trackCount: 34,
      totalListenMs: 34 * 190000,
    });
    const community = ARTIST_COMMUNITIES[s % 4];
    for (let i = 0; i < 34; i++) {
      const artist = community[Math.floor(rand() * community.length)];
      const ratio = rand() < 0.72 ? 1 : rand();
      listens.push(
        listenOf(trackIdFor(artist, Math.floor(rand() * 10)), artist, startTs + i * 210000, sessionId, ratio, {
          energy: 0.25 + rand() * 0.5,
          valence: 0.25 + rand() * 0.5,
        }),
      );
    }
  }
  listens.sort((a, b) => a.startedTs - b.startedTs);
  return { listens, sessions };
}

/** The 20-prompt blind-test corpus (Appendix D5, fixed). */
export const PROMPT_CORPUS: Array<{ prompt: string; mustNotInclude?: string[]; mustIncludeArtists?: string[] }> = [
  { prompt: 'sad but hopeful 90s Hindi for a long drive, no remixes', mustNotInclude: ['remix'] },
  { prompt: 'Punjabi gym bangers', mustIncludeArtists: ['diljit dosanjh', 'ap dhillon', 'guru randhawa', 'karan aujla', 'sidhu moose wala'] },
  { prompt: 'chill gaane for late night drive' },
  { prompt: 'Arijit Singh heartbreak hits', mustIncludeArtists: ['arijit singh'] },
  { prompt: '90s Bollywood romantic classics' },
  { prompt: 'Eminem angry motivation', mustIncludeArtists: ['eminem'] },
  { prompt: 'wedding dance party hindi' },
  { prompt: 'A R Rahman soulful classics' },
  { prompt: 'lofi beats for padhai' },
  { prompt: 'sufi calm meditation' },
  { prompt: 'English songs like Blinding Lights' },
  { prompt: 'happy punjabi morning playlist' },
  { prompt: 'devotional morning mantras' },
  { prompt: 'The Weeknd late night drive' },
  { prompt: 'old Kishore Kumar golden era', mustIncludeArtists: ['kishore kumar'] },
  { prompt: 'workout mix without sad songs', mustNotInclude: ['sad'] },
  { prompt: 'romantic dinner date hindi' },
  { prompt: 'focus coding instrumental' },
  { prompt: 'bina remix party hindi', mustNotInclude: ['remix'] },
  { prompt: 'sad songs for rainy day' },
];

/** Safety dodge corpus (Appendix D6): blocked term × 12 dodge patterns. */
export function dodgeCorpus(term: string): string[] {
  const leet = (s: string, map: Record<string, string>) => s.split('').map((ch) => map[ch] ?? ch).join('');
  return [
    term,
    term.replace(/[aeiou]/g, (_m, i) => 'aeiou'.charAt((i || 0) % 5)), // vowel rotate
    leet(term, { a: '4', e: '3', i: '1', o: '0' }),
    leet(term, { a: '@', i: '!' }),
    term.split('').join('.'),
    term.split('').join('_'),
    term.split('').join('-'),
    `${term}!!`,
    `!!${term}`,
    `${term} song`,
    `song ${term}`,
    term.toUpperCase(),
  ];
}
