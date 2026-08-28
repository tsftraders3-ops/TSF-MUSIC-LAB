/**
 * Cultural priors pack (§6.4) — the "LLM priors" tier, precomputed.
 *
 * The plan's web port would ask an LLM "how energetic is Arijit Singh?";
 * the RN build ships the answer. Values are 0..1 centers on Russell's
 * circumplex (arousal=energy, valence=positivity), curated for the
 * India-market catalog spine (film + Punjabi + indie + global).
 *
 * Everything unknown falls back to genre priors, then metadata heuristics,
 * then behavioral calibration (features.ts blends the three).
 */

import type { TempoClass } from './types';

export interface ArtistPrior {
  energy: number;
  valence: number;
  tempo: TempoClass;
}

export const ARTIST_PRIORS: Record<string, ArtistPrior> = {
  // ── Hindi film playback — the catalog spine ──────────────────────────
  'arijit singh': { energy: 0.35, valence: 0.35, tempo: 'slow' },
  'shreya ghoshal': { energy: 0.4, valence: 0.5, tempo: 'slow' },
  'sonu nigam': { energy: 0.45, valence: 0.5, tempo: 'mid' },
  'kishore kumar': { energy: 0.55, valence: 0.6, tempo: 'mid' },
  'mohammed rafi': { energy: 0.55, valence: 0.65, tempo: 'mid' },
  'lata mangeshkar': { energy: 0.35, valence: 0.5, tempo: 'slow' },
  'asha bhosle': { energy: 0.55, valence: 0.6, tempo: 'mid' },
  'kumar sanu': { energy: 0.4, valence: 0.45, tempo: 'slow' },
  'udit narayan': { energy: 0.5, valence: 0.55, tempo: 'mid' },
  'alka yagnik': { energy: 0.45, valence: 0.5, tempo: 'mid' },
  'udit narain': { energy: 0.5, valence: 0.55, tempo: 'mid' },
  'atif aslam': { energy: 0.4, valence: 0.4, tempo: 'slow' },
  'rahat fateh ali khan': { energy: 0.45, valence: 0.4, tempo: 'mid' },
  'nusrat fateh ali khan': { energy: 0.55, valence: 0.5, tempo: 'mid' },
  'shankar mahadevan': { energy: 0.6, valence: 0.6, tempo: 'mid' },
  'ar rahman': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'a r rahman': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'pritam': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'vishal-shekhar': { energy: 0.6, valence: 0.6, tempo: 'fast' },
  'mithoon': { energy: 0.3, valence: 0.3, tempo: 'slow' },
  'ankit tiwari': { energy: 0.35, valence: 0.35, tempo: 'slow' },
  'jubin nautiyal': { energy: 0.35, valence: 0.4, tempo: 'slow' },
  'papon': { energy: 0.4, valence: 0.45, tempo: 'slow' },
  'benny dayal': { energy: 0.65, valence: 0.65, tempo: 'fast' },
  'vishal dadlani': { energy: 0.7, valence: 0.55, tempo: 'fast' },
  'sukhwinder singh': { energy: 0.7, valence: 0.6, tempo: 'fast' },
  'mohit chauhan': { energy: 0.45, valence: 0.5, tempo: 'mid' },
  'kk': { energy: 0.55, valence: 0.5, tempo: 'mid' },
  'neeti mohan': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'shalmali kholgade': { energy: 0.6, valence: 0.6, tempo: 'fast' },
  'kanika kapoor': { energy: 0.65, valence: 0.6, tempo: 'fast' },
  'neha kakkar': { energy: 0.65, valence: 0.55, tempo: 'fast' },
  'tony kakkar': { energy: 0.6, valence: 0.55, tempo: 'fast' },
  'dhvani bhanushali': { energy: 0.55, valence: 0.6, tempo: 'mid' },
  'darshan raval': { energy: 0.45, valence: 0.5, tempo: 'mid' },
  'armaan malik': { energy: 0.5, valence: 0.55, tempo: 'mid' },
  'amit trivedi': { energy: 0.55, valence: 0.5, tempo: 'mid' },
  'sachet-parampara': { energy: 0.45, valence: 0.4, tempo: 'mid' },
  'sachet parampara': { energy: 0.45, valence: 0.4, tempo: 'mid' },
  'b praak': { energy: 0.4, valence: 0.35, tempo: 'slow' },
  'jasleen royal': { energy: 0.4, valence: 0.45, tempo: 'mid' },
  'anuv jain': { energy: 0.3, valence: 0.4, tempo: 'slow' },
  'prateek kuhad': { energy: 0.25, valence: 0.45, tempo: 'slow' },
  'the local train': { energy: 0.55, valence: 0.5, tempo: 'mid' },
  'lucky ali': { energy: 0.35, valence: 0.5, tempo: 'slow' },

  // ── Punjabi ───────────────────────────────────────────────────────────
  'diljit dosanjh': { energy: 0.7, valence: 0.7, tempo: 'fast' },
  'sidhu moose wala': { energy: 0.7, valence: 0.45, tempo: 'fast' },
  'ap dhillon': { energy: 0.65, valence: 0.5, tempo: 'mid' },
  'guru randhawa': { energy: 0.7, valence: 0.65, tempo: 'fast' },
  'ammy virk': { energy: 0.65, valence: 0.65, tempo: 'fast' },
  'jasmine sandlas': { energy: 0.6, valence: 0.5, tempo: 'fast' },
  'karan aujla': { energy: 0.7, valence: 0.5, tempo: 'fast' },
  'shubh': { energy: 0.55, valence: 0.45, tempo: 'mid' },
  'honey singh': { energy: 0.75, valence: 0.55, tempo: 'fast' },
  'badshah': { energy: 0.75, valence: 0.6, tempo: 'fast' },
  'raftaar': { energy: 0.75, valence: 0.5, tempo: 'fast' },
  'kaka': { energy: 0.45, valence: 0.4, tempo: 'slow' },
  'nishu bhavnas': { energy: 0.5, valence: 0.45, tempo: 'mid' },

  // ── Global pop / hip-hop / rock ───────────────────────────────────────
  'the weeknd': { energy: 0.55, valence: 0.4, tempo: 'mid' },
  'taylor swift': { energy: 0.55, valence: 0.6, tempo: 'mid' },
  'ed sheeran': { energy: 0.4, valence: 0.55, tempo: 'slow' },
  'eminem': { energy: 0.8, valence: 0.4, tempo: 'fast' },
  'drake': { energy: 0.55, valence: 0.5, tempo: 'mid' },
  'beyonce': { energy: 0.75, valence: 0.6, tempo: 'fast' },
  'rihanna': { energy: 0.65, valence: 0.55, tempo: 'fast' },
  'coldplay': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'imagine dragons': { energy: 0.75, valence: 0.5, tempo: 'fast' },
  'billie eilish': { energy: 0.35, valence: 0.35, tempo: 'slow' },
  'dua lipa': { energy: 0.7, valence: 0.6, tempo: 'fast' },
  'bruno mars': { energy: 0.7, valence: 0.7, tempo: 'fast' },
  'justin bieber': { energy: 0.6, valence: 0.55, tempo: 'mid' },
  'ariana grande': { energy: 0.6, valence: 0.55, tempo: 'mid' },
  'travis scott': { energy: 0.7, valence: 0.4, tempo: 'mid' },
  'post malone': { energy: 0.5, valence: 0.45, tempo: 'mid' },
  'sia': { energy: 0.6, valence: 0.5, tempo: 'mid' },
  'adele': { energy: 0.35, valence: 0.35, tempo: 'slow' },
  'sam smith': { energy: 0.4, valence: 0.4, tempo: 'slow' },
  'shawn mendes': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'charlie puth': { energy: 0.55, valence: 0.6, tempo: 'mid' },
  'linkin park': { energy: 0.8, valence: 0.4, tempo: 'fast' },
  'maroon 5': { energy: 0.6, valence: 0.6, tempo: 'mid' },
  'one direction': { energy: 0.6, valence: 0.65, tempo: 'mid' },
  'bts': { energy: 0.7, valence: 0.65, tempo: 'fast' },
  'blackpink': { energy: 0.75, valence: 0.6, tempo: 'fast' },
  'kanye west': { energy: 0.65, valence: 0.45, tempo: 'mid' },
  'sza': { energy: 0.4, valence: 0.4, tempo: 'slow' },
  'the neighbourhood': { energy: 0.45, valence: 0.35, tempo: 'mid' },
  'arctic monkeys': { energy: 0.6, valence: 0.45, tempo: 'mid' },

  // ── Sufi / classical / devotional ─────────────────────────────────────
  'kailash kher': { energy: 0.55, valence: 0.55, tempo: 'mid' },
  'rekha bhardwaj': { energy: 0.5, valence: 0.45, tempo: 'mid' },
  'kaushiki chakraborty': { energy: 0.4, valence: 0.5, tempo: 'slow' },
  'hariprasad chaurasia': { energy: 0.2, valence: 0.5, tempo: 'slow' },
  'zakir hussain': { energy: 0.4, valence: 0.55, tempo: 'mid' },
  'shiv kumar sharma': { energy: 0.2, valence: 0.5, tempo: 'slow' },
  'ravi shankar': { energy: 0.3, valence: 0.5, tempo: 'slow' },
  'ustad rashid khan': { energy: 0.3, valence: 0.45, tempo: 'slow' },

  // ── Indie / electronic / lo-fi ────────────────────────────────────────
  'nucleya': { energy: 0.8, valence: 0.6, tempo: 'fast' },
  'ritviz': { energy: 0.6, valence: 0.6, tempo: 'mid' },
  'kohra': { energy: 0.65, valence: 0.35, tempo: 'fast' },
  'sickflip': { energy: 0.7, valence: 0.5, tempo: 'fast' },
  'seedhe maut': { energy: 0.8, valence: 0.4, tempo: 'fast' },
  'divine': { energy: 0.8, valence: 0.5, tempo: 'fast' },
  'emiway bantai': { energy: 0.75, valence: 0.5, tempo: 'fast' },
  'king': { energy: 0.65, valence: 0.55, tempo: 'mid' },
  'talha anjum': { energy: 0.6, valence: 0.4, tempo: 'mid' },
  'talhah yunus': { energy: 0.6, valence: 0.4, tempo: 'mid' },
  'chill otters': { energy: 0.25, valence: 0.5, tempo: 'slow' },
  'oyehindi': { energy: 0.3, valence: 0.45, tempo: 'slow' },
};

