import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, radius, type as typo } from '../theme';
import { Artwork } from './Artwork';

export function ShelfCard({
  title,
  subtitle,
  artwork,
  seed,
  onPress,
  size = 140,
}: {
  title: string;
  subtitle?: string;
  artwork?: string;
  seed: string;
  onPress: () => void;
  size?: number;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, { width: size }, pressed && { opacity: 0.8 }]}>
      <Artwork uri={artwork} seed={seed} size={size} style={styles.art} />
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
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
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shelf: { gap: spacing.md, marginBottom: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    color: colors.text,
    fontSize: typo.headline,
    fontWeight: '800',
  },
  headerAction: { color: colors.textFaint, fontSize: typo.caption, fontWeight: '600' },
  scroller: { paddingHorizontal: spacing.lg, gap: spacing.md },
  card: { gap: spacing.sm },
  art: { borderRadius: radius.md },
  textWrap: { gap: 2, paddingRight: spacing.xs },
  title: { color: colors.text, fontSize: typo.caption, fontWeight: '600' },
  subtitle: { color: colors.textDim, fontSize: typo.micro },
});
