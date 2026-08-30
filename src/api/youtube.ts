/**
 * YOUTUBE SOURCE — minimal on-device InnerTube client (YOUTUBE-INTEGRATION-PLAN).
 *
 * Pinned technique from the OSS ecosystem (NewPipe / youtubei.js / FreeTube),
 * built as our own ~300 LOC module so YouTube breakage can never touch the
 * JioSaavn core:
 *
 *   search   → WEB_REMIX (YT Music) catalog — verified working client-side
 *              with Song/Video/Album entities (research/youtube probes)
 *   stream   → client ladder over the `player` endpoint; the first client
 *              whose streamingData carries a direct audio URL wins. Data-
 *              driven order: a client that bot-walls ("LOGIN_REQUIRED")
 *              or returns DRM-only formats is skipped, never fatal.
 *   refresh  → googlevideo URLs are IP-bound + time-limited — same
 *              stale-URL recovery pattern as the saavn client.
 *   kill     → 3 consecutive stream failures soft-disable the source for
 *              1 h (auto-retry); `ytAvailable()` gates every entry point.
 *
 * PO tokens: the ladder accepts an optional injected token provider
 * (`setPoTokenProvider`) — the hidden-WebView minter lands as P2 without
 * touching this file's structure.
 */

import type { Track } from '../types';

// ── client registry (ONE place to update when YouTube rotates shapes) ──

interface YtClient {
  name: string;
  clientName: string;
  clientVersion: string;
  apiKey: string;
  userAgent: string;
  extraContext?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const YT_CLIENTS: YtClient[] = [
  {
    name: 'IOS',
    clientName: 'IOS',
    clientVersion: '19.09.3',
    apiKey: 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc',
    userAgent: 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)',
    extraContext: { deviceMake: 'Apple', deviceModel: 'iPhone14,3', osName: 'iPhone', osVersion: '15.6.0.19G71' },
  },
  {
    name: 'ANDROID',
    clientName: 'ANDROID',
    clientVersion: '19.09.37',
    apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
    userAgent: 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
    extraContext: { androidSdkVersion: 30, osName: 'Android', osVersion: '11' },
  },
  {
    name: 'ANDROID_VR',
    clientName: 'ANDROID_VR',
    clientVersion: '1.60.19',
    apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
    userAgent: 'com.google.android.apps.youtube.vr.oculus/1.60.19 (Linux; U; Android 12; eureka-user Build/SQ3A.220605.009.A1) gzip',
    extraContext: { deviceMake: 'Oculus', deviceModel: 'Quest 3', osName: 'Android', osVersion: '12', androidSdkVersion: 32 },
  },
  {
    name: 'WEB_REMIX',
    clientName: 'WEB_REMIX',
    clientVersion: '1.20240403.01.00',
    apiKey: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  },
  {
    name: 'WEB',
    clientName: 'WEB',
    clientVersion: '2.20240701.00.00',
    apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  },
];

const YTI = 'https://www.youtube.com/youtubei/v1';
const GL = 'IN';
const HL = 'en';

/** Injectable fetch (tests stub this; runtime uses global fetch). */
let ytFetch: typeof fetch = (input, init) => fetch(input as any, init as any);
export function setYtFetch(fn: typeof fetch | null): void {
  ytFetch = (fn ?? ((input, init) => fetch(input as any, init as any))) as typeof fetch;
}

/** Optional PO-token provider (P2 hidden-WebView minter plugs in here). */
let poTokenProvider: (() => Promise<string | null>) | null = null;
export function setPoTokenProvider(fn: (() => Promise<string | null>) | null): void {
  poTokenProvider = fn;
}

// ── kill switch (YT bar 6: breakage can never degrade the core app) ──

const SOFT_DISABLE_MS = 60 * 60 * 1000;
const FAILURE_LIMIT = 3;
const ytState = { failures: 0, disabledUntil: 0 };

export function ytAvailable(now: number = Date.now()): boolean {
  return now >= ytState.disabledUntil;
}
export function noteYtFailure(now: number = Date.now()): void {
  ytState.failures += 1;
  if (ytState.failures >= FAILURE_LIMIT) {
    ytState.disabledUntil = now + SOFT_DISABLE_MS;
    ytState.failures = 0;
  }
}
export function noteYtSuccess(): void {
  ytState.failures = 0;
  ytState.disabledUntil = 0;
}
export function resetYtKillSwitch(): void {
  ytState.failures = 0;
  ytState.disabledUntil = 0;
}

// ── innertube plumbing ──

interface PlayerAudio {
  url: string;
  itag: number;
  bitrate: number;
  mime: string;
  expiresAt: number;
}

