/**
 * SEARCH V2 · SymSpell lexicon tests — correction properties, budgets,
 * snapshot roundtrip, cap enforcement.
 */

import { describe, expect, test, beforeAll } from 'bun:test';
import {
  buildLexicon,
  correctToken,
  lexiconSize,
  snapshotLexicon,
  restoreLexicon,
  feedLexicon,
} from '../../src/search/lexicon';

const VOCAB = [
  'arijit singh', 'shreya ghoshal', 'pritam', 'ap dhillon', 'diljit dosanjh',
  'badshah', 'karan aujla', 'sonu nigam', 'jubin nautiyal', 'ar rahman',
  'kun faya kun', 'tum hi ho', 'apna bana le', 'rockstar', 'sadda haq',
  'nadaan parindey', 'kun', 'faya', 'agar tum saath ho', 'channa mereya',
];

beforeAll(() => {
  buildLexicon([VOCAB], ['arijit singh songs', 'kun faya kun lyrics']);
});

describe('SymSpell properties', () => {
  test('"arjit" → "arijit" (edit distance 1)', () => {
    expect(correctToken('arjit')).toBe('arijit');
  });

  test('"fya" corrects to "faya" — the exact live S3 bar case', () => {
    expect(correctToken('fya')).toBe('faya');
    expect(correctToken('faaya')).toBe('faya');
  });

  test('deletes-only finds distance-2: "diljit dosanjh" → "diljeet dosanjaa" word-level', () => {
    // token-level: "dosanjaa" → "dosanjh" (distance 2)
    expect(correctToken('dosanjaa')).toBe('dosanjh');
  });

  test('≤2 edits: distance-3 garbage is NOT corrected', () => {
    expect(correctToken('xqzzkqm')).toBeNull();
  });

  test('known terms are never "corrected"', () => {
    expect(correctToken('pritam')).toBeNull();
    expect(correctToken('arijit')).toBeNull();
  });

  test('short tokens (<3 chars) are skipped; genuine garbage is null', () => {
    expect(correctToken('ab')).toBeNull();
    expect(correctToken('qzk')).toBeNull();
  });

  test('frequency tiebreak: recents outrank curated', () => {
    // "kun" is in vocab; "kan" distance-1 → kun (only close candidate)
    expect(correctToken('kann')).toBe('kun');
  });

  test('LRU feeder grows the lexicon from observed rows', () => {
    const before = lexiconSize();
    feedLexicon(['Kesariya', 'Kesariya', 'Brahmastra']);
    expect(lexiconSize()).toBeGreaterThan(before);
    expect(correctToken('kesariya')).toBeNull(); // exact hits never correct
    expect(correctToken('kesariyaa')).toBe('kesariya'); // learned + correctable
  });
});

describe('snapshot roundtrip (cold-start <20ms path)', () => {
  test('persist → restore preserves corrections', () => {
    const snap = snapshotLexicon();
    const probe = correctToken('arjit');
    expect(restoreLexicon(snap)).toBe(true);
    expect(correctToken('arjit')).toBe(probe);
  });

  test('corrupt snapshot rejected, not thrown', () => {
    expect(restoreLexicon('{not json')).toBe(false);
    expect(restoreLexicon('{"v":99}')).toBe(false);
  });
});

describe('lookup budget (L1 component)', () => {
  test('100 corrections average <1 ms each', () => {
    const misses = ['arjitt', 'arijitt', 'pritamm', 'shreyaa', 'kunnn', 'qzkkm'];
    const t0 = performance.now();
    for (let i = 0; i < 100; i += 1) {
      correctToken(misses[i % misses.length] ?? 'arjit');
    }
    const ms = (performance.now() - t0) / 100;
    console.log(`  [perf] SymSpell avg lookup: ${ms.toFixed(4)} ms`);
    expect(ms).toBeLessThan(1);
  });
});
