import React from 'react';
import { Image, StyleSheet, View, type StyleProp, type ImageStyle } from 'react-native';
import { colors, radius } from '../theme';

const GRADIENTS: Array<[string, string]> = [
  ['#7C4DFF', '#00E5FF'],
  ['#FF4D9D', '#7C4DFF'],
  ['#00E5FF', '#1DB954'],
  ['#FF8A00', '#E52E71'],
  ['#4D79FF', '#7C4DFF'],
];

function gradientFor(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export function Artwork({
  uri,
  seed,
  size,
  style,
}: {
  uri?: string;
  seed: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}) {
  const [failed, setFailed] = React.useState(false);
  const [a, b] = gradientFor(seed);
  if (!uri || failed) {
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderRadius: Math.max(radius.sm, size * 0.08),
            backgroundColor: a,
          },
          style,
        ]}
      >
        <View style={[styles.fallbackInner, { borderColor: b }]} />
        <View style={[styles.noteDot, { backgroundColor: b }]} />
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={[
        styles.image,
        {
          width: size,
          height: size,
          borderRadius: Math.max(radius.sm, size * 0.08),
        },
        style,
      ]}
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.surface },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackInner: {
    width: '46%',
    height: '46%',
    borderRadius: 999,
    borderWidth: 2,
    opacity: 0.85,
  },
  noteDot: {
    position: 'absolute',
    bottom: '24%',
    right: '24%',
    width: '10%',
    height: '10%',
    borderRadius: 999,
    opacity: 0.9,
  },
});
