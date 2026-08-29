/**
 * Content safety — keeps explicit / abusive material off home surfaces.
 *
 * Two layers:
 *  1. Provider flag: JioSaavn marks songs with explicit_content — we honor it.
 *  2. Local blocklist: profanity (EN + Hindi/Punjabi romanized) matched with
 *     word boundaries against title / artist / album text.
 *
 * Search results are NOT filtered (user intent, like Spotify) but are badged
 * with an "E" marker. Everything algorithmic — home shelves, daily mixes,
 * radio, smart shuffle, AI playlists — MUST pass isClean().
 */

const RAW_BLOCKLIST: string[] = [
  // English profanity / explicit
  'fuck', 'fuk', 'fck', 'shit', 'bitch', 'bastard', 'asshole',
  'nigg', 'dick', 'pussy', 'cunt', 'whore', 'slut',
  'porn', 'porno', 'xxx', 'nude', 'naked', 'boobs', 'titties',
  'sex', 'sexy moan', 'orgasm', 'moaning', 'erotic',
  'weed', 'cocaine', 'meth', 'vagina', 'penis', 'jerk off', 'blowjob', 'handjob',
  // Romanized Hindi / Punjabi abuse
  'chutiya', 'chutiye', 'bhosdi', 'bhosda', 'bhosada', 'bhens', 'behenchod', 'bhenchod',
  'madarchod', 'maderchod', 'gaand', 'gandu', 'randi',
  'lund', 'lauda', 'lawda', 'loda', 'choot', 'chutmar', 'betichod',
  'harami', 'haramkhor', 'kutte', 'kutti', 'kamina', 'saala', 'saali',
  'tatte', 'tatti', 'jhaat', 'jhant',
  'maa chod', 'motherfucker', 'bsdk',
];

const BOUNDARY_SAFE = RAW_BLOCKLIST.map((w) => w.trim()).filter((w) => w.length >= 3);

const patterns = BOUNDARY_SAFE.map((word) => {
  // Allow trailing wildcards for stems (e.g. "nigg" matches "niggas")
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z])${escaped}`, 'i');
});

/** True when the text contains blocked terms (word-boundary aware). */
export function hasBlockedTerm(text: string | undefined | null): boolean {
  if (!text) return false;
  const normalized = ` ${text.toLowerCase().replace(/[_\-./]+/g, ' ')} `;
  for (let i = 0; i < patterns.length; i++) {
    const p = patterns[i];
    if (p && p.test(normalized)) return true;
  }
  // Compact forms people use to dodge filters
  const compact = text.toLowerCase().replace(/[^a-z]/g, '');
  for (const stem of ['fuck', 'bhosdi', 'madarchod', 'behenchod', 'chutiy', 'randi', 'gandu']) {
    if (compact.includes(stem)) return true;
  }
  return false;
}

interface ExplicitFlagged {
  title?: string;
  artist?: string;
  album?: string;
  explicit?: boolean;
}

/** A track/collection is clean when no blocked term AND no explicit flag. */
export function isClean(item: ExplicitFlagged): boolean {
  if (item.explicit) return false;
  return (
    !hasBlockedTerm(item.title) &&
    !hasBlockedTerm(item.artist) &&
    !hasBlockedTerm(item.album)
  );
}

/** Filter helper for arrays of flagged items. */
export function filterClean<T extends ExplicitFlagged>(items: T[]): T[] {
  return items.filter((item) => isClean(item));
}
