/**
 * Generates the blind A/B artifacts for the playlist critic:
 * outputs from the v1 generator and the v2 pipeline on the 20-prompt
 * corpus, with labels stripped (A/B randomized per prompt).
 */
import { generatePlaylist } from '../../src/ai/generator';
import { generatePlaylistV2 } from '../../src/ai/surfaces/playlist';
import { PROMPT_CORPUS } from './corpus';
import { writeFileSync } from 'fs';

const FIXTURE_ARTISTS = [
  'arijit singh', 'shreya ghoshal', 'pritam', 'jubin nautiyal',
  'diljit dosanjh', 'ap dhillon', 'guru randhawa', 'karan aujla',
  'eminem', 'linkin park', 'imagine dragons', 'drake',
  'nusrat fateh ali khan', 'kailash kher', 'the weeknd', 'kishore kumar',
];

const FIXTURES = FIXTURE_ARTISTS.flatMap((a) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `fx-${a.replace(/\s+/g, '-')}-${i}`,
    title: `${a.split(' ')[0]} Track ${i}`,
    artist: a,
    album: `${a} Album`,
    artwork: '',
    duration: 200 + (i % 5) * 10,
    source: 'saavn' as const,
    previewOnly: false,
    language: ['the weeknd', 'eminem', 'linkin park', 'imagine dragons', 'drake'].includes(a) ? 'english' : 'hindi',
    year: a === 'kishore kumar' ? 1985 : 2024,
  })),
);

const catalog = {
  async search(q: string, limit = 20) {
    const lower = q.toLowerCase();
    const tokens = lower.split(/\s+/).filter((w) => w.length > 2);
    const scored = FIXTURES.map((t) => {
      const hay = `${t.artist} ${t.title} ${t.album} ${t.language ?? ''} ${t.year ?? ''}`.toLowerCase();
      let s = 0;
      for (const w of tokens) if (hay.includes(w)) s += 2;
      return { t, s };
    });
    const hits = scored.filter((x) => x.s > 0).sort((a, b) => b.s - a.s).map((x) => x.t);
    if (hits.length) {
      const byArtist = new Map<string, typeof FIXTURES>();
      for (const t of hits) {
        const arr = byArtist.get(t.artist) ?? [];
        arr.push(t);
        byArtist.set(t.artist, arr);
      }
      const out: typeof FIXTURES = [];
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

const rand = (() => {
  let s = 12345;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
})();

const lines: string[] = [];
const key: Array<{ prompt: string; winnerIsA: 'v1' | 'v2' }> = [];

let i = 0;
for (const item of PROMPT_CORPUS) {
  i += 1;
  const v1 = await generatePlaylist(item.prompt).catch(() => null);
  const v2 = await generatePlaylistV2(catalog, item.prompt).catch(() => null);
  const flip = rand() < 0.5;
  const entryA = flip ? v1 : v2;
  const entryB = flip ? v2 : v1;
  const fmt = (e: typeof v1, tag: string) => {
    if (!e) return `${tag}: (FAILED)`;
    const tracks = e.tracks.slice(0, 10).map((t) => `    ${t.artist} — ${t.title}`).join('\n');
    return `${tag} name: "${e.name}"\n  desc: ${e.description}\n  count: ${e.tracks.length}\n  first 10:\n${tracks}`;
  };
  lines.push(`=== PROMPT ${i}: "${item.prompt}" ===`);
  lines.push(fmt(entryA, 'A'));
  lines.push('');
  lines.push(fmt(entryB, 'B'));
  lines.push('');
  key.push({ prompt: item.prompt, winnerIsA: flip ? 'v1' : 'v2' });
}

writeFileSync('/home/z/my-project/scripts/ab-playlist-blind.txt', lines.join('\n'));
writeFileSync(
  '/home/z/my-project/scripts/ab-playlist-key.txt',
  key.map((k, idx) => `${idx + 1}. ${k.prompt} → A=${k.winnerIsA}`).join('\n'),
);
console.log('wrote ab-playlist-blind.txt + key');
