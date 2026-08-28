/**
 * Fair blind A/B: v1 and v2 both run against the SAME fixture catalog.
 * (Round 1 was invalid — v1 hit the live JioSaavn catalog while v2 got the
 * 16-artist fixture. Judges flagged the asymmetry; this fixes it.)
 */
import { parsePrompt, buildQueries } from '../../src/ai/generator';
import { filterClean } from '../../src/ai/../safety';
import { generatePlaylistV2 } from '../../src/ai/surfaces/playlist';
import { PROMPT_CORPUS } from './corpus';
import { writeFileSync } from 'fs';
import type { Track } from '../../src/types';

const ARTISTS = [
  'arijit singh', 'shreya ghoshal', 'pritam', 'jubin nautiyal',
  'diljit dosanjh', 'ap dhillon', 'guru randhawa', 'karan aujla',
  'badshah', 'honey singh', 'eminem', 'linkin park',
  'imagine dragons', 'drake', 'nusrat fateh ali khan', 'kailash kher',
  'the weeknd', 'kishore kumar', 'lata mangeshkar', 'b praak',
];
const FIXTURES: Track[] = ARTISTS.flatMap((a) =>
  Array.from({ length: 14 }, (_, i) => ({
    id: `fx-${a.replace(/\s+/g, '-')}-${i}`,
    title: `${a.split(' ')[0]} Track ${i}`,
    artist: a,
    album: `${a} Album`,
    artwork: '',
    duration: 200 + (i % 5) * 10,
    source: 'saavn' as const,
    previewOnly: false,
    language: ['the weeknd', 'eminem', 'linkin park', 'imagine dragons', 'drake', 'badshah', 'honey singh'].includes(a) ? 'english' : 'hindi',
    year: a === 'kishore kumar' || a === 'lata mangeshkar' ? 1985 : a === 'b praak' ? 2024 : undefined,
  })),
);

const FIX_CATALOG = {
  async search(q: string, limit = 20): Promise<Track[]> {
    const tokens = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    const scored = FIXTURES.map((t) => {
      const hay = `${t.artist} ${t.title} ${t.album} ${t.language ?? ''} ${t.year ?? ''}`.toLowerCase();
      let s = 0;
      for (const w of tokens) if (hay.includes(w)) s += 2;
      return { t, s };
    });
    const hits = scored.filter((x) => x.s > 0).sort((a, b) => b.s - a.s).map((x) => x.t);
    if (hits.length) {
      const byArtist = new Map<string, Track[]>();
      for (const t of hits) {
        const arr = byArtist.get(t.artist) ?? [];
        arr.push(t);
        byArtist.set(t.artist, arr);
      }
      const out: Track[] = [];
      let i = 0;
      while (out.length < limit) {
        let added = false;
        for (const [, arr] of byArtist) {
          if (arr[i]) {
            out.push(arr[i]!);
            added = true;
            if (out.length >= limit) break;
          }
        }
        if (!added) break;
        i += 1;
      }
      return out;
    }
    const start = Math.abs(q.length * 7) % FIXTURES.length;
    return [...FIXTURES.slice(start), ...FIXTURES.slice(0, start)].slice(0, limit);
  },
};

/** v1's pipeline (src/ai/generator.ts logic) with the catalog injected —
 *  identical scoring/caps/name logic, fair catalog. */
async function v1Generate(prompt: string): Promise<{ name: string; description: string; tracks: Track[] }> {
  const cleanPrompt = prompt.trim();
  const detected = parsePrompt(cleanPrompt);
  const queries = buildQueries(detected);
  const searchResults = await Promise.all(
    queries.map((q, i) => FIX_CATALOG.search(q, 14).then((tracks) => ({ q, i, tracks })).catch(() => ({ q, i, tracks: [] as Track[] }))),
  );
  const byId = new Map<string, { track: Track; score: number }>();
  for (const { i, tracks } of searchResults) {
    const q = queries[searchResults.findIndex((r) => r.i === i)] ?? '';
    tracks.forEach((track, idx) => {
      let score = Math.max(0, 24 - idx * 0.4);
      if (detected.artists.some((a) => track.artist.toLowerCase().includes(a.toLowerCase()))) score += 14;
      const tLower = `${track.title} ${track.album ?? ''}`.toLowerCase();
      const resonanceWords = detected.mood ? [...detected.mood.words, ...detected.mood.label.split(' ')] : [];
      if (resonanceWords.some((w) => tLower.includes(w))) score += 6;
      const genreWords = detected.genre ? detected.genre.words : [];
      if (genreWords.some((w) => tLower.includes(w))) score += 3;
      if (!track.previewOnly) score += 4;
      score += (queries.length - i) * 0.5;
      if (q === detected.artists[0]) score += 4;
      const existing = byId.get(track.id);
      if (!existing || existing.score < score) byId.set(track.id, { track, score });
    });
  }
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
  const bits: string[] = [];
  if (detected.mood) bits.push(detected.mood.label);
  if (detected.genre) bits.push(detected.genre.label);
  if (detected.era) bits.push(detected.era.key);
  const vibeName = bits.length ? `${bits.join(' ')} Mix` : 'TSF Mix';
  const name = finalTracks.length
    ? detected.artists.length
      ? `${detected.artists[0]} Radio+`
      : vibeName
    : 'Empty Mix';
  return { name, description: `TSF AI · "${cleanPrompt}" · ${finalTracks.length} songs`, tracks: finalTracks };
}

const rand = (() => {
  let s = 777;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
})();

const lines: string[] = [];
const key: string[] = [];
let i = 0;
for (const item of PROMPT_CORPUS) {
  i += 1;
  const v1 = await v1Generate(item.prompt).catch(() => null);
  const v2 = await generatePlaylistV2(FIX_CATALOG, item.prompt).catch(() => null);
  const flip = rand() < 0.5;
  const entryA = flip ? v1 : v2;
  const entryB = flip ? v2 : v1;
  const fmt = (e: typeof v1, tag: string) => {
    if (!e) return `${tag}: (FAILED)`;
    const tracks = e.tracks.slice(0, 10).map((t) => `    ${t.artist} — ${t.title}`).join('\n');
    return `${tag} name: "${e.name}"\n  count: ${e.tracks.length}\n  first 10:\n${tracks}`;
  };
  lines.push(`=== PROMPT ${i}: "${item.prompt}" ===`);
  lines.push(fmt(entryA, 'A'));
  lines.push('');
  lines.push(fmt(entryB, 'B'));
  lines.push('');
  key.push(`${i}. ${item.prompt} → A=${flip ? 'v1' : 'v2'}`);
}

writeFileSync('/home/z/my-project/scripts/ab2-blind.txt', lines.join('\n'));
writeFileSync('/home/z/my-project/scripts/ab2-key.txt', key.join('\n'));
console.log('fair A/B written');
