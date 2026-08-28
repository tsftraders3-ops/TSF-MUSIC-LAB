/**
 * Shelf — repo-faithful Spotify home primitives
 * (reference: francoborrelli/spotify-react-web-client):
 *
 *   • Shelf       — section: bold header, "Show all" link, horizontal rail
 *   • ShelfCard   — square cover (5px radius) + bold title + dim subtitle;
 *                   green #1ED760 play FAB (40px, soft shadow) fades in over
 *                   the artwork's bottom-right when this card's context is
 *                   the one playing — exactly the repo's .circle-play-div.
 *   • QuickTile   — the home shortcut: translucent 11%-white tile sitting on
 *                   the artwork-derived gradient wash (repo .horizontal-
 *                   playlist: hsla(0,0%,100%,.1), 6px radius, bold label).
 */

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, spacing } from '../theme';
import { Artwork } from './Artwork';
import { PressableScale } from './PressableScale';

export function ShelfCard({
  title,
  subtitle,
  artwork,
  seed,
  onPress,
  onLongPress,
  size = 150,
  round = false,
  badge,
  subtitleMaxLines = 2,
  isPlayingContext = false,
  isPaused = false,
}: {
  title: string;
  subtitle?: string;
  artwork?: string;
  seed: string;
  onPress: () => void;
  onLongPress?: () => void;
  size?: number;
  /** artist round covers */
  round?: boolean;
  badge?: React.ReactNode;
  subtitleMaxLines?: number;
  /** this card is the currently-playing context → show the green play FAB */
  isPlayingContext?: boolean;
  isPaused?: boolean;
}) {
  return (
    <PressableScale
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ width: size, gap: 8 }}
      haptic
    >
      <View>
        <Artwork uri={artwork} seed={seed} size={size} variant={round ? 'circle' : 'card'} />
        {badge}
        {isPlayingContext ? <PlayFab size={40} paused={!!isPaused} /> : null}
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.cardSubtitle} numberOfLines={subtitleMaxLines}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

/** Repo CirclePlay: #1ED760 circle, black glyph, 0 8px 8px rgba(0,0,0,.3). */
export function PlayFab({
  size = 40,
  paused = false,
  onPress,
}: {
  size?: number;
  paused?: boolean;
  onPress?: () => void;
}) {
  const glyphSize = Math.round(size * 0.45);
  const body = (
    <View style={[styles.fab, { width: size, height: size, borderRadius: size / 2 }]}>
      {paused ? (
        <Ionicons name="play" size={glyphSize} color={colors.black} style={{ marginLeft: 2 }} />
      ) : (
        <View style={styles.fabBars}>
          <View style={[styles.fabBar, { height: glyphSize * 0.55 }]} />
          <View style={[styles.fabBar, { height: glyphSize }]} />
          <View style={[styles.fabBar, { height: glyphSize * 0.4 }]} />
        </View>
      )}
    </View>
  );
  if (!onPress)
    return (
      <View style={[styles.fabWrap, { width: size, height: size }]} pointerEvents="none">
        {body}
      </View>
    );
  return (
    <Pressable onPress={onPress} hitSlop={6} style={[styles.fabWrap, { width: size, height: size }]}>
      {body}
    </Pressable>
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

/**
 * QuickTile — repo .horizontal-playlist: 10% white on the gradient wash,
 * 6px radius, square art flush-left, one bold white label (2 lines).
 */
export function QuickTile({
  title,
  subtitle,
  artwork,
  seed,
  onPress,
  width,
  icon,
  liked = false,
}: {
  title: string;
  subtitle?: string;
  artwork?: string;
  seed: string;
  onPress: () => void;
  width: number;
  /** gradient icon tile (e.g. AI) */
  icon?: keyof typeof Ionicons.glyphMap;
  liked?: boolean;
}) {
  return (
    <PressableScale
      onPress={onPress}
      scaleTo={0.97}
      haptic
      style={[styles.quickTile, { width }]}
    >
      {icon ? (
        <View style={styles.quickIconTile}>
          <Ionicons name={icon} size={24} color="#FFFFFF" />
        </View>
      ) : (
        <Artwork
          uri={artwork}
          seed={seed}
          size={54}
          variant="card"
          liked={liked}
          style={styles.quickArt}
        />
      )}
      <View style={styles.quickText}>
        <Text style={styles.quickTitle} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.quickSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  shelf: { gap: 12, marginBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  headerAction: {
    color: colors.textDim,
    fontSize: 13,
    fontWeight: '400',
    fontFamily: fonts.regular,
  },
  scroller: { paddingHorizontal: spacing.lg, gap: spacing.md },
  cardTitle: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: fonts.bold,
    lineHeight: 17,
  },
  cardSubtitle: {
    color: colors.textDim,
    fontSize: 13,
    fontFamily: fonts.regular,
    marginTop: 2,
    lineHeight: 16,
  },
  textWrap: { gap: 2, paddingRight: 2 },
  fab: {
    backgroundColor: colors.fabGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  fabWrap: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  fabBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 2.5, height: 16 },
  fabBar: { width: 3, borderRadius: 1.5, backgroundColor: colors.black },
  quickTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.chipInactiveBg, // 10% white on the gradient wash
    borderRadius: 6,
    overflow: 'hidden',
    height: 54,
  },
  quickArt: {},
  quickIconTile: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.aiStart,
  },
  quickText: { flex: 1, paddingHorizontal: 10, paddingRight: 8 },
  quickTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: fonts.bold,
    lineHeight: 16,
  },
  quickSubtitle: {
    color: colors.textDim,
    fontSize: 11,
    fontFamily: fonts.regular,
    marginTop: 1,
  },
});
