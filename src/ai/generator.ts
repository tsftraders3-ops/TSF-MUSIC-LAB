/**
 * TSF AI Playlist Generator — natural language in, curated playlist out.
 *
 * Fully on-device intent engine (no LLM API — the app is standalone by
 * contract). Pipeline:
 *
 *   prompt → intent extraction (artists / moods / genres / era / language)
 *          → parallel JioSaavn queries (artist seeds + mood·genre combos)
 *          → scoring (artist match, mood-word resonance, popularity rank)
 *          → diversity caps + safety filter
 *          → named, described playlist
 *
 * The staged progress callbacks let the UI narrate the "thinking" like a
 * real assistant: Understanding → Searching → Scoring → Ordering.
 */

import type { Track } from '../types';
import { searchSaavnClean } from '../api/saavn';
import { filterClean } from '../safety';

export interface GenerationStage {
  phase: 'understanding' | 'searching' | 'scoring' | 'done';
  detail: string;
}

export interface GeneratedPlaylist {
  name: string;
  description: string;
  tracks: Track[];
  detected: {
    artists: string[];
    mood?: string;
    genre?: string;
    era?: string;
  };
}

interface Mood {
  key: string;
  label: string;
  words: string[];
  query: string;
}

const MOODS: Mood[] = [
  { key: 'happy', label: 'happy', words: ['happy', 'joy', 'feel good', 'upbeat', 'cheerful', 'smile'], query: 'happy hits' },
  { key: 'sad', label: 'sad', words: ['sad', 'heartbreak', 'broken', 'alone', 'lonely', 'cry', 'emotional', 'miss'], query: 'sad songs' },
  { key: 'romantic', label: 'romantic', words: ['romantic', 'love', 'pyar', 'ishq', 'mohabbat', 'date', 'valentine'], query: 'romantic love songs' },
  { key: 'party', label: 'party', words: ['party', 'bash', 'dance', 'club', 'celebration', 'banger', 'wedding'], query: 'party dance hits' },
  { key: 'workout', label: 'workout', words: ['gym', 'workout', 'pump', 'training', 'running', 'exercise', 'hustle', 'motivation', 'beast'], query: 'workout gym motivation' },
  { key: 'chill', label: 'chill', words: ['chill', 'relax', 'calm', 'peaceful', 'soothe', 'unwind', 'mellow'], query: 'chill relaxed songs' },
  { key: 'study', label: 'focus', words: ['study', 'focus', 'concentration', 'work', 'deep', 'coding', 'reading'], query: 'lofi study focus' },
  { key: 'sleep', label: 'sleep', words: ['sleep', 'night', 'insomnia', 'lullaby', 'dream', 'midnight'], query: 'sleep night songs' },
  { key: 'angry', label: 'angry', words: ['angry', 'rage', 'aggressive', 'mad', 'revenge', 'attitude', 'savage'], query: 'attitude angry songs' },
  { key: 'devotional', label: 'devotional', words: ['bhajan', 'devotional', 'god', 'krishna', 'shiv', 'mantra', 'aarti', 'spiritual'], query: 'devotional bhajan' },
];

interface Genre {
  key: string;
  label: string;
  words: string[];
  query: string;
}

const GENRES: Genre[] = [
  { key: 'bollywood', label: 'Bollywood', words: ['bollywood', 'hindi film', 'movie', 'filmy'], query: 'bollywood hits' },
  { key: 'punjabi', label: 'Punjabi', words: ['punjabi', 'desi', 'bhangra'], query: 'punjabi hits' },
  { key: 'pop', label: 'Pop', words: ['pop'], query: 'pop hits' },
  { key: 'rap', label: 'Hip-Hop', words: ['rap', 'hip hop', 'hiphop', 'trap', 'bars'], query: 'rap hip hop' },
  { key: 'lofi', label: 'Lo-Fi', words: ['lofi', 'lo-fi', 'chillhop'], query: 'lofi songs' },
  { key: 'edm', label: 'EDM', words: ['edm', 'electronic', 'club', 'techno', 'house'], query: 'edm electronic' },
  { key: 'rock', label: 'Rock', words: ['rock', 'metal', 'guitar'], query: 'rock hits' },
  { key: 'sufi', label: 'Sufi', words: ['sufi', 'qawwali'], query: 'sufi songs' },
  { key: 'ghazal', label: 'Ghazal', words: ['ghazal'], query: 'ghazal' },
  { key: 'classical', label: 'Classical', words: ['classical', 'raga', 'instrumental', 'tabla', 'sitar'], query: 'indian classical instrumental' },
  { key: 'retro', label: 'Retro', words: ['retro', 'old', 'classic', 'golden', 'kishore', 'rafi', 'lata'], query: 'old classic hindi songs' },
  { key: 'indie', label: 'Indie', words: ['indie', 'alternative'], query: 'indie songs' },
  { key: 'kpop', label: 'K-Pop', words: ['kpop', 'k-pop', 'bts', 'blackpink'], query: 'kpop hits' },
  { key: 'english', label: 'English', words: ['english', 'hollywood', 'western'], query: 'english hits' },
];

