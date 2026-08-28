/**
 * Home — authentic Spotify Android home architecture:
 *
 *   filter chips (All / Music / AI — green active) + profile avatar →
 *   2-column quick-shortcut grid (#2A2A2A tiles) → Made for you (AI Daily
 *   Mixes + create-with-AI card) → Jump back in (recents) → Trending now
 *   (safety-filtered) → Because you listened (artist radios) → charts.
 *
 * Everything algorithmic passes the content-safety filter, so nothing
 * explicit ever lands on this screen uninvited.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Collection, DailyMix, Track } from '../types';
import {
  collectionIsClean,
  getCharts,
  getCollectionTracks,
  getTrending,
} from '../api/saavn';
import { getBecauseYouListened, getDailyMixes } from '../ai/engine';
import { getChartsCache, getFavorites, getRecents, setChartsCache } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { QuickTile, Shelf, ShelfCard } from '../components/Shelf';
import { ShelfSkeleton } from '../components/ShelfSkeleton';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import { useTrackPalette } from '../theme/DynamicThemeProvider';
import type { RootStackParamList } from './navigation';

type Chip = 'all' | 'music' | 'ai';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue, contextId, isPlaying } = usePlayer();
  const [chip, setChip] = useState<Chip>('all');

  const [mixes, setMixes] = useState<DailyMix[] | null>(null);
  const [trending, setTrending] = useState<Track[] | null>(null);
  const [because, setBecause] = useState<Array<{ artist: string; seedTrack?: Track }>>([]);
  const [charts, setCharts] = useState<Collection[]>([]);
  const [recents, setRecents] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);

  const play = useCallback(
    (tracks: Track[], index: number, ctxId?: string) => {
      if (tracks.length) {
        playQueue(tracks, index, ctxId);
        nav.navigate('Player');
      }
    },
    [playQueue, nav],
  );

  const openTrackCollection = useCallback(
    (title: string, tracks: Track[], ctxId?: string) => {
      nav.navigate('Collection', {
        collection: { id: ctxId ?? `local-${title}`, title, artwork: tracks[0]?.artwork ?? '' },
        tracks,
      });
    },
    [nav],
  );

  const load = useCallback(async (force = false) => {
    const [rec, favs] = await Promise.all([getRecents(), getFavorites()]);
    setRecents(rec);
    setFavorites(favs);

    if (!force) {
      const cached = await getChartsCache();
      if (cached && cached.length) setCharts(cached.map((s) => s.collection));
    }

    // AI surfaces first — they personalize the whole screen.
    getDailyMixes()
      .then(setMixes)
      .catch(() => setMixes([]));
    getBecauseYouListened(2)
      .then(setBecause)
      .catch(() => setBecause([]));

    try {
      const [trend, chartList] = await Promise.all([
        getTrending(14).catch(() => [] as Track[]),
        getCharts().catch(() => [] as Collection[]),
      ]);
      if (trend.length) setTrending(trend);
      if (chartList.length) {
        const cleanCharts = chartList.filter(collectionIsClean);
        setCharts(cleanCharts);
        // Cache chart metadata for instant cold starts.
        getCollectionTracks(cleanCharts[0]?.id ?? '')
          .then((tracks) => {
            if (cleanCharts.length && tracks.length) {
              setChartsCache(cleanCharts.map((collection) => ({ collection, tracks: [] })));
            }
          })
          .catch(() => undefined);
      }
      setOffline(false);
      if (!trend.length && !chartList.length) setOffline(true);
    } catch {
      setOffline(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const hasMixes = !!mixes && mixes.length > 0;
  const loading = mixes === null && trending === null;
  const showAI = chip !== 'music'; // AI surfaces under All + AI chips

  // ── The signature Spotify gradient wash ─────────────────────────────
  // Repo: linear-gradient(180deg, pageColor 2%, #121212 11%) — the page
  // wears the color of its content. Source: first Daily Mix / trending /
  // recent artwork (falls back to the warm repo default rgb(66,32,35)).
  const washArtwork = useMemo(
    () => mixes?.[0]?.artwork || trending?.[0]?.artwork || recents[0]?.artwork,
    [mixes, trending, recents],
  );
  const washSeed = useMemo(
    () => mixes?.[0]?.id || trending?.[0]?.id || recents[0]?.id || 'home',
    [mixes, trending, recents],
  );
  const washPalette = useTrackPalette(washArtwork, washSeed);
  const washColor = washArtwork ? washPalette.wash : '#422023'; // repo default
  // reference geometry: black header, then a sharp color onset below it
  // fading across ~35% of the viewport
  const headerH = insets.top + 58;
  const washH = Math.round(globalHeight * 0.38);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* artwork-derived gradient wash — the Spotify signature.
          Black behind the header, full-strength color onset below it,
          then a long fade into #121212 (pixel-measured off the repo). */}
      <LinearGradient
        colors={[washColor, washColor, colors.bg]}
        locations={[0, 0.16, 1]}
        style={[styles.wash, { top: headerH, height: washH }]}
        pointerEvents="none"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 170 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              load(true).finally(() => setRefreshing(false));
            }}
            tintColor={colors.accentBright}
            colors={[colors.accentBright]}
          />
        }
      >
        {/* ── Header: filter chips + profile avatar (Spotify layout) ── */}
        <View style={styles.header}>
          <View style={styles.chipRow}>
            {(['all', 'music', 'ai'] as Chip[]).map((c) => (
              <PressableScale
                key={c}
                scaleTo={0.94}
                haptic
                onPress={() => setChip(c)}
                style={[styles.chip, chip === c && styles.chipActive]}
              >
                <Text style={[styles.chipText, chip === c && styles.chipTextActive]}>
                  {c === 'all' ? 'All' : c === 'music' ? 'Music' : 'AI'}
                </Text>
              </PressableScale>
            ))}
          </View>
          <PressableScale
            scaleTo={0.92}
            haptic
            onPress={() => nav.navigate('Stats')}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>T</Text>
          </PressableScale>
        </View>

        {offline ? (
          <View style={styles.offlineChip}>
            <Ionicons name="cloud-offline-outline" size={13} color={colors.textDim} />
            <Text style={styles.offlineText}>Offline — pull to retry</Text>
          </View>
        ) : null}

        {/* ── Quick shortcuts — translucent tiles on the gradient wash ── */}
        {(favorites.length > 0 || recents.length > 0 || hasMixes) && (
          <View style={styles.quickGrid}>
            {favorites.length > 0 ? (
              <QuickTile
                title="Liked Songs"
                seed="liked-songs"
                width={quickTileWidth()}
                onPress={() => openTrackCollection('Liked Songs', favorites)}
                liked
              />
            ) : null}
            {hasMixes ? (
              <QuickTile
                title={mixes![0].title}
                artwork={mixes![0].artwork}
                seed={mixes![0].id}
                width={quickTileWidth()}
                onPress={() => openTrackCollection(mixes![0].title, mixes![0].tracks)}
              />
            ) : null}
            {trending && trending.length > 0 ? (
              <QuickTile
                title="Trending now"
                artwork={trending[0].artwork}
                seed="trending"
                width={quickTileWidth()}
                onPress={() => openTrackCollection('Trending now', trending)}
              />
            ) : null}
            {recents.length > 0 ? (
              <QuickTile
                title={recents[0].title}
                artwork={recents[0].artwork}
                seed={`recent-${recents[0].id}`}
                width={quickTileWidth()}
                onPress={() => play(recents, 0)}
              />
            ) : null}
          </View>
        )}

        {loading ? (
          <ShelfSkeleton />
        ) : (
          <>
            {/* ── Made for you (AI Daily Mixes) ───────────────────────── */}
            {hasMixes && showAI ? (
              <Shelf title="Made for you">
                {mixes!.map((mix) => (
                  <ShelfCard
                    key={mix.id}
                    title={mix.title}
                    subtitle={mix.subtitle}
                    artwork={mix.artwork}
                    seed={mix.id}
                    size={150}
                    isPlayingContext={contextId === `mix-${mix.id}`}
                    isPaused={!isPlaying}
                    onPress={() => openTrackCollection(mix.title, mix.tracks, `mix-${mix.id}`)}
                  />
                ))}
                <AICreateCard onPress={() => nav.navigate('AI')} />
              </Shelf>
            ) : null}

            {/* ── Jump back in ───────────────────────────────────────── */}
            {recents.length > 0 ? (
              <Shelf title="Jump back in">
                {recents.slice(0, 10).map((t) => (
                  <ShelfCard
                    key={t.id}
                    title={t.title}
                    subtitle={t.artist}
                    artwork={t.artwork}
                    seed={t.id}
                    size={150}
                    onPress={() => play(recents, Math.max(0, recents.findIndex((r) => r.id === t.id)))}
                  />
                ))}
              </Shelf>
            ) : null}

            {/* ── Trending now ───────────────────────────────────────── */}
            {trending && trending.length > 0 ? (
              <Shelf
                title="Trending now"
                actionLabel="Show all"
                onAction={() => openTrackCollection('Trending now', trending)}
              >
                {trending.slice(0, 10).map((t) => (
                  <ShelfCard
                    key={t.id}
                    title={t.title}
                    subtitle={t.artist}
                    artwork={t.artwork}
                    seed={t.id}
                    size={150}
                    isPlayingContext={contextId === 'trending'}
                    isPaused={!isPlaying}
                    onPress={() =>
                      play(
                        trending,
                        Math.max(0, trending.findIndex((x) => x.id === t.id)),
                        'trending',
                      )
                    }
                  />
                ))}
              </Shelf>
            ) : null}

            {/* ── Because you listened ───────────────────────────────── */}
            {because.map(({ artist }) => (
              <Shelf key={artist} title={`Because you listened to ${artist}`}>
                <ArtistRadioCard
                  artist={artist}
                  onPress={() =>
                    nav.navigate('Collection', {
                      collection: {
                        id: `artist-${artist}`,
                        title: artist,
                        subtitle: 'Artist radio',
                        artwork: '',
                        kind: 'search',
                        query: artist,
                      },
                    })
                  }
                />
              </Shelf>
            ))}

            {/* ── Popular charts ─────────────────────────────────────── */}
            {charts.length > 0 ? (
              <Shelf title="Popular charts">
                {charts.map((c) => (
                  <ShelfCard
                    key={c.id}
                    title={c.title}
                    subtitle={c.subtitle}
                    artwork={c.artwork}
                    seed={c.id}
                    size={150}
                    onPress={() => nav.navigate('Collection', { collection: c })}
                  />
                ))}
              </Shelf>
            ) : null}

            {!hasMixes && recents.length === 0 && (!trending || trending.length === 0) ? (
              <EmptyHome onGoAI={() => nav.navigate('AI')} />
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// Screen width is fixed per device; approximated via Dimensions at module
// scope for the grid math without re-render churn.
const globalWidth = Dimensions.get('window').width;
const globalHeight = Dimensions.get('window').height;

function quickTileWidth(): number {
  // two columns with 8px gutters inside 16px screen padding
  return Math.floor((globalWidth - 32 - 8) / 2);
}

/** Artist radio card — opens a search collection (Spotify artist-card style). */
function ArtistRadioCard({ artist, onPress }: { artist: string; onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} haptic style={{ width: 150, gap: 8 }}>
      <View style={styles.artistCard}>
        <Ionicons name="radio-outline" size={26} color={colors.textDim} />
      </View>
      <View style={{ gap: 2 }}>
        <Text style={styles.artistName} numberOfLines={2}>
          {artist}
        </Text>
        <Text style={styles.artistSub}>Artist radio</Text>
      </View>
    </PressableScale>
  );
}

/** The "create with AI" card capping the Made-for-you rail. */
function AICreateCard({ onPress }: { onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} haptic style={{ width: 150, gap: 8 }}>
      <View style={styles.aiCard}>
        <Ionicons name="sparkles" size={30} color="#fff" />
      </View>
      <View style={{ gap: 2 }}>
        <Text style={styles.aiCardTitle}>Create with AI</Text>
        <Text style={styles.aiCardSub}>Describe your vibe</Text>
      </View>
    </PressableScale>
  );
}

function EmptyHome({ onGoAI }: { onGoAI: () => void }) {
  return (
    <View style={styles.empty}>
      <Ionicons name="musical-notes-outline" size={52} color={colors.textFaint} />
      <Text style={styles.emptyTitle}>Your home, your music</Text>
      <Text style={styles.emptySub}>
        Search for something you love — TSF learns your taste and builds mixes, radios and
        recommendations just for you.
      </Text>
      <PressableScale onPress={onGoAI} haptic style={styles.emptyBtn}>
        <Ionicons name="sparkles" size={17} color="#fff" />
        <Text style={styles.emptyBtnText}>Generate a playlist with AI</Text>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  wash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    // repo .chip span: hsla(0,0%,100%,.1), 12px inline padding, 32px height
    backgroundColor: colors.chipInactiveBg,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipActive: { backgroundColor: colors.chipActiveBg }, // repo: white pill
  chipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  chipTextActive: { color: colors.chipActiveText }, // near-black on white
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#535353',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.text, fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold },
  offlineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  offlineText: { color: colors.textDim, fontSize: 11, fontWeight: '600', fontFamily: fonts.semibold },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  artistCard: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistName: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: fonts.bold,
    lineHeight: 17,
  },
  artistSub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  aiCard: {
    width: 150,
    height: 150,
    borderRadius: radius.lg,
    backgroundColor: colors.aiStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCardTitle: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  aiCardSub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  empty: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xxl,
    paddingTop: spacing.xxl + 12,
  },
  emptyTitle: { color: colors.text, fontSize: 19, fontWeight: '800', fontFamily: fonts.extrabold },
  emptySub: {
    color: colors.textDim,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: fonts.regular,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: 13,
    marginTop: spacing.sm,
  },
  emptyBtnText: { color: colors.accentDeep, fontSize: 14, fontWeight: '800', fontFamily: fonts.bold },
});
