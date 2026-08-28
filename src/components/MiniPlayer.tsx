/**
 * MiniPlayer — authentic Spotify Android mini player:
 * a #282828 rounded card floating above the tab bar: square artwork,
 * bold white single-line title, heart + play controls, thin progress
 * line along the card's bottom edge. Tapping opens Now Playing.
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';
import type { RootStackParamList } from '../screens/navigation';

export function MiniPlayer() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { active, isPlaying, loading, togglePlay, favorites, toggleLike } = usePlayer();
  const { position, duration } = useProgress(500);
  if (!active) return null;
  const pct = duration > 0 ? Math.min(1, position / duration) : 0;
  const isFav = favorites.has(active.id);

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.8 }]}
        android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
        onPress={() => nav.navigate('Player')}
      >
        <Artwork uri={active.artwork} seed={active.id} size={40} variant="mini" />
        <Text style={styles.title} numberOfLines={1}>
          {active.title}
        </Text>

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
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={26}
              color={colors.text}
            />
          )}
        </Pressable>
      </Pressable>
      {/* thin progress line hugging the card's bottom edge */}
      <View style={styles.progressTrack} pointerEvents="none">
        <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    backgroundColor: colors.elevated, // #282828 (pixel-verified)
    borderRadius: 8,
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
    padding: 6,
    paddingRight: 8,
    gap: 10,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: fonts.bold,
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
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: '100%',
  },
  progressFill: { height: 2, backgroundColor: colors.text },
});
