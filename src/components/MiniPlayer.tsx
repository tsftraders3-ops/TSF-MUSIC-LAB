/**
 * MiniPlayer v2 — Spotify's floating now-playing card: elevated dark
 * pill above the tab bar, artwork + meta + heart + play/next, with a
 * thin accent progress line running along its bottom edge.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radius, spacing } from '../theme';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';
import { PressableScale } from './PressableScale';
import type { RootStackParamList } from '../screens/navigation';

export function MiniPlayer() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { active, isPlaying, loading, togglePlay, next, favorites, toggleLike } = usePlayer();
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
            color={isFav ? colors.accentBright : colors.textDim}
          />
        </PressableScale>

        <PressableScale hitSlop={10} onPress={togglePlay} style={styles.btn}>
          {loading ? (
            <View style={styles.spinnerWrap}>
              <View style={styles.dot} />
            </View>
          ) : (
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={26}
              color={colors.text}
            />
          )}
        </PressableScale>

        <PressableScale hitSlop={10} onPress={next} style={styles.btn}>
          <Ionicons name="play-skip-forward" size={21} color={colors.text} />
        </PressableScale>
      </PressableScale>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#2A2A2A',
    borderRadius: radius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 8,
    gap: 6,
  },
  art: { borderRadius: 6 },
  meta: { flex: 1, gap: 1, paddingHorizontal: 2 },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
  artist: { color: colors.textDim, fontSize: 11, fontFamily: fonts.regular },
  btn: { padding: 7 },
  spinnerWrap: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accentBright,
    opacity: 0.9,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: '100%',
  },
  progressFill: { height: 2, backgroundColor: colors.text },
});
