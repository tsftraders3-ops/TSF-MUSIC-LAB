/**
 * Shelf v2 — Spotify home shelf primitives:
 *   • Shelf      — section with 22px bold header + horizontal rail
 *   • ShelfCard  — full-radius cover card with title/subtitle
 *   • ShelfCardWide — rectangle (playlist-ish) card variant
 */

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radius, spacing } from '../theme';
import { Artwork } from './Artwork';
import { PressableScale } from './PressableScale';

export function ShelfCard({
  title,
  subtitle,
  artwork,
  seed,
  onPress,
  size = 140,
  round = true,
  badge,
}: {
  title: string;
  subtitle?: string;
  artwork?: string;
  seed: string;
  onPress: () => void;
  size?: number;
  round?: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <PressableScale onPress={onPress} style={{ width: size, gap: 10 }} haptic>
      <View>
        <Artwork uri={artwork} seed={seed} size={size} variant={round ? 'card' : 'rounded'} />
        {badge}
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.cardSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

export function Shelf({
  title,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.shelf}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        {actionLabel && onAction ? (
          <Pressable onPress={onAction} hitSlop={8}>
            <Text style={styles.headerAction}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroller}
        overScrollMode="always"
      >
        {children}
      </ScrollView>
    </View>
  );
}

/** Home shortcut tile — Spotify's compact art+label chip grid. */
export function QuickTile({
  title,
  artwork,
  seed,
  onPress,
  width,
  icon,
}: {
  title: string;
  artwork?: string;
  seed: string;
  onPress: () => void;
  width: number;
  /** When set, renders a gradient + icon tile (e.g. Liked Songs). */
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <PressableScale onPress={onPress} haptic style={[styles.quickTile, { width }]}>
      {icon && !artwork ? (
        <LinearGradient
          colors={['#4D2B8F', '#7C4DFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.quickIconWrap}
        >
          <Ionicons name={icon} size={22} color="#fff" />
        </LinearGradient>
      ) : (
        <Artwork uri={artwork} seed={seed} size={56} variant="rounded" style={styles.quickArt} />
      )}
      <Text style={styles.quickTitle} numberOfLines={2}>
        {title}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  shelf: { gap: 6, marginBottom: spacing.lg + 6 },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    letterSpacing: -0.3,
  },
  headerAction: {
    color: colors.textFaint,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
  scroller: { paddingHorizontal: spacing.lg, gap: spacing.md + 2 },
  cardTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
  cardSubtitle: {
    color: colors.textDim,
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: 2,
    lineHeight: 15,
  },
  textWrap: { gap: 1, paddingRight: 2 },
  quickTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 5,
    overflow: 'hidden',
    height: 62,
  },
  quickArt: { borderRadius: 0, marginLeft: 6 },
  quickIconWrap: {
    width: 56,
    height: '100%',
    marginLeft: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: fonts.bold,
    paddingHorizontal: 10,
    lineHeight: 16,
  },
});
