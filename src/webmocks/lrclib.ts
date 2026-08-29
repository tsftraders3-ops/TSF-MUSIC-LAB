/**
 * WEB MOCK of src/api/lrclib.ts — fixture lyrics for the device lab's
 * lyric-verification checkpoints (S1/S2 bars). Metro redirects this
 * only for platform=web.
 */

const FIXTURE_LYRICS: Record<string, string> = {
  'tum hi ho|mithoon':
    'Hum tere bin ab reh nahi sakte\nTere bina kya wajood mera\nTujhse juda gar ho jaayenge\nToh khud se hi ho jaayenge judaa\nChahun tujhe sanam meri jaan\nFida karu main tera aitam\nKabhi sochu tujhe jab yaad\nMain paaun sukoon sa javidaan',
  'tum hi ho|arijit singh':
    'Hum tere bin ab reh nahi sakte\nTere bina kya wajood mera\nTujhse juda gar ho jaayenge\nToh khud se hi ho jaayenge judaa',
  'apna bana le|arijit singh':
    'Tere bina jiya jaaye na\nApna bana le\nMujhe apna bana le\nHaan tujhe main chunun\nYa tu mujhe chune',
};

export function fetchPlainLyrics(
  title: string,
  artist: string,
  _signal?: AbortSignal,
): Promise<string | null> {
  const t = title.toLowerCase().trim();
  const a = artist.toLowerCase().trim();
  const direct = FIXTURE_LYRICS[`${t}|${a}`];
  if (direct) {
    return new Promise((resolve) => setTimeout(() => resolve(direct), 150));
  }
  // partial-key fallback (any artist match on the title)
  for (const key of Object.keys(FIXTURE_LYRICS)) {
    const [kt] = key.split('|');
    if (kt === t) {
      const lyrics = FIXTURE_LYRICS[key];
      return new Promise((resolve) => setTimeout(() => resolve(lyrics), 150));
    }
  }
  return Promise.resolve(null);
}

export interface LyricOrigin {
  title: string;
  artist: string;
  line: string;
}

const FRAGMENTS: Array<{ match: RegExp; origin: LyricOrigin }> = [
  {
    match: /tere bin.*(reh|rah).*nahi|hum tere bin/,
    origin: {
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh',
      line: 'Hum tere bin ab reh nahi sakte',
    },
  },
];

/** Webmock of the S1 fragment resolver — deterministic for the lab. */
export function searchLyricByFragment(
  fragment: string,
  _signal?: AbortSignal,
): Promise<LyricOrigin | null> {
  const f = fragment.toLowerCase();
  for (const { match, origin } of FRAGMENTS) {
    if (match.test(f)) {
      return new Promise((resolve) => setTimeout(() => resolve(origin), 150));
    }
  }
  return Promise.resolve(null);
}
