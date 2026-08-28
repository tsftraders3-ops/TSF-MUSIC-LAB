import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { colors, spacing, type as typo } from '../theme';
import { Artwork } from './Artwork';
import { usePlayer } from '../player/PlayerProvider';

export function TrackRow({
  track,
  index,
  onPress,
  style,
}: {
  track: Track;
  index?: number;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  const { active, isPlaying, loading, favorites, toggleLike } = usePlayer();
  const isActive = active?.id === track.id;
  const isFav = favorites.has(track.id);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.elevated }}
      style={({ pressed }) => [styles.row, style, pressed && styles.pressed]}
    >
      {index != null && !track.artwork ? (
        <Text style={[styles.index, isActive && { color: colors.accent }]}>{index + 1}</Text>
      ) : (
        <Artwork uri={track.artwork} seed={track.id} size={52} />
      )}
      <View style={styles.meta}>
        <View style={styles.titleRow}>
          {isActive && (
            <View style={styles.eq}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.accent} />
              ) : (
                <Ionicons name="bar-chart" size={13} color={colors.accent} style={{ transform: [{ rotate: '90deg' }] }} />
              )}
            </View>
          )}
          <Text style={[styles.title, isActive && { color: colors.accent }]} numberOfLines={1}>
            {track.title}
          </Text>
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          {track.previewOnly ? 'PREVIEW · ' : ''}
          {track.artist}
          {track.album ? ` · ${track.album}` : ''}
        </Text>
      </View>
      <Pressable
        hitSlop={12}
        onPress={() => toggleLike(track)}
        style={styles.likeBtn}
      >
        <Ionicons
          name={isFav ? 'heart' : 'heart-outline'}
          size={20}
          color={isFav ? colors.accent : colors.textFaint}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    gap: spacing.md,
  },
  pressed: { opacity: 0.7 },
  index: {
    width: 28,
    color: colors.textFaint,
    fontSize: typo.body,
    textAlign: 'center',
    fontFamily: 'System',
  },
  meta: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eq: { width: 14, alignItems: 'center' },
  title: {
    color: colors.text,
    fontSize: typo.body,
    fontWeight: '600',
    flexShrink: 1,
  },
  subtitle: { color: colors.textDim, fontSize: typo.caption },
  likeBtn: { padding: 6 },
});
