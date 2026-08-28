import React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Collection, Track } from '../types';
import { usePlayer } from '../player/PlayerProvider';
import { TrackRow } from '../components/TrackRow';
import { Artwork } from '../components/Artwork';
import { colors, spacing, radius, type as typo } from '../theme';
import type { RootStackParamList } from './navigation';

export function CollectionScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Collection'>>();
  const insets = useSafeAreaInsets();
  const { playQueue } = usePlayer();
  const { collection, tracks } = route.params;

  const play = (index: number) => {
    playQueue(tracks, index);
    nav.navigate('Player');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {collection.title}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(t) => t.id}
        renderItem={({ item, index }) => <TrackRow track={item} index={index} onPress={() => play(index)} />}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Artwork uri={collection.artwork} seed={collection.id} size={168} />
            <Text style={styles.collectionTitle}>{collection.title}</Text>
            <Text style={styles.collectionSub}>
              {collection.subtitle ?? 'JioSaavn'} · {tracks.length} songs · 320 kbps
            </Text>
            <Pressable style={styles.playBtn} onPress={() => play(0)}>
              <Ionicons name="play" size={20} color="#06130B" />
              <Text style={styles.playBtnText}>Play</Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  topTitle: { color: colors.text, fontSize: typo.body, fontWeight: '700', flex: 1, textAlign: 'center' },
  headerCard: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  collectionTitle: {
    color: colors.text,
    fontSize: typo.title,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  collectionSub: { color: colors.textDim, fontSize: typo.caption },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.xs,
  },
  playBtnText: { color: '#06130B', fontSize: typo.body, fontWeight: '800' },
});