const ERAS = [
  { key: '90s', words: ['90s', "90's", 'nineties'], query: '90s hits' },
  { key: '80s', words: ['80s', "80's", 'eighties'], query: '80s hits' },
  { key: '2000s', words: ['2000s', 'early 2000'], query: '2000s hits' },
  { key: 'latest', words: ['latest', 'new', '2024', '2025', 'trending', 'fresh'], query: 'latest new songs' },
];

const KNOWN_ARTISTS = [
  'arijit singh', 'shreya ghoshal', 'sonu nigam', 'kishore kumar', 'mohammed rafi', 'lata mangeshkar',
  'kishor', 'atif aslam', 'rahat fateh ali khan', 'nusrat fateh ali khan', 'shankar mahadevan',
  'ar rahman', 'a r rahman', 'pritam', 'vishal-shekhar', 'mithoon', 'ankit tiwari', 'jubin nautiyal',
  'neha kakkar', 'badshah', 'honey singh', 'diljit dosanjh', 'sidhu moose wala', 'ap dhillon',
  'guru randhawa', 'b praak', 'jasmine sandlas', 'ammy virk', 'shubh', 'karan aujla',
  'the weeknd', 'taylor swift', 'ed sheeran', 'eminem', 'drake', 'beyonce', 'rihanna', 'coldplay',
  'imagine dragons', 'billie eilish', 'dua lipa', 'bruno mars', 'justin bieber', 'ariana grande',
  'travis scott', 'post malone', 'kanye', 'sia', 'adele', 'sam smith', 'shawn mendes', 'charlie puth',
  'linkin park', 'maroon 5', 'one direction', 'bts', 'blackpink',
  'kk', 'mohit chauhan', 'papon', 'benny dayal', 'vishal dadlani', 'sukhwinder singh',
  'udit narayan', 'kumar sanu', 'alka yagnik', 'asha bhosle', 'mukesh', 'kishori',
];

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