/** Genre-keyword priors — the fallback tier below artist priors. */
export const GENRE_PRIORS: Record<string, ArtistPrior> = {
  bollywood: { energy: 0.55, valence: 0.55, tempo: 'mid' },
  punjabi: { energy: 0.7, valence: 0.65, tempo: 'fast' },
  pop: { energy: 0.6, valence: 0.6, tempo: 'mid' },
  rap: { energy: 0.75, valence: 0.45, tempo: 'fast' },
  'hip-hop': { energy: 0.75, valence: 0.45, tempo: 'fast' },
  lofi: { energy: 0.25, valence: 0.5, tempo: 'slow' },
  edm: { energy: 0.85, valence: 0.6, tempo: 'fast' },
  electronic: { energy: 0.8, valence: 0.55, tempo: 'fast' },
  rock: { energy: 0.75, valence: 0.5, tempo: 'fast' },
  metal: { energy: 0.9, valence: 0.3, tempo: 'fast' },
  sufi: { energy: 0.5, valence: 0.5, tempo: 'mid' },
  qawwali: { energy: 0.6, valence: 0.55, tempo: 'mid' },
  ghazal: { energy: 0.25, valence: 0.35, tempo: 'slow' },
  classical: { energy: 0.25, valence: 0.5, tempo: 'slow' },
  instrumental: { energy: 0.3, valence: 0.5, tempo: 'slow' },
  retro: { energy: 0.5, valence: 0.6, tempo: 'mid' },
  indie: { energy: 0.45, valence: 0.5, tempo: 'mid' },
  kpop: { energy: 0.75, valence: 0.65, tempo: 'fast' },
  devotional: { energy: 0.3, valence: 0.6, tempo: 'slow' },
  bhajan: { energy: 0.3, valence: 0.6, tempo: 'slow' },
  romantic: { energy: 0.4, valence: 0.6, tempo: 'slow' },
  sad: { energy: 0.3, valence: 0.25, tempo: 'slow' },
  party: { energy: 0.85, valence: 0.7, tempo: 'fast' },
  workout: { energy: 0.85, valence: 0.55, tempo: 'fast' },
  sleep: { energy: 0.12, valence: 0.4, tempo: 'slow' },
  focus: { energy: 0.35, valence: 0.45, tempo: 'slow' },
};

