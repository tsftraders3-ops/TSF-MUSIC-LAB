/**
 * SEARCH V2 · S0 plan tests — classifier corpus, normalizer, windows.
 *
 * Bars: S3 (typo tolerance feeds from corrections), S1 (lyric windows),
 * S2 (artist+title disambiguation classification), Hinglish reality.
 */

import { describe, expect, test, beforeAll } from 'bun:test';
import { planSearch, registerArtistLexicon, registerVibeVocab, correctedQuery } from '../../src/search/plan';
import { buildLexicon } from '../../src/search/lexicon';
import { normalizeQuery, clusterKey, normalizeTokens } from '../../src/search/normalize';
import { ARTIST_PRIORS, MOOD_PRIORS, GENRE_PRIORS } from '../../src/ai/core/priors';

beforeAll(() => {
  const artists = Object.keys(ARTIST_PRIORS);
  registerArtistLexicon(artists);
  const vibe = new Set<string>();
  for (const m of MOOD_PRIORS) {
    vibe.add(m.key);
    (m.words ?? []).forEach((w: string) => vibe.add(w));
  }
  Object.keys(GENRE_PRIORS).forEach((g) => vibe.add(g));
  registerVibeVocab(Array.from(vibe));
  buildLexicon([artists, Array.from(vibe), ['kun faya kun', 'tum hi ho bandhu']], [
    'arijit singh tum hi ho',
    'hum tere bin ab reh nahi sakte',
  ]);
});

describe('S0 normalize', () => {
  test('NFC + lowercase + punctuation strip + ws collapse', () => {
    expect(normalizeQuery('  Tum   Hi--Ho!  ')).toBe('tum hi-ho');
    expect(normalizeQuery('Kun Faya Kun…')).toBe('kun faya kun');
    expect(normalizeQuery('Apna Bana Le (From "Bhediya")')).toBe('apna bana le from bhediya');
  });

  test('Hinglish variance folds are bounded and stable', () => {
    expect(normalizeTokens('kyun nahi')).toEqual(['kyu', 'nahi']);
    expect(normalizeTokens('gaane')).toEqual(['gaana']);
    expect(normalizeTokens('pyar')).toEqual(['pyaar']);
  });

  test('cluster keys merge dupes but NEVER distinct songs', () => {
    // the three live-probe duplicates share a key
    const a = clusterKey('Tum Hi Ho');
    const b = clusterKey('Tum Hi Ho (From "Aashiqui 2")');
    expect(a).toBe(b);
    // the different song survives (S5 bar)
    expect(clusterKey('Tum Hi Ho Bandhu')).not.toBe(a);
    // covers stay separate clusters by artist surname (verified later)
    expect(clusterKey('Tum Hi Ho - Cover')).toBe(a);
  });
});

describe('S0 classifier (ordered rules)', () => {
  test('entity_title: plain title', () => {
    expect(planSearch('tum hi ho').kind).toBe('entity_title');
  });

  test('entity_artist: all tokens match a known artist', () => {
    expect(planSearch('arijit singh').kind).toBe('entity_artist');
  });

  test('artist_title: artist + title tokens (S2 bar query)', () => {
    const p = planSearch('apna bana le arijit singh');
    expect(p.kind).toBe('artist_title');
    expect(p.artistTokens.join(' ')).toContain('arijit singh');
    expect(p.titleTokens.join(' ')).toContain('apna');
  });

  test('lyric_fragment: ≥6 tokens (S1 bar query)', () => {
    const p = planSearch('hum tere bin ab reh nahi sakte');
    expect(p.kind).toBe('lyric_fragment');
    expect(p.windows.length).toBeGreaterThanOrEqual(1);
    expect(p.windows.length).toBeLessThanOrEqual(2);
  });

  test('lyric_fragment: quoted phrase', () => {
    expect(planSearch('"meri aashiqui ab tum hi ho"').kind).toBe('lyric_fragment');
  });

  test('vibe: mood words dominate short queries', () => {
    expect(planSearch('sad songs').kind).toBe('vibe');
    expect(planSearch('chill punjabi').kind).toBe('vibe');
  });

  test('browse: empty/1-char', () => {
    expect(planSearch('').kind).toBe('browse');
    expect(planSearch('a').kind).toBe('browse');
  });

  test('Hinglish + Devanagari pass through cleanly', () => {
    const p = planSearch('तुम ही हो');
    expect(p.kind).toBe('entity_title');
    expect(p.tokens.length).toBe(3);
  });
});

describe('S0 windows (idf-distinctive n-grams)', () => {
  test('mid-phrase window selected — verified live: "tere bin ab reh" surfaces the song', () => {
    const p = planSearch('hum tere bin ab reh nahi sakte');
    const joined = p.windows.join(' | ').toLowerCase();
    expect(joined).toContain('bin');
  });
});

describe('S0 SymSpell corrections (S3 bar)', () => {
  test('arjit → arijit (romanized Hindi, language-independent)', () => {
    const p = planSearch('arjit sing');
    const fix = p.corrections.find((c) => c.from === 'arjit');
    expect(fix?.to).toBe('arijit');
  });

  test('fya → faya inside kun fya kun', () => {
    const p = planSearch('kun fya kun');
    expect(p.corrections.some((c) => c.to === 'faya')).toBe(true);
  });

  test('corrected query surfaces as Did-you-mean, never auto-applied', () => {
    const p = planSearch('arjit sing tum hi ho');
    const cq = correctedQuery(p);
    expect(cq).toBeTruthy();
    expect(cq!).toContain('arijit');
    // plan keeps the user's raw string as the primary probe
    expect(p.raw).toBe('arjit sing tum hi ho');
  });
});