/** Pull structured intent out of the raw prompt. */
export function parsePrompt(prompt: string) {
  const lower = prompt.toLowerCase();
  const artists: string[] = [];

  // Quoted names are always artists.
  const quoted = prompt.match(/["“']([^"”']{2,40})["”']/g) ?? [];
  quoted.forEach((q) => {
    const name = q.replace(/["“']/g, '').trim();
    if (name) artists.push(name);
  });

  // Known artists mentioned verbatim.
  for (const a of KNOWN_ARTISTS) {
    if (lower.includes(a) && !artists.some((x) => x.toLowerCase() === a)) {
      artists.push(a);
    }
  }

  // Bare capitalized sequences (2+ words) that aren't keywords.
  const caps = prompt.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b/g) ?? [];
  const keywordish = new Set(
    [...MOODS.flatMap((m) => m.words), ...GENRES.flatMap((g) => g.words), ...ERAS.flatMap((e) => e.words)].map((w) =>
      w.toLowerCase(),
    ),
  );
  caps.forEach((c) => {
    const cl = c.toLowerCase();
    if (!keywordish.has(cl) && !artists.some((a) => a.toLowerCase() === cl)) {
      artists.push(c);
    }
  });

  const mood = MOODS.find((m) => m.words.some((w) => lower.includes(w)));
  const genre = GENRES.find((g) => g.words.some((w) => lower.includes(w)));
  const era = ERAS.find((e) => e.words.some((w) => lower.includes(w)));

  return {
    artists: artists.slice(0, 3),
    mood,
    genre,
    era,
  };
}

/** Build the set of search queries implied by the prompt. */
function buildQueries(detected: ReturnType<typeof parsePrompt>): string[] {
  const queries: string[] = [];
  detected.artists.forEach((a) => queries.push(a));

  const facets: string[] = [];
  if (detected.era) facets.push(detected.era.query);
  if (detected.mood) facets.push(detected.mood.query);
  if (detected.genre) facets.push(detected.genre.query);

  if (facets.length) {
    // Prefer the combination, then the strongest single facet.
    queries.push(facets.slice(0, 3).join(' '));
    facets.slice(0, 2).forEach((f) => queries.push(f));
  } else {
    queries.push('top hits');
  }
  return [...new Set(queries)].slice(0, 6);
}

function scoreTrack(
  track: Track,
  index: number,
  detected: ReturnType<typeof parsePrompt>,
  queryCount: number,
): number {
  let score = 0;
  // Popularity rank: earlier search hits score higher.
  score += Math.max(0, 24 - index * 0.4);
  // Artist seed match is the strongest signal.
  if (detected.artists.some((a) => track.artist.toLowerCase().includes(a.toLowerCase()))) {
    score += 14;
  }
  // Mood resonance — does the title echo the requested vibe?
  const tLower = `${track.title} ${track.album ?? ''}`.toLowerCase();
  const resonanceWords = detected.mood
    ? [...detected.mood.words, ...detected.mood.label.split(' ')]
    : [];
  if (resonanceWords.some((w) => tLower.includes(w))) score += 6;
  const genreWords = detected.genre ? detected.genre.words : [];
  if (genreWords.some((w) => tLower.includes(w))) score += 3;
  // Full-length streams beat previews.
  if (!track.previewOnly) score += 4;
  // Query-count normalization — queries early in the list are more relevant.
  score += queryCount * 0.5;
  return score;
}

export async function generatePlaylist(
  prompt: string,
  onStage?: (stage: GenerationStage) => void,
): Promise<GeneratedPlaylist> {
  const cleanPrompt = prompt.trim();
  onStage?.({ phase: 'understanding', detail: 'Reading your vibe…' });

  const detected = parsePrompt(cleanPrompt);
  const queries = buildQueries(detected);

  onStage?.({
    phase: 'searching',
    detail: detected.artists.length
      ? `Digging through ${detected.artists.slice(0, 2).join(', ')}…`
      : 'Searching the catalog…',
  });

  // Parallel search — each query contributes up to 12 candidates.
  const searchResults = await Promise.all(
    queries.map((q, i) =>
      searchSaavnClean(q, 14)
        .then((tracks) => ({ q, i, tracks }))
        .catch(() => ({ q, i, tracks: [] as Track[] })),
    ),
  );

  onStage?.({ phase: 'scoring', detail: `Scoring ${searchResults.reduce((s, r) => s + r.tracks.length, 0)} candidates…` });

  // Merge, dedupe, score.
  const byId = new Map<string, { track: Track; score: number }>();
  for (const { q, i, tracks } of searchResults) {
    tracks.forEach((track, idx) => {
      if (track.previewOnly && detected.artists.length === 0) return; // previews only when no saavn results
      const score = scoreTrack(track, idx, detected, queries.length - i) + (q === detected.artists[0] ? 4 : 0);
      const existing = byId.get(track.id);
      if (!existing || existing.score < score) {
        byId.set(track.id, { track, score });
      }
    });
  }

  // Rank, apply per-artist diversity cap, cap the final list.
  const ranked = [...byId.values()].sort((a, b) => b.score - a.score);
  const perArtist = new Map<string, number>();
  const picked: Track[] = [];
  for (const { track } of ranked) {
    const used = perArtist.get(track.artist) ?? 0;
    if (used >= 4) continue;
    perArtist.set(track.artist, used + 1);
    picked.push(track);
    if (picked.length >= 25) break;
  }
  const finalTracks = filterClean(picked);

  // Name the mix like a human curator would.
  const bits: string[] = [];
  if (detected.mood) bits.push(detected.mood.label);
  if (detected.genre) bits.push(detected.genre.label);
  if (detected.era) bits.push(detected.era.key);
  const vibeName = bits.length ? `${titleCase(bits.join(' '))} Mix` : 'TSF Mix';
  const name = finalTracks.length
    ? detected.artists.length
      ? `${detected.artists[0]} Radio+`
      : vibeName
    : 'Empty Mix';

  onStage?.({ phase: 'done', detail: `${finalTracks.length} songs ready` });

  return {
    name,
    description: `TSF AI · "${cleanPrompt}" · ${finalTracks.length} songs`,
    tracks: finalTracks,
    detected: {
      artists: detected.artists,
      mood: detected.mood?.label,
      genre: detected.genre?.label,
      era: detected.era?.key,
    },
  };
}

/** Suggested prompts shown as chips on the AI screen. */
export const PROMPT_IDEAS = [
  'Arijit Singh heartbreak hits',
  'Punjabi gym bangers',
  'Lo-fi beats for late night study',
  '90s Bollywood romantic classics',
  'Eminem angry motivation',
  'Wedding dance party',
  'A R Rahman soulful classics',
  'Rainy day sad Hindi songs',
  'The Weeknd late night drive',
  'Devotional morning mantras',
];