async function innertube(endpoint: string, client: YtClient, body: Record<string, unknown>, signal?: AbortSignal): Promise<any> {
  const context: any = {
    client: {
      clientName: client.clientName,
      clientVersion: client.clientVersion,
      hl: HL,
      gl: GL,
      ...(client.extraContext ?? {}),
    },
  };
  if (client.name === 'WEB' && poTokenProvider) {
    try {
      const token = await poTokenProvider();
      if (token) {
        context.client.poToken = token;
        (body as any).serviceIntegrityDimensions = { poToken: token };
      }
    } catch {
      /* token is best-effort — the ladder handles rejection downstream */
    }
  }
  const res = await ytFetch(`${YTI}/${endpoint}?key=${client.apiKey}&prettyPrint=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': client.userAgent,
      'X-YouTube-Client-Name': clientNameIndex(client.clientName),
      'X-YouTube-Client-Version': client.clientVersion,
      ...(client.headers ?? {}),
    },
    body: JSON.stringify({ context, ...body }),
    signal,
  });
  if (!res.ok) throw new Error(`yt ${client.name} http ${res.status}`);
  return res.json();
}

function clientNameIndex(name: string): string {
  // InnerTube's X-YouTube-Client-Name numeric ids (youtubei.js reference)
  const map: Record<string, string> = {
    WEB: '1', MWEB: '2', ANDROID: '3', IOS: '5', TVHTML5: '7',
    WEB_REMIX: '67', ANDROID_VR: '63', ANDROID_TESTSUITE: '30',
  };
  return map[name] ?? '1';
}

// ── search (WEB_REMIX catalog; WEB video fallback) ──

function parseDuration(text: string | undefined): number {
  if (!text) return 0;
  const parts = text.split(':').map((p) => parseInt(p, 10));
  if (parts.some((p) => Number.isNaN(p))) return 0;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

function firstVideoId(item: any): string | null {
  const text = JSON.stringify(item);
  const m = text.match(/"watchEndpoint":\{"videoId":"([\w-]{11})"/);
  return m ? m[1] : null;
}

function thumbFrom(renderer: any): string {
  const thumbs =
    renderer?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails ??
    renderer?.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails ??
    [];
  const best = thumbs[thumbs.length - 1]?.url;
  return best ? best.replace(/^\/\//, 'https://') : '';
}

/** Map one YT-Music list item to a Track (Song/Video rows only). */
function toTrack(item: any): Track | null {
  const r = item?.musicResponsiveListItemRenderer;
  if (!r) return null;
  const runs = (col: number) =>
    r.flexColumns?.[col]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ?? [];
  const title = runs(0)[0]?.text;
  const videoId = firstVideoId(r) ?? runs(0)[0]?.navigationEndpoint?.watchEndpoint?.videoId;
  if (!title || !videoId) return null;
  const subtitle = runs(1)
    .map((x: any) => x.text ?? '')
    .join('');
  const kindWord = subtitle.split('•')[0]?.trim().toLowerCase() ?? '';
  const ytKind: 'song' | 'video' = kindWord === 'video' ? 'video' : 'song';
  // "Song • Pritam, Atif Aslam & Amitabh Bhattacharya · 3:51" /
  // "Video • LYRICAL BAM HINDI • 6.2M views • 4:28"
  const segs = subtitle.split('•').map((s: string) => s.trim());
  const artistSeg = segs[1] ?? '';
  const durationSeg = [...segs].reverse().find((s: string) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(s));
  const playsSeg = segs.find((s: string) => /views|plays/i.test(s));
  return {
    id: `yt-${videoId}`,
    youtubeId: videoId,
    ytKind,
    title,
    artist: artistSeg || 'YouTube',
    artistsFull: artistSeg ? artistSeg.split(/,|&/).map((a: string) => a.trim()).filter(Boolean) : undefined,
    artwork: thumbFrom(r),
    duration: parseDuration(durationSeg),
    source: 'youtube',
    previewOnly: false,
    playCount: playsSeg ? Number((playsSeg.replace(/[^0-9.]/g, '') || '0')) || undefined : undefined,
  } as unknown as Track;
}

export interface YtSearchResult {
  tracks: Track[];
  albums: Array<{ title: string; browseId?: string; artist?: string }>;
  latencyMs: number;
}

/** YT-Music catalog search — Songs first, then videos; Albums surfaced separately. */
export async function ytSearchMusic(query: string, limit = 20, signal?: AbortSignal): Promise<YtSearchResult> {
  const t0 = Date.now();
  const remix = YT_CLIENTS.find((c) => c.name === 'WEB_REMIX')!;
  let data: any = null;
  try {
    data = await innertube('search', remix, { query }, signal);
  } catch {
    return { tracks: [], albums: [], latencyMs: Date.now() - t0 };
  }
  const tracks: Track[] = [];
  const albums: YtSearchResult['albums'] = [];
  const shelves =
    data?.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content
      ?.sectionListRenderer?.contents ?? [];
  const collect = (node: any) => {
    if (!node || typeof node !== 'object') return;
    if (node.musicResponsiveListItemRenderer) {
      const t = toTrack(node);
      if (t) tracks.push(t);
      const kind = (node.musicResponsiveListItemRenderer?.flexColumns?.[1]
        ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text ?? '').toLowerCase();
      if (kind.startsWith('album') || kind.startsWith('single')) {
        const browse =
          node.musicResponsiveListItemRenderer?.navigationEndpoint?.browseEndpoint?.browseId;
        if (browse) {
          albums.push({
            title:
              node.musicResponsiveListItemRenderer?.flexColumns?.[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text ?? '',
            browseId: browse,
          });
        }
      }
    }
    for (const k of Object.keys(node)) collect(node[k]);
  };
  // YouTube morphs shelf containers (musicShelfRenderer → itemSection/
  // musicCardShelf variants) — seed the recursive walker from EVERY
  // section so shape changes degrade to the same item set, never zero.
  for (const shelf of shelves) collect(shelf);
  // songs first, videos after; cap
  const songs = tracks.filter((t) => t.ytKind === 'song');
  const videos = tracks.filter((t) => t.ytKind !== 'song');
  const seen = new Set<string>();
  const merged = [...songs, ...videos].filter((t) => {
    const id = t.youtubeId!;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  return { tracks: merged.slice(0, limit), albums: albums.slice(0, 6), latencyMs: Date.now() - t0 };
}

// ── stream resolution (client ladder) ──

const streamCache = new Map<string, PlayerAudio>();
const STREAM_CACHE_MAX = 100;

function pickAudio(formats: any[]): PlayerAudio | null {
  const audios = formats
    .filter((f) => typeof f?.mimeType === 'string' && f.mimeType.startsWith('audio/') && typeof f?.url === 'string')
    .map((f) => ({
      url: f.url as string,
      itag: Number(f.itag) || 0,
      bitrate: Number(f.bitrate) || 0,
      mime: (f.mimeType as string).split(';')[0],
      expiresAt: Date.now() + 5.5 * 60 * 60 * 1000, // googlevideo expire ≈ 6h; refresh early
    }));
  if (audios.length === 0) return null;
  // prefer AAC m4a (universal RNTP/iOS compat), then highest bitrate
  const m4a = audios.filter((a) => a.mime === 'audio/mp4').sort((a, b) => b.bitrate - a.bitrate);
  const best = m4a[0] ?? audios.sort((a, b) => b.bitrate - a.bitrate)[0];
  return best ?? null;
}

export interface ResolveOutcome {
  ok: boolean;
  reason?: 'disabled' | 'bot-walled' | 'no-audio' | 'network';
  audio?: PlayerAudio;
}

/** Resolve a playable audio URL for a video id (ladder + cache). */
export async function ytResolveStream(videoId: string, signal?: AbortSignal): Promise<ResolveOutcome> {
  if (!ytAvailable()) return { ok: false, reason: 'disabled' };
  const hit = streamCache.get(videoId);
  if (hit && Date.now() < hit.expiresAt) {
    streamCache.delete(videoId);
    streamCache.set(videoId, hit); // refresh recency
    return { ok: true, audio: hit };
  }
  for (const client of YT_CLIENTS) {
    try {
      const player = await innertube(
        'player',
        client,
        { videoId, contentCheckOk: true, racyCheckOk: true },
        signal,
      );
      const status = player?.playabilityStatus?.status;
      if (status && status !== 'OK') continue; // LOGIN_REQUIRED / UNPLAYABLE / ERROR → next client
      const formats = player?.streamingData?.adaptiveFormats ?? [];
      const audio = pickAudio(formats);
      if (!audio) continue;
      streamCache.set(videoId, audio);
      if (streamCache.size > STREAM_CACHE_MAX) {
        const oldest = streamCache.keys().next().value;
        if (oldest !== undefined) streamCache.delete(oldest);
      }
      noteYtSuccess();
      return { ok: true, audio };
    } catch {
      // network/shape failure — try the next rung
    }
  }
  noteYtFailure();
  return { ok: false, reason: 'bot-walled' };
}

/** Stale-URL recovery for the background service (PlaybackError branch). */
export async function ytRefreshStream(track: Track): Promise<string | null> {
  const id = track.youtubeId ?? track.id.replace(/^yt-/, '');
  if (!id) return null;
  streamCache.delete(id);
  const out = await ytResolveStream(id).catch(() => ({ ok: false } as ResolveOutcome));
  return out.ok ? out.audio!.url : null;
}

/** Build a playable URL for an RN queue (PlayerProvider seam). */
export async function ytStreamUrlForTrack(track: Track): Promise<string | null> {
  const id = track.youtubeId ?? track.id.replace(/^yt-/, '');
  if (!id) return null;
  const out = await ytResolveStream(id).catch(() => ({ ok: false } as ResolveOutcome));
  return out.ok ? out.audio!.url : null;
}

/** Test hook — drain the in-memory cache between cases. */
export function clearYtCaches(): void {
  streamCache.clear();
}
