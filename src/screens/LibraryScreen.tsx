import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { usePlayer } from '../player/PlayerProvider';
import { getFavorites, getRecents } from '../storage/store';
import { verifyDownloads } from '../storage/downloads';
import { TrackRow } from '../components/TrackRow';
import { colors, spacing, radius, type as typo } from '../theme';
import type { RootStackParamList } from './navigation';

type Tab = 'favorites' | 'downloads' | 'recent';

export function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const [tab, setTab] = useState<Tab>('favorites');
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [downloads, setDownloads] = useState<Track[]>([]);
  const [recents, setRecents] = useState<Track[]>([]);

  const reload = useCallback(async () => {
    const [f, d, r] = await Promise.all([
      getFavorites(),
      verifyDownloads(),
      getRecents(),
    ]);
    setFavorites(f);
    setDownloads(d);
    setRecents(r);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Bottom-tabs keeps this screen mounted — refetch whenever it becomes
  // visible so favorites/downloads made elsewhere show up immediately.
  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload]),
  );

  const list = tab === 'favorites' ? favorites : tab === 'downloads' ? downloads : recents;

  const playAll = () => {
    if (list.length) {
      playQueue(list, 0);
      nav.navigate('Player');
    }
  };

  const emptyIcon =
    tab === 'favorites' ? 'heart-outline' : tab === 'downloads' ? 'arrow-down-circle-outline' : 'time-outline';
  const emptyText =
    tab === 'favorites'
      ? 'Tap the heart on any song to save it here'
      : tab === 'downloads'
        ? 'Download songs from the player to listen offline'
        : 'Songs you play will show up here';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
      </View>

      <View style={styles.tabs}>
        {(['favorites', 'downloads', 'recent'] as Tab[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tabPill, tab === t && styles.tabPillActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'favorites' ? `Favorites ${favorites.length ? favorites.length : ''}` : t === 'downloads' ? `Downloads ${downloads.length ? downloads.length : ''}` : 'Recent'}
            </Text>
          </Pressable>
        ))}
      </View>

      {list.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name={emptyIcon as keyof typeof Ionicons.glyphMap} size={48} color={colors.textFaint} />
          <Text style={styles.emptyTitle}>
            {tab === 'favorites' ? 'No favorites yet' : tab === 'downloads' ? 'No downloads yet' : 'Nothing played yet'}
          </Text>
          <Text style={styles.emptySub}>{emptyText}</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(t) => t.id}
          renderItem={({ item, index }) => (
            <TrackRow
              track={item}
              onPress={() => {
                playQueue(list, index);
                nav.navigate('Player');
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListHeaderComponent={
            <Pressable style={styles.playAllBtn} onPress={playAll}>
              <Ionicons name="play" size={18} color="#06130B" />
              <Text style={styles.playAllText}>Play all · {list.length} songs</Text>
            </Pressable>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  title: { color: colors.text, fontSize: typo.hero, fontWeight: '800', letterSpacing: -0.5 },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tabPill: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    backgroundColor: colors.card,
  },
  tabPillActive: { backgroundColor: colors.text },
  tabText: { color: colors.textDim, fontSize: typo.caption, fontWeight: '700' },
  tabTextActive: { color: colors.bg },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xxl },
  emptyTitle: { color: colors.text, fontSize: typo.headline, fontWeight: '700' },
  emptySub: { color: colors.textDim, fontSize: typo.caption, textAlign: 'center' },
  playAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  playAllText: { color: '#06130B', fontSize: typo.caption, fontWeight: '800' },
});
