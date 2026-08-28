/**
 * MiniPlayer — repo-faithful Spotify mini player
 * (reference: spotify-react-web-client mobilePlayer.tsx):
 *
 *   artwork-derived gradient card — linear-gradient(color, #121212) —
 *   47px artwork + bold title + gray artist left; queue / heart / play
 *   right; 3px white progress line along the bottom edge. The card color
 *   repaints with every song (the dynamic palette engine does the work).
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';
import { useDynamicPalette } from '../theme/DynamicThemeProvider';
import type { RootStackParamList } from '../screens/navigation';

export function MiniPlayer() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const palette = useDynamicPalette();
  const { active, isPlaying, loading, togglePlay, favorites, toggleLike } = usePlayer();
  const { position, duration } = useProgress(500);
  if (!active) return null;
  const pct = duration > 0 ? Math.min(1, position / duration) : 0;
  const isFav = favorites.has(active.id);

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[palette.wash, colors.bg]}
        locations={[0.12, 0.98]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Pressable
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.8 }]}
        android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
        onPress={() => nav.navigate('Player')}
      >
        <Artwork uri={active.artwork} seed={active.id} size={44} variant="mini" />
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {active.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {active.artist}
          </Text>
        </View>

        <Pressable
          hitSlop={8}
          style={styles.btn}
          onPress={() => nav.navigate('Player', { openQueue: true })}
          accessibilityLabel="Queue"
        >
          <Ionicons name="list" size={22} color={colors.text} />
        </Pressable>
        <Pressable
          hitSlop={10}
          style={styles.btn}
          onPress={() => toggleLike(active)}
          accessibilityLabel="Like"
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? colors.accentBright : colors.text}
          />
        </Pressable>
        <Pressable hitSlop={10} style={styles.btn} onPress={togglePlay} accessibilityLabel="Play">
          {loading ? (
            <View style={styles.spinner} />
          ) : (
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={26} color={colors.text} />
          )}
        </Pressable>
      </Pressable>
      {/* 3px progress line — repo .time-line: white on black-24% */}
      <View style={styles.progressTrack} pointerEvents="none">
        <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    paddingRight: 6,
    gap: 10,
  },
  textWrap: { flex: 1, gap: 1, marginRight: 2 },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  artist: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  btn: { padding: 8, alignItems: 'center', justifyContent: 'center' },
  spinner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: colors.text,
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.24)',
    width: '100%',
  },
  progressFill: { height: 3, backgroundColor: colors.text },
});
