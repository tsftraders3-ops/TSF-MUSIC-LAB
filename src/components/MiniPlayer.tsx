import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, type as typo } from '../theme';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../screens/navigation';
import { useProgress } from 'react-native-track-player';

export function MiniPlayer() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { active, isPlaying, togglePlay, next } = usePlayer();
  const { position, duration } = useProgress(700);
  if (!active) return null;
  const pct = duration > 0 ? Math.min(1, position / duration) : 0;

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.body} onPress={() => nav.navigate('Player')} android_ripple={{ color: colors.elevated }}>
        <Artwork uri={active.artwork} seed={active.id} size={44} style={styles.art} />
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {active.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {active.artist}
          </Text>
        </View>
        <Pressable hitSlop={10} onPress={togglePlay} style={styles.btn}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={26}
            color={colors.text}
          />
        </Pressable>
        <Pressable hitSlop={10} onPress={next} style={styles.btn}>
          <Ionicons name="play-skip-forward" size={22} color={colors.text} />
        </Pressable>
      </Pressable>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#18181D',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    gap: spacing.md,
  },
  art: { borderRadius: radius.sm },
  meta: { flex: 1, gap: 1 },
  title: { color: colors.text, fontSize: typo.body, fontWeight: '600' },
  artist: { color: colors.textDim, fontSize: typo.micro },
  btn: { padding: 8 },
  progressTrack: {
    height: 2,
    backgroundColor: colors.elevated,
    width: '100%',
  },
  progressFill: { height: 2, backgroundColor: colors.accent },
});
