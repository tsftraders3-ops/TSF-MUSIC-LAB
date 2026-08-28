/**
 * TSF Music design system — AUTHENTIC Spotify Android tokens.
 * Every value pixel-verified against real Spotify Android screenshots
 * (docs/spotify-refs): bg #121212, surfaces #242424/#282828/#2A2A2A,
 * tab bar #000000, secondary text #B3B3B3, CTA green #1ED760.
 * Figtree substitutes Circular (same geometric grotesque skeleton).
 */

export const colors = {
  // Spotify surfaces (verified by pixel-sampling references)
  bg: '#121212', // base canvas — Spotify dark base
  bgDeep: '#000000', // tab bar / under-modals — Spotify uses pure black here
  surface: '#181818', // subtle raised surface
  card: '#242424', // search field, chips, sheets
  cardDim: '#1E1E1E',
  elevated: '#282828', // mini player card, sheets, dialogs
  tile: '#2A2A2A', // home quick tiles (pixel-sampled #2A2A2A)
  border: '#282828',

  // legacy glass tokens → re-pointed to Spotify solids so any
  // un-migrated surface still lands on authentic colors
  glass: '#242424',
  glassStrong: '#282828',
  glassBorder: 'rgba(0,0,0,0)',
  glassBorderStrong: 'rgba(0,0,0,0)',

  // text
  text: '#FFFFFF',
  textDim: '#B3B3B3', // Spotify secondary
  textFaint: '#6A6A6A', // Spotify tertiary
  textOnGreen: '#000000', // Spotify puts black on green CTAs

  // brand
  accent: '#1DB954', // Spotify green (brand, active chip)
  accentBright: '#1ED760', // CTA green (play FABs, equalizer)
  accentDim: '#169C46',
  accentDeep: '#000000', // black-on-green text/icons
  danger: '#E91429',

  // AI identity — signature violet→cyan
  aiStart: '#7C4DFF',
  aiMid: '#4D6BFF',
  aiEnd: '#00E5FF',

  // misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.6)',
  inactiveTab: '#A7A7A7', // Spotify inactive tab label/icon
  likedStart: '#450AF5', // Spotify Liked Songs gradient
  likedEnd: '#C4EFA1',

  // chips / filter pills — repo-faithful (spotify-react-web-client):
  // active = solid white with near-black text, inactive = 10% white
  chipActiveBg: '#FFFFFF',
  chipActiveText: '#2A2929',
  chipInactiveBg: 'rgba(255,255,255,0.10)',

  // play FAB — repo CirclePlay.scss: #1ED760, black icon, soft shadow
  fabGreen: '#1ED760',
  fabShadow: '0 8px 8px rgba(0,0,0,0.3)',
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

/** Spotify radii — small and confident. */
export const radius = {
  sm: 4, // row artwork, quick-tile art
  md: 6, // shelf cards, mini player art
  lg: 8, // mini player card, player artwork, genre cards
  xl: 12, // sheets, dialogs
  xxl: 16,
  squircle: 8,
  full: 999,
};

/** Spotify type scale (px). */
export const type = {
  hero: 24,
  title: 22, // shelf headers
  headline: 18,
  subhead: 16,
  body: 15,
  caption: 13,
  micro: 11,
};

/** Spotify "Browse all" genre card colors — the real browse palette. */
export const genreColors: Array<[string, string]> = [
  ['#8D67AB', '#8D67AB'], // Made For You
  ['#E8115B', '#E8115B'], // Bollywood
  ['#DC148C', '#DC148C'], // Punjabi
  ['#1E3264', '#1E3264'], // Hip-Hop
  ['#E13300', '#E13300'], // Rock
  ['#477D95', '#477D95'], // Chill
  ['#BA5D07', '#BA5D07'], // Lo-Fi
  ['#503750', '#503750'], // Devotional
  ['#0D73EC', '#0D73EC'], // Party
  ['#537AA1', '#537AA1'], // Romance
  ['#AF2896', '#AF2896'], // Workout
  ['#7D4B32', '#7D4B32'], // Acoustic
];

export function genreGradient(i: number): [string, string] {
  return genreColors[i % genreColors.length];
}
