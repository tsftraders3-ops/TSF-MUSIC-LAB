import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Collection, Track } from '../types';
import { getCharts, getCollectionTracks } from '../api/saavn';
import { getChartsCache, getRecents, setChartsCache } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { Shelf, ShelfCard } from '../components/Shelf';
import { ShelfSkeleton } from '../components/ShelfSkeleton';
import { colors, spacing, radius, type as typo } from '../theme';
import type { RootStackParamList } from './navigation';

interface ChartShelf {
  collection: Collection;
  tracks: Track[];
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const [shelves, setShelves] = useState<ChartShelf[] | null>(null);
  const [recents, setRecents] = useState<Track[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);

  const play = useCallback(
    (tracks: Track[], index: number) => {
      if (tracks.length) {
        playQueue(tracks, index);
        nav.navigate('Player');
      }
    },
    [playQueue, nav],
  );

  const load = useCallback(async (force = false) => {
    setRecents(await getRecents());
    if (!force) {
      const cached = await getChartsCache();
      if (cached && cached.length) {
        setShelves(cached);
        setOffline(false);
        return;
      }
    }
    try {
      const charts = await getCharts();
      const picks = charts.slice(0, 3);
      const loaded: ChartShelf[] = await Promise.all(
        picks.map(async (collection) => ({
          collection,
          tracks: await getCollectionTracks(collection.id).catch(() => [] as Track[]),
        })),
      );
      const usable = loaded.filter((s) => s.tracks.length > 0);
      if (usable.length) {
        setShelves(usable);
        setChartsCache(usable);
        setOffline(false);
      } else {
        // Network failed — fall back to stale cache so home is never blank.
        const stale = await getChartsCache(true);
        setShelves(stale && stale.length ? stale : (prev) => prev ?? []);
        setOffline(true);
      }
    } catch {
      const stale = await getChartsCache(true);
      setShelves(stale && stale.length ? stale : (prev) => prev ?? []);
      setOffline(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? 'Late night listening' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              load(true).finally(() => setRefreshing(false));
            }}
            tintColor={colors.accent}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.brand}>TSF Music</Text>
        </View>

        {offline && (
          <View style={styles.offlineChip}>
            <Ionicons name="cloud-offline-outline" size={13} color={colors.textDim} />
            <Text style={styles.offlineText}>Offline — showing saved charts. Pull to retry.</Text>
          </View>
        )}

        {recents.length > 0 && (
          <Shelf title="Jump back in">
            {recents.slice(0, 10).map((t) => (
              <ShelfCard
                key={t.id}
                title={t.title}
                subtitle={t.artist}
                artwork={t.artwork}
                seed={t.id}
                size={124}
                onPress={() => play(recents, Math.max(0, recents.findIndex((r) => r.id === t.id)))}
              />
            ))}
          </Shelf>
        )}

        {shelves == null ? (
          <ShelfSkeleton />
        ) : (
          shelves.map((shelf) => (
            <Shelf
              key={shelf.collection.id}
              title={shelf.collection.title}
              actionLabel="See all"
              onAction={() => nav.navigate('Collection', { collection: shelf.collection, tracks: shelf.tracks })}
            >
              {shelf.tracks.slice(0, 10).map((t) => (
                <ShelfCard
                  key={t.id}
                  title={t.title}
                  subtitle={t.artist}
                  artwork={t.artwork}
                  seed={t.id}
                  size={124}
                  onPress={() => play(shelf.tracks, Math.max(0, shelf.tracks.findIndex((x) => x.id === t.id)))}
                />
              ))}
            </Shelf>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: 2,
  },
  greeting: { color: colors.textDim, fontSize: typo.body, fontWeight: '600' },
  brand: { color: colors.text, fontSize: typo.hero, fontWeight: '800', letterSpacing: -0.5 },
  offlineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  offlineText: { color: colors.textDim, fontSize: typo.micro, fontWeight: '600' },
});
