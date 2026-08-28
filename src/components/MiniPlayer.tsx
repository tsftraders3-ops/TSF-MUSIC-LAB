/**
 * MiniPlayer v3 — floating glass capsule (inspo 2/5): a pill of frosted
 * dark glass tinted by the current song's palette, artwork + meta + heart
 * + play/next, with the accent progress line running along its bottom
 * edge in the track's own glow color.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, spacing } from '../theme';
import { useDynamicPalette } from '../theme/DynamicThemeProvider';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';
import { PressableScale } from './PressableScale';
import type { RootStackParamList } from '../screens/navigation';

export function MiniPlayer() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { active, isPlaying, loading, togglePlay, next, favorites, toggleLike } = usePlayer();
  const palette = useDynamicPalette();
  const { position, duration } = useProgress(500);
  if (!active) return null;
  const pct = duration > 0 ? Math.min(1, position / duration) : 0;
  const isFav = favorites.has(active.id);

  return (
    <View style={styles.wrap}>
      <PressableScale
        scaleTo={0.985}
        onPress={() => nav.navigate('Player')}
        style={styles.card}
      >
        <Artwork uri={active.artwork} seed={active.id} size={46} style={styles.art} />
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {active.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {active.artist}
          </Text>
        </View>

        <PressableScale hitSlop={10} onPress={() => toggleLike(active)} style={styles.btn}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? palette.glow : colors.textDim}
          />
        </PressableScale>

        <PressableScale
          hitSlop={10}
          onPress={togglePlay}
          style={[styles.btn, styles.playChip]}
        >
          {loading ? (
            <View style={styles.spinnerWrap}>
              <View style={[styles.dot, { backgroundColor: palette.glow }]} />
            </View>
          ) : (
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={25}
              color={colors.text}
            />
          )}
        </PressableScale>

        <PressableScale hitSlop={10} onPress={next} style={styles.btn}>
          <Ionicons name="play-skip-forward" size={21} color={colors.text} />
        </PressableScale>
      </PressableScale>
      <View style={styles.progressTrack}>
        <View
          style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: palette.glow }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(18,19,24,0.94)',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: spacing.sm,
    paddingVertical: 8,
    gap: 4,
  },
  art: { borderRadius: 13 },
  meta: { flex: 1, gap: 1, paddingHorizontal: 2 },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
  artist: { color: colors.textDim, fontSize: 11, fontFamily: fonts.regular },
  btn: { padding: 7 },
  playChip: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 999,
    marginHorizontal: 2,
  },
  spinnerWrap: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.9,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: '100%',
  },
  progressFill: { height: 2 },
});
