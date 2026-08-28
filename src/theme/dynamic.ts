/**
 * Dynamic palette engine — the "UI changes with the song" core.
 *
 * How it works:
 *   1. Fetch a TINY variant of the track artwork (50x50, ~2 KB) straight
 *      from the same CDN the full art comes from.
 *   2. Decode the JPEG in pure JS (jpeg-js — no native module, zero build
 *      risk) and quantize pixels into 4-bit-per-channel buckets.
 *   3. Score buckets by count × saturation → dominant + vibrant colors.
 *   4. Derive the full theme: deep (near-black tinted bg), glow (bright
 *      accent), glass tint, readable-on-accent.
 *
 * Performance contract:
 *   • runs once per track change, off the render path
 *   • LRU cache (64) + in-flight dedupe → repeated tracks are instant
 *   • any failure falls back to a deterministic curated palette, so the
 *     UI always has a real palette to paint with
 */

import { decode as jpegDecode } from 'jpeg-js';

export interface DynamicPalette {
  key: string;
  /** most common color family of the artwork */
  dominant: string;
  /** most saturated prominent color — the accent */
  vibrant: string;
  /** near-black version of dominant — ambient backgrounds */
  deep: string;
  /** brightened vibrant — progress bars, glows, active states */
  glow: string;
  /** vivid mid-tone of the artwork hue — playlist/album header washes */
  wash: string;
}

/* ── color math ─────────────────────────────────────────────────────── */

