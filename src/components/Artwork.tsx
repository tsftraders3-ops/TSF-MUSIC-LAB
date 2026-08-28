/**
 * Artwork v2 — remote cover with deterministic gradient fallback.
 * Variants match Spotify: full-radius shelf cards, small-radius row art.
 * The fallback renders a diagonal gradient with a musical-note glyph so
 * placeholder covers still look designed, never broken.
 */

import React from 'react';
import { Image, StyleSheet, View, type StyleProp, type ImageStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const GRADIENTS: Array<[string, string]> = [
  ['#7C4DFF', '#00E5FF'],
  ['#E8115B', '#7C4DFF'],
  ['#0D73EC', '#503750'],
  ['#FF8A00', '#E52E71'],
  ['#1DB954', '#0D73EC'],
  ['#AF2896', '#503750'],
];

function gradientFor(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length] as [string, string];
}

export function Artwork({
  uri,
  seed,
  size,
  style,
  variant = 'rounded',
}: {
  uri?: string;
  seed: string;
  size: number;
  style?: StyleProp<ImageStyle>;
  /** 'card' = Spotify full-radius shelf art, 'rounded' = rows/player */
  variant?: 'card' | 'rounded' | 'circle';
}) {
  const [failed, setFailed] = React.useState(false);
  const [a, b] = gradientFor(seed);
  const borderRadius =
    variant === 'circle' ? size / 2 : variant === 'card' ? Math.max(6, size * 0.085) : Math.max(4, size * 0.055);

  if (!uri || failed) {
    return (
      <View style={[styles.fallback, { width: size, height: size, borderRadius }, style]}>
        <LinearGradient
          colors={[a, b]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { borderRadius }]}
        >
          <Ionicons name="musical-notes" size={Math.max(14, size * 0.28)} color="rgba(255,255,255,0.85)" />
        </LinearGradient>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={[styles.image, { width: size, height: size, borderRadius }, style]}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.surface },
  fallback: { overflow: 'hidden' },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
