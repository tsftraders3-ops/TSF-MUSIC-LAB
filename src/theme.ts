/**
 * TSF Music design system — Spotify-grade tokens.
 * Palette mirrors Spotify's 2024 dark language; Figtree substitutes
 * Circular. Every screen pulls colors/typography from here ONLY.
 */

export const colors = {
  // surfaces — deep charcoal (inspo 3/5) rather than flat black
  bg: '#0A0B0E', // base canvas
  bgDeep: '#050609', // behind modals / player backdrop
  surface: '#121318',
  card: '#1A1C22', // elevated tile
  cardDim: '#15171C',
  elevated: '#23252C',
  border: '#26282F',

  // glassmorphism tokens (inspo 1/2) — translucency + hairline edges
  glass: 'rgba(255,255,255,0.065)',
  glassStrong: 'rgba(255,255,255,0.10)',
  glassBorder: 'rgba(255,255,255,0.09)',
  glassBorderStrong: 'rgba(255,255,255,0.16)',

  // text
  text: '#FFFFFF',
  textDim: '#B3B3B3', // Spotify secondary
  textFaint: '#737373',

  // brand
  accent: '#1DB954', // Spotify green
  accentBright: '#1ED760', // CTA green (play buttons)
  accentDim: '#169C46',
  accentDeep: '#06130B', // text on green
  danger: '#E91429',

  // AI identity — signature violet→cyan
  aiStart: '#7C4DFF',
  aiMid: '#4D6BFF',
  aiEnd: '#00E5FF',

  // misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.55)',
};

/** Figtree weights loaded via expo-font in App.tsx. */
export const fonts = {
  regular: 'Figtree-400',
  medium: 'Figtree-500',
  semibold: 'Figtree-600',
  bold: 'Figtree-700',
  extrabold: 'Figtree-800',
  black: 'Figtree-900',
};

const weightMap: Record<number, string> = {
  400: fonts.regular,
  500: fonts.medium,
  600: fonts.semibold,
  700: fonts.bold,
  800: fonts.extrabold,
  900: fonts.black,
};

/** Pick the loaded font family for a numeric weight. */
export function font(weight: 400 | 500 | 600 | 700 | 800 | 900 = 500): string {
  return weightMap[weight] ?? fonts.medium;
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  squircle: 20, // inspo 1/2/5 signature soft card
  full: 999,
};

/** Spotify-ish type scale (px). */
export const type = {
  hero: 26,
  title: 22,
  headline: 18,
  subhead: 15,
  body: 15,
  caption: 13,
  micro: 11,
};

/** Genre tile palette for Search "Browse all" — Spotify's colorful grid. */
export const genreColors: Array<[string, string]> = [
  ['#E8115B', '#C4187C'], // pop
  ['#8D67AB', '#5E4B8B'], // bollywood
  ['#DC148C', '#9B1B7A'], // punjabi
  ['#1E3264', '#132A4E'], // hip hop
  ['#E13300', '#A82600'], // rock
  ['#477D95', '#2E5468'], // chill
  ['#BA5D07', '#8C4405'], // lo-fi
  ['#503750', '#332233'], // devotional
  ['#0D73EC', '#0A57B0'], // party
  ['#537AA1', '#35516C'], // romance
  ['#AF2896', '#7C1B6B'], // workout
  ['#7D4B32', '#573322'], // acoustic
];

export function genreGradient(i: number): [string, string] {
  return genreColors[i % genreColors.length];
}
