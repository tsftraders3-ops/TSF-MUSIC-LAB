/**
 * YOUTUBE GAUNTLET (YOUTUBE-INTEGRATION-PLAN §7) — bars YT-A…YT-F.
 *
 * All network is stubbed through the module's setYtFetch seam. Fixtures
 * mirror the live InnerTube shapes captured in research/youtube/.
 */

import { describe, expect, test, beforeEach } from 'bun:test';
import type { Track } from '../../src/types';
import {
  setYtFetch,
  ytSearchMusic,
  ytResolveStream,
  ytRefreshStream,
  ytAvailable,
  noteYtFailure,
  resetYtKillSwitch,
  clearYtCaches,
} from '../../src/api/youtube';

// ── fixtures (shape = real InnerTube responses, minimal) ──

const YTM_SEARCH_BODY = {
  contents: {
    tabbedSearchResultsRenderer: {
      tabs: [
        {
          tabRenderer: {
            content: {
              sectionListRenderer: {
                contents: [
                  {
                    musicShelfRenderer: {
                      contents: [
                        item('sDKLK127GVA', 'TU CHAHIYE (Lo-Fi Mix): DJ Moody', 'Song • Amitabh Bhattacharya, Atif Aslam • 4:12'),
                        item('vl8YTnx3gso', 'Tu Chahiye', 'Song • Pritam, Atif Aslam & Amitabh Bhattacharya • 3:51'),
                        item('kv_5z2ROptE', 'Tu Chahiye - Atif Aslam (Lyrics)', 'Video • LYRICAL BAM HINDI • 6.2M views • 4:28'),
                        item('vl8YTnx3gso', 'Tu Chahiye (dup)', 'Song • Pritam • 3:51'),
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
};

function item(videoId: string, title: string, subtitle: string) {
  return {
    musicResponsiveListItemRenderer: {
      flexColumns: [
        {
          musicResponsiveListItemFlexColumnRenderer: {
            text: { runs: [{ text: title, navigationEndpoint: { watchEndpoint: { videoId } } }] },
          },
        },
        {
          musicResponsiveListItemFlexColumnRenderer: {
            text: { runs: [{ text: subtitle }] },
          },
        },
      ],
      thumbnail: {
        musicThumbnailRenderer: {
          thumbnail: { thumbnails: [{ url: 'https://i.ytimg.com/w120.jpg' }, { url: 'https://i.ytimg.com/w544.jpg' }] },
        },
      },
    },
  };
}

const PLAYER_OK = {
  playabilityStatus: { status: 'OK' },
  streamingData: {
    adaptiveFormats: [
      { itag: 140, mimeType: 'audio/mp4; codecs="mp4a.40.2"', bitrate: 129703, url: 'https://rr1.example.googlevideo.com/videoplayback?id=ok140' },
      { itag: 251, mimeType: 'audio/webm; codecs="opus"', bitrate: 142000, url: 'https://rr1.example.googlevideo.com/videoplayback?id=ok251' },
      { itag: 137, mimeType: 'video/mp4', bitrate: 1200000, url: 'https://rr1.example.googlevideo.com/videoplayback?id=vid' },
    ],
  },
};

const BOT_WALL = { playabilityStatus: { status: 'LOGIN_REQUIRED', reason: "Sign in to confirm you're not a bot" } };

type Route = (url: string, init?: any) => { status: number; json: any } | undefined;

function makeFetch(routes: Route[]) {
  const calls: string[] = [];
  const impl = (url: any, init?: any) => {
    const u = String(url);
    calls.push(u);
    for (const r of routes) {
      const out = r(u, init);
      if (out) {
        return Promise.resolve(new Response(JSON.stringify(out.json), { status: out.status }));
      }
    }
    return Promise.resolve(new Response('{}', { status: 200 }));
  };
  return { impl: impl as unknown as typeof fetch, calls };
}

const isSearch = (u: string) => u.includes('youtubei/v1/search');
const isPlayer = (u: string) => u.includes('youtubei/v1/player');

beforeEach(() => {
  resetYtKillSwitch();
  clearYtCaches();
});

describe('YT-A — YT Music catalog search parse', () => {
  test('TITLE-TRUTH v2 (lab.5): canonical recording tops remix junk; dup dropped; fields mapped', async () => {
    const f = makeFetch([(u) => (isSearch(u) ? { status: 200, json: YTM_SEARCH_BODY } : undefined)]);
    setYtFetch(f.impl);
    const res = await ytSearchMusic('tu chahiye atif aslam');
    expect(res.tracks.length).toBe(3); // dup dropped
    // CONTRACT CHANGE (v3.4.0-lab.5): results are TITLE-TRUTH ranked —
    // the canonical "Tu Chahiye" (Pritam/Atif Aslam) tops the list even
    // though YT's own order crowned the Lo-Fi Mix. The old
    // provider-order-first contract is what painted remix junk as
    // "Top result" on the device.
    expect(res.tracks[0].youtubeId).toBe('vl8YTnx3gso');
    expect(res.tracks[0].ytKind).toBe('song');
    expect(res.topConfident).toBe(true);
    // canonical row carries full metadata
    expect(res.tracks[0].duration).toBe(231); // 3:51
    expect(res.tracks[0].artist).toContain('Atif Aslam');
    expect(res.tracks[0].artwork).toBe('https://i.ytimg.com/w544.jpg');
    expect(res.tracks[0].id).toBe('yt-vl8YTnx3gso');
    expect(res.tracks[0].source).toBe('youtube');
    // edit-class junk (Lo-Fi Mix) survives the purge but sinks below the
    // canonical title — never above any clean recording
    expect(res.tracks[res.tracks.length - 1].youtubeId).toBe('sDKLK127GVA');
    expect(res.tracks.some((t) => t.youtubeId === 'sDKLK127GVA')).toBe(true);
  });

  test('JUNK PURGE (lab.5): episodes/playlists/profiles/date-videos/durationless videos never paint', async () => {
    const body = {
      contents: {
        tabbedSearchResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  sectionListRenderer: {
                    contents: [
                      { itemSectionRenderer: { contents: [
                        // the live-probed REAL shapes (lab.5 field report)
                        item('8vPbzyXjCTM', 'Mujhe Sirf Tu Chahiye | Dard Bhari Shayari', 'Episode • Jun 5 • Sad Shayari Video'),
                        item('ILO48d1jG_w', 'Own Karachi || Jawab tu Chahiye || HKM', 'Episode • Feb 19, 2024 • Karachi Wifi'),
                        item('zx5EyFzsMKA', 'I just want you | Romantic Shayari Status', 'Episode • Sep 12, 2025 • Shayari'),
                        item('abcdef1ghij', 'VocalReplay', 'Profile • @VocalReplay'),
                        item('bcdefg1hij', 'Haryanvi Party', 'Playlist • YouTube Music • 97 songs'),
                        item('cdefghi1jk', 'Sad Shayari Video', 'Podcast • Oye shayar G'),
                        // "23h ago" parsed as 23 SECONDS by the old parser
                        item('defghij1kl', 'Living Without Lying — Dostoevsky', 'Video • Deep Reads • 23h ago'),
                        // date-only video (no duration) — news junk
                        item('efghijk1lm', 'The TRUTH About Onion Oil', 'Video • Shivangi Desai • Jul 28, 2025'),
                        // card-shelf video (no kind word, has views) — kept
                        item('sDKLK127GVA', 'TU CHAHIYE (Lo-Fi Mix): DJ Moody', 'Amitabh Bhattacharya, Atif Aslam • 188K views • 5:09'),
                        // classic-shelf song (no kind word, duration only) — kept as song
                        item('vl8YTnx3gso', 'Tu Chahiye', 'Pritam, Atif Aslam & Amitabh Bhattacharya • 3:51'),
                        // explicit Song row without duration (itemSection shape) — kept
                        item('aaaaabbbbbc', 'Tu Chahiye', 'Song • Pritam, Atif Aslam & Amitabh Bhattacharya'),
                      ] } },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    const f = makeFetch([(u) => (isSearch(u) ? { status: 200, json: body } : undefined)]);
    setYtFetch(f.impl);
    const res = await ytSearchMusic('tu chaiye');
    const ids = res.tracks.map((t) => t.youtubeId);
    // junk purged — episodes, profile, playlist, podcast, date/"ago" videos
    expect(ids).not.toContain('8vPbzyXjCTM');
    expect(ids).not.toContain('ILO48d1jG_w');
    expect(ids).not.toContain('zx5EyFzsMKA');
    expect(ids).not.toContain('abcdef1ghij');
    expect(ids).not.toContain('bcdefg1hij');
    expect(ids).not.toContain('cdefghi1jk');
    expect(ids).not.toContain('defghij1kl'); // "23h ago" must not parse as 23s
    expect(ids).not.toContain('efghijk1lm');
    // playable music survives
    expect(ids).toContain('vl8YTnx3gso');
    expect(ids).toContain('aaaaabbbbbc');
    expect(ids).toContain('sDKLK127GVA');
    // canonical recording ranks FIRST, Lo-Fi Mix sinks below every clean title
    expect(res.tracks[0].youtubeId).toBe('vl8YTnx3gso');
    expect(res.topConfident).toBe(true);
    // card-shelf video classified as VIDEO with credits-first artist
    const card = res.tracks.find((t) => t.youtubeId === 'sDKLK127GVA')!;
    expect(card.ytKind).toBe('video');
    expect(card.artist).toBe('Amitabh Bhattacharya, Atif Aslam');
    expect(card.playCount).toBe(188000);
    expect(card.duration).toBe(309); // 5:09 — strict parse
    // classic-shelf shape classified as SONG with credits artist
    const shelfSong = res.tracks.find((t) => t.youtubeId === 'vl8YTnx3gso')!;
    expect(shelfSong.ytKind).toBe('song');
    expect(shelfSong.artist).toContain('Pritam');
    expect(shelfSong.duration).toBe(231);
  });

  test('YT-TOP GATE (lab.5): unrelated rows → topConfident false (hero must not paint junk)', async () => {
    const body = {
      contents: {
        tabbedSearchResultsRenderer: {
          tabs: [
            {
              tabRenderer: {
                content: {
                  sectionListRenderer: {
                    contents: [
                      { itemSectionRenderer: { contents: [
                        item('fff1', 'Sea Buckthorn benefits & dosage', 'Video • Health • 1.2M views • 8:12'),
                        item('ggg2', 'Something completely unrelated here', 'Song • Unknown Artist • 3:00'),
                      ] } },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    const f = makeFetch([(u) => (isSearch(u) ? { status: 200, json: body } : undefined)]);
    setYtFetch(f.impl);
    const res = await ytSearchMusic('tu chaiye atif aslam');
    expect(res.tracks.length).toBe(2);
    expect(res.topConfident).toBe(false);
  });

  test('search failure degrades to empty (never throws)', async () => {
    const f = makeFetch([(u) => (isSearch(u) ? { status: 500, json: {} } : undefined)]);
    setYtFetch(f.impl);
    const res = await ytSearchMusic('anything');
    expect(res.tracks).toEqual([]);
    expect(res.topConfident).toBe(false);
  });
});

describe('YT-B — client ladder picks a playable audio stream', () => {
  test('prefers AAC m4a (itag 140) over higher-bitrate opus; video skipped', async () => {
    const f = makeFetch([(u) => (isPlayer(u) ? { status: 200, json: PLAYER_OK } : undefined)]);
    setYtFetch(f.impl);
    const out = await ytResolveStream('vl8YTnx3gso');
    expect(out.ok).toBe(true);
    expect(out.audio!.itag).toBe(140);
    expect(out.audio!.mime).toBe('audio/mp4');
    expect(out.audio!.url).toContain('googlevideo.com');
  });

  test('bot-walled clients are skipped, later rung still wins', async () => {
    let ios = 0;
    const f = makeFetch([
      (u) => {
        if (!isPlayer(u)) return undefined;
        ios += 1;
        return ios === 1 ? { status: 200, json: BOT_WALL } : { status: 200, json: PLAYER_OK };
      },
    ]);
    setYtFetch(f.impl);
    const out = await ytResolveStream('vl8YTnx3gso');
    expect(out.ok).toBe(true);
    expect(ios).toBeGreaterThanOrEqual(2);
  });

  test('URL cache answers repeats without re-probing the player', async () => {
    const f = makeFetch([(u) => (isPlayer(u) ? { status: 200, json: PLAYER_OK } : undefined)]);
    setYtFetch(f.impl);
    await ytResolveStream('vl8YTnx3gso');
    const callsAfterFirst = f.calls.length;
    const again = await ytResolveStream('vl8YTnx3gso');
    expect(again.ok).toBe(true);
    expect(f.calls.length).toBe(callsAfterFirst); // zero new player calls
  });

  test('refresh invalidates the cache and re-resolves', async () => {
    const f = makeFetch([(u) => (isPlayer(u) ? { status: 200, json: PLAYER_OK } : undefined)]);
    setYtFetch(f.impl);
    const t: Track = { id: 'yt-vl8YTnx3gso', youtubeId: 'vl8YTnx3gso', title: 'Tu Chahiye', artist: 'Atif Aslam', artwork: '', duration: 231, source: 'youtube', previewOnly: false } as Track;
    const url = await ytRefreshStream(t);
    expect(url).toContain('googlevideo.com');
  });
});

describe('YT-C — kill switch: breakage can never degrade the core', () => {
  test('all clients bot-walled → resolution fails honestly', async () => {
    const f = makeFetch([(u) => (isPlayer(u) ? { status: 200, json: BOT_WALL } : undefined)]);
    setYtFetch(f.impl);
    const out = await ytResolveStream('vl8YTnx3gso');
    expect(out.ok).toBe(false);
  });

  test('3 consecutive failures soft-disable the source for 1h', async () => {
    expect(ytAvailable()).toBe(true);
    noteYtFailure(0);
    noteYtFailure(0);
    expect(ytAvailable(0)).toBe(true); // 2 failures — still up
    noteYtFailure(0); // 3rd
    expect(ytAvailable(0)).toBe(false);
    expect(ytAvailable(59 * 60 * 1000)).toBe(false);
    expect(ytAvailable(60 * 60 * 1000)).toBe(true); // auto-retry after 1h
  });

  test('a success clears the failure streak', async () => {
    noteYtFailure(0);
    noteYtFailure(0);
    const f = makeFetch([(u) => (isPlayer(u) ? { status: 200, json: PLAYER_OK } : undefined)]);
    setYtFetch(f.impl);
    await ytResolveStream('vl8YTnx3gso'); // success path calls noteYtSuccess internally
    expect(ytAvailable(0)).toBe(true);
  });
});