interface RGB {
  r: number;
  g: number;
  b: number;
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function hex(r: number, g: number, b: number): string {
  const h = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function rgbFromHex(color: string): RGB {
  const c = color.replace('#', '');
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

/** hex → rgba() string with alpha (used all over the glass layers). */
export function withAlpha(color: string, alpha: number): string {
  const { r, g, b } = rgbFromHex(color);
  return `rgba(${r},${g},${b},${clamp(alpha, 0, 1)})`;
}

function luminance({ r, g, b }: RGB): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Mix two hex colors; t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
  const A = rgbFromHex(a);
  const B = rgbFromHex(b);
  return hex(A.r + (B.r - A.r) * t, A.g + (B.g - A.g) * t, A.b + (B.b - A.b) * t);
}

/**
 * Spotify's player-gradient top color: the artwork hue with a
 * saturation/lightness floor so the wash always reads vivid (like
 * Spotify's extracted-color player background).
 */
export function boostForPlayer(color: string): string {
  const { r, g, b } = rgbFromHex(color);
  const { h, s, l } = rgbToHsl(r, g, b);
  const s2 = Math.max(s, 0.55);
  const l2 = clamp(l, 0.42, 0.6);
  const out = hslToRgb(h, s2, l2);
  return hex(out.r, out.g, out.b);
}

/* ── HSL art-direction ──────────────────────────────────────────────── */

interface HSL {
  h: number; // 0..360
  s: number; // 0..1
  l: number; // 0..1
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rr) h = ((gg - bb) / d + (gg < bb ? 6 : 0)) * 60;
  else if (max === gg) h = ((bb - rr) / d + 2) * 60;
  else h = ((rr - gg) / d + 4) * 60;
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const hh = ((h % 360) + 360) % 360 / 360;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const conv = (t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return {
    r: Math.round(conv(hh + 1 / 3) * 255),
    g: Math.round(conv(hh) * 255),
    b: Math.round(conv(hh - 1 / 3) * 255),
  };
}

/**
 * Art-direct the raw bucket colors (Spotify-style):
 * the accent always carries the artwork's HUE but gets a saturation and
 * lightness floor so dark/moody covers still produce a lively accent,
 * and near-black covers still tint the ambient with color.
 */
function paletteFrom(dominant: string, vibrant: string, key: string): DynamicPalette {
  const d = rgbFromHex(dominant);
  const v = rgbFromHex(vibrant);
  const dHsl = rgbToHsl(d.r, d.g, d.b);
  const vHsl = rgbToHsl(v.r, v.g, v.b);

  // --- glow (accent): hue from art, guaranteed vivid ---
  const gray = vHsl.s < 0.08 && dHsl.s < 0.08;
  const glowH = gray ? 215 : vHsl.h; // no hue in art → premium steel blue
  const glowS = gray ? 0.32 : Math.max(vHsl.s, 0.48);
  const glowL = clamp(vHsl.l, 0.58, 0.72);
  const glowRgb = hslToRgb(glowH, glowS, glowL);

  // --- deep (ambient bg): the art's hue, very dark, softly saturated ---
  const deepH = dHsl.s > 0.14 ? dHsl.h : glowH;
  const deepS = gray ? 0.26 : clamp(Math.max(dHsl.s, 0.3), 0.24, 0.55);
  const deepRgb = hslToRgb(deepH, deepS, 0.085);

  // --- wash (vivid mid-tone for playlist/album headers + player bg): the
  // artwork hue with saturation/lightness floors so dark covers never
  // render as mud — always a confident, readable color
  const washH = deepH;
  const washS = gray ? 0.38 : clamp(Math.max(dHsl.s, 0.5), 0.42, 0.68);
  const washL = clamp(dHsl.l, 0.42, 0.54);
  const washRgb = hslToRgb(washH, washS, washL);

  return {
    key,
    dominant,
    vibrant,
    deep: hex(deepRgb.r, deepRgb.g, deepRgb.b),
    glow: hex(glowRgb.r, glowRgb.g, glowRgb.b),
    wash: hex(washRgb.r, washRgb.g, washRgb.b),
  };
}

/* ── deterministic fallbacks (instant, curated, seed-stable) ─────────── */

const FALLBACKS: Array<[string, string]> = [
  ['#5B4BC4', '#8B7CF6'], // indigo violet
  ['#B3542D', '#FF9A62'], // ember
  ['#8F2D56', '#FF6B8A'], // rose (inspo 3 coral)
  ['#1F6E6B', '#4DE0C6'], // teal
  ['#A67C1B', '#FFC94D'], // amber (inspo 5 golden)
  ['#3D5A98', '#6FA8FF'], // steel blue
  ['#7A3FD1', '#C86DD7'], // violet fuchsia
  ['#2E7D4F', '#5CE08A'], // forest mint
];

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function fallbackPalette(seed: string): DynamicPalette {
  const [dominant, vibrant] = FALLBACKS[hashSeed(seed) % FALLBACKS.length] as [string, string];
  return paletteFrom(dominant, vibrant, `fallback-${seed}`);
}

/* ── extraction ─────────────────────────────────────────────────────── */

/** Downgrade a CDN artwork URL to its smallest variant for cheap decode. */
function tinyArtworkUrl(url: string): string {
  return url
    .replace('500x500', '50x50')
    .replace('150x150', '50x50')
    .replace('100x100bb.jpg', '60x60bb.jpg')
    .replace(/^http:/, 'https:');
}

const cache = new Map<string, DynamicPalette>();
const inFlight = new Map<string, Promise<DynamicPalette>>();
const CACHE_MAX = 64;

function cachePut(key: string, p: DynamicPalette): void {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, p);
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

function quantize(data: Uint8Array, pixelCount: number): DynamicPalette | null {
  // 4 bits per channel → 4096 buckets, fine-grained enough for album art.
  const counts = new Uint32Array(4096);
  const sumR = new Uint32Array(4096);
  const sumG = new Uint32Array(4096);
  const sumB = new Uint32Array(4096);
  const satSum = new Float32Array(4096);

  for (let i = 0; i < pixelCount; i++) {
    const p = i * 4;
    const a = data[p + 3];
    if (a < 128) continue; // skip transparent
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const idx = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    counts[idx]++;
    sumR[idx] += r;
    sumG[idx] += g;
    sumB[idx] += b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    satSum[idx] += max === 0 ? 0 : (max - min) / max;
  }

  let domScore = -1;
  let domIdx = -1;
  let vibScore = -1;
  let vibIdx = -1;

  for (let i = 0; i < 4096; i++) {
    const c = counts[i];
    if (c === 0) continue;
    const r = sumR[i] / c;
    const g = sumG[i] / c;
    const b = sumB[i] / c;
    const l = luminance({ r, g, b });
    // skip pure-black borders/vignettes and blown-out whites
    if (l < 0.05 || l > 0.96) continue;
    const avgSat = satSum[i] / c;
    // Dominant: frequency favored by saturation and mid-luminance.
    const dScore = c * (0.45 + avgSat * 0.8) * (1 - Math.abs(l - 0.45) * 0.8);
    if (dScore > domScore) {
      domScore = dScore;
      domIdx = i;
    }
    // Vibrant: saturation leads, frequency tempered; avoid the extremes.
    if (l < 0.14 || l > 0.9) continue;
    const vScore = Math.sqrt(c) * (0.15 + avgSat * 3.4);
    if (vScore > vibScore) {
      vibScore = vScore;
      vibIdx = i;
    }
  }

  // if nothing survived the filters (extreme art), fall back to plain frequency
  if (domIdx < 0 || vibIdx < 0) {
    for (let i = 0; i < 4096; i++) {
      const c = counts[i];
      if (c === 0) continue;
      if (domIdx < 0) domIdx = i;
      vibIdx = i;
    }
  }
  if (domIdx < 0 || vibIdx < 0) return null;

  const avg = (idx: number, sums: Uint32Array): number => sums[idx] / counts[idx];
  const dominant = hex(avg(domIdx, sumR), avg(domIdx, sumG), avg(domIdx, sumB));
  const vibrant = hex(avg(vibIdx, sumR), avg(vibIdx, sumG), avg(vibIdx, sumB));
  return paletteFrom(dominant, vibrant, `art-${domIdx}-${vibIdx}`);
}

/**
 * Extract a palette from an artwork URL. Resolves instantly from cache,
 * dedupes concurrent calls, and NEVER rejects — failures resolve to the
 * deterministic fallback so callers can await blindly.
 */
export function extractPalette(artworkUrl: string, seed: string): Promise<DynamicPalette> {
  const cacheKey = artworkUrl;
  const hit = cache.get(cacheKey);
  if (hit) return Promise.resolve(hit);

  const existing = inFlight.get(cacheKey);
  if (existing) return existing;

  const job = (async (): Promise<DynamicPalette> => {
    try {
      const res = await fetch(tinyArtworkUrl(artworkUrl), {
        method: 'GET',
        headers: { Accept: 'image/jpeg, image/png' },
      });
      if (!res.ok) throw new Error(`artwork ${res.status}`);
      const buf = await res.arrayBuffer();
      const img = jpegDecode(new Uint8Array(buf), {
        useTArray: true,
        formatAsRGBA: true,
      });
      const palette = quantize(img.data as unknown as Uint8Array, img.width * img.height);
      if (!palette) throw new Error('no colors');
      const result = paletteFrom(palette.dominant, palette.vibrant, cacheKey);
      cachePut(cacheKey, result);
      return result;
    } catch {
      // PNG/WebP artwork or network failure — deterministic fallback.
      const fb = fallbackPalette(seed);
      cachePut(cacheKey, fb);
      return fb;
    } finally {
      inFlight.delete(cacheKey);
    }
  })();

  inFlight.set(cacheKey, job);
  return job;
}