export interface MoodPrior {
  key: string;
  /** Russell circumplex center (§2.2, Appendix D4). */
  energy: number;
  valence: number;
  words: string[];
}

/** Mood taxonomy mapped to the proxy space (Appendix D4). */
export const MOOD_PRIORS: MoodPrior[] = [
  { key: 'happy', energy: 0.7, valence: 0.7, words: ['happy', 'joy', 'feel good', 'upbeat', 'cheerful', 'khush'] },
  { key: 'euphoric', energy: 0.9, valence: 0.8, words: ['euphoric', 'hype', 'turn up', 'lit', 'banger'] },
  { key: 'sad', energy: 0.3, valence: 0.2, words: ['sad', 'heartbreak', 'broken', 'alone', 'lonely', 'cry', 'dukh', 'dard'] },
  { key: 'melancholic', energy: 0.4, valence: 0.3, words: ['melancholy', 'bittersweet', 'nostalgic', 'wistful'] },
  { key: 'romantic', energy: 0.45, valence: 0.75, words: ['romantic', 'love', 'pyar', 'ishq', 'mohabbat', 'date', 'valentine'] },
  { key: 'chill', energy: 0.3, valence: 0.55, words: ['chill', 'relax', 'calm', 'peaceful', 'soothe', 'unwind', 'mellow', 'sukoon'] },
  { key: 'party', energy: 0.85, valence: 0.7, words: ['party', 'bash', 'dance', 'club', 'celebration', 'shaadi', 'wedding'] },
  { key: 'workout', energy: 0.85, valence: 0.55, words: ['gym', 'workout', 'pump', 'training', 'running', 'exercise', 'hustle', 'beast'] },
  { key: 'focus', energy: 0.35, valence: 0.45, words: ['study', 'focus', 'concentration', 'work', 'deep', 'coding', 'reading'] },
  { key: 'sleep', energy: 0.12, valence: 0.4, words: ['sleep', 'insomnia', 'lullaby', 'sona', 'neend'] },
  { key: 'angry', energy: 0.8, valence: 0.2, words: ['angry', 'rage', 'aggressive', 'mad', 'revenge', 'attitude', 'savage', 'gussa'] },
  { key: 'devotional', energy: 0.3, valence: 0.65, words: ['bhajan', 'devotional', 'god', 'krishna', 'shiv', 'mantra', 'aarti', 'bhakti'] },
  { key: 'hopeful', energy: 0.5, valence: 0.65, words: ['hopeful', 'motivation', 'inspire', 'uplifting', 'umeed'] },
];

/**
 * Title/album metadata heuristics (§6.4 tier 2) — instant on-device
 * adjustments applied on top of priors.
 */
export const TITLE_RULES: Array<{ re: RegExp; dEnergy: number; dValence: number }> = [
  { re: /\b(remix|club mix|edm|bass boosted|dub|trap)\b/i, dEnergy: 0.18, dValence: 0.0 },
  { re: /\b(unplugged|acoustic|lofi|lo-fi|slowed)\b/i, dEnergy: -0.18, dValence: -0.02 },
  { re: /\b(sad|dukh|dard|bewafa|tanha|alone)\b/i, dEnergy: -0.05, dValence: -0.22 },
  { re: /\b(party|dance|nach|shaadi|wedding)\b/i, dEnergy: 0.15, dValence: 0.12 },
  { re: /\b(lullaby|sleep|sona|neend|instrumental)\b/i, dEnergy: -0.15, dValence: 0.0 },
  { re: /\b(hype|anthem|swag|attitude)\b/i, dEnergy: 0.12, dValence: -0.05 },
  { re: /\b(romantic|pyar|ishq|love)\b/i, dEnergy: -0.03, dValence: 0.15 },
];
