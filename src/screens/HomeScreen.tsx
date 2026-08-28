/**
 * Home v2 — the full Spotify home architecture:
 *
 *   greeting header → quick-shortcut grid → Made For You (AI Daily Mixes
 *   + create-with-AI card) → Jump back in (recents) → Trending now
 *   (safety-filtered) → Because you listened (artist radios) →
 *   Popular charts.
 *
 * Everything algorithmic passes the content-safety filter, so nothing
 * explicit ever lands on this screen uninvited.
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
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
import { LinearGradient } from 'expo-linear-gradient';
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
import { Artwork } from '../components/Artwork';
import { ShelfSkeleton } from '../components/ShelfSkeleton';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import { useTrackPalette } from '../theme/DynamicThemeProvider';
import { withAlpha } from '../theme/dynamic';
import type { RootStackParamList } from './navigation';

interface ChartShelf {
  collection: Collection;
  tracks: Track[];
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();

  const [mixes, setMixes] = useState<DailyMix[] | null>(null);
  const [trending, setTrending] = useState<Track[] | null>(null);
  const [because, setBecause] = useState<Array<{ artist: string; seedTrack?: Track }>>([]);
  const [charts, setCharts] = useState<Collection[]>([]);
  const [recents, setRecents] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
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

  const openTrackCollection = useCallback(
    (title: string, tracks: Track[]) => {
      nav.navigate('Collection', {
        collection: { id: `local-${title}`, title, artwork: tracks[0]?.artwork ?? '' },
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

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? 'Late night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const hasMixes = !!mixes && mixes.length > 0;
  const loading = mixes === null && trending === null;
  const heroMix = hasMixes ? mixes![0] : null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 195 }}
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
        <View style={styles.header}>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>

        {offline ? (
          <View style={styles.offlineChip}>
            <Ionicons name="cloud-offline-outline" size={13} color={colors.textDim} />
            <Text style={styles.offlineText}>Offline — pull to retry</Text>
          </View>
        ) : null}

        {/* ── Quick shortcuts ─────────────────────────────────────────── */}
        {(favorites.length > 0 || recents.length > 0 || hasMixes) && (
          <View style={styles.quickGrid}>
            {hasMixes ? (
              <QuickTile
                title="Daily Mix 1"
                artwork={mixes![0].artwork}
                seed={mixes![0].id}
                width={quickTileWidth()}
                onPress={() => openTrackCollection('Daily Mix 1', mixes![0].tracks)}
              />
            ) : null}
            {favorites.length > 0 ? (
              <QuickTile
                title="Liked Songs"
                seed="liked-songs"
                width={quickTileWidth()}
                onPress={() => openTrackCollection('Liked Songs', favorites)}
                icon="heart"
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

        {/* ── Hero — your first Daily Mix, tinted by its own artwork ─── */}
        {heroMix ? <HeroMixCard mix={heroMix} onPress={() => openTrackCollection(heroMix.title, heroMix.tracks)} /> : null}

        {loading ? (
          <ShelfSkeleton />
        ) : (
          <>
            {/* ── Made for you (AI) ──────────────────────────────────── */}
            {hasMixes ? (
              <Shelf title="Made for you">
                {mixes!.map((mix) => (
                  <ShelfCard
                    key={mix.id}
                    title={mix.title}
                    subtitle={mix.subtitle}
                    artwork={mix.artwork}
                    seed={mix.id}
                    size={150}
                    round={false}
                    onPress={() => openTrackCollection(mix.title, mix.tracks)}
                  />
                ))}
                <AICreateCard onPress={() => nav.navigate('Tabs', { screen: 'AI' })} />
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
                    round={false}
                    onPress={() => play(recents, Math.max(0, recents.findIndex((r) => r.id === t.id)))}
                  />
                ))}
              </Shelf>
            ) : null}

            {/* ── Trending now ───────────────────────────────────────── */}
            {trending && trending.length > 0 ? (
              <Shelf
                title="Trending now"
                actionLabel="See all"
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
                    round={false}
                    onPress={() => play(trending, Math.max(0, trending.findIndex((x) => x.id === t.id)))}
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
                    round={false}
                    onPress={() => nav.navigate('Collection', { collection: c })}
                  />
                ))}
              </Shelf>
            ) : null}

            {!hasMixes && recents.length === 0 && (!trending || trending.length === 0) ? (
              <EmptyHome onGoAI={() => nav.navigate('Tabs', { screen: 'AI' })} />
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

function quickTileWidth(): number {
  // two columns with 8px gutters inside 16px screen padding
  return Math.floor((globalWidth - 32 - 8) / 2);
}

/** Artist radio card — gradient panel that opens a search collection. */
function ArtistRadioCard({ artist, onPress }: { artist: string; onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} haptic style={styles.artistCard}>
      <LinearGradient
        colors={[colors.aiStart, colors.aiMid, colors.aiEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.artistGradient}
      >
        <Ionicons name="radio-outline" size={22} color="rgba(255,255,255,0.9)" />
        <Text style={styles.artistName} numberOfLines={2}>
          {artist}
        </Text>
        <Text style={styles.artistSub}>Artist radio</Text>
      </LinearGradient>
    </PressableScale>
  );
}

/** The "create with AI" card capping the Made-for-you rail. */
function AICreateCard({ onPress }: { onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} haptic style={{ width: 150, gap: 10 }}>
      <LinearGradient
        colors={['#7C4DFF', '#4D6BFF', '#00E5FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aiCard}
      >
        <Ionicons name="sparkles" size={34} color="rgba(255,255,255,0.95)" />
        <Text style={styles.aiCardTitle}>Create with AI</Text>
      </LinearGradient>
      <View style={{ gap: 1 }}>
        <Text style={styles.aiCardSub}>Describe your vibe, get a playlist</Text>
      </View>
    </PressableScale>
  );
}

/**
 * HeroMixCard — the big lead card (inspo 5): a squircle tinted by the
 * mix's OWN artwork palette with a floating play FAB. Each day's mix
 * paints the hero differently.
 */
function HeroMixCard({ mix, onPress }: { mix: DailyMix; onPress: () => void }) {
  const palette = useTrackPalette(mix.artwork, mix.id);
  return (
    <PressableScale onPress={onPress} haptic style={styles.heroWrap}>
      <LinearGradient
        colors={[withAlpha(palette.deep, 0.92), withAlpha(palette.vibrant, 0.34)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroCard, { borderColor: withAlpha(palette.glow, 0.22) }]}
      >
        <Artwork uri={mix.artwork} seed={mix.id} size={78} variant="rounded" style={styles.heroArt} />
        <View style={styles.heroMeta}>
          <Text style={styles.heroKicker}>Made for you</Text>
          <Text style={styles.heroTitle} numberOfLines={1}>
            {mix.title}
          </Text>
          <Text style={styles.heroSub} numberOfLines={1}>
            {mix.subtitle}
          </Text>
        </View>
        <View
          style={[
            styles.heroPlay,
            { backgroundColor: palette.glow, shadowColor: palette.glow },
          ]}
        >
          <Ionicons name="play" size={24} color="#07080B" />
        </View>
      </LinearGradient>
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
  // transparent so the ambient backdrop (current song's palette) shows
  root: { flex: 1, backgroundColor: 'transparent' },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + 2,
    paddingBottom: spacing.lg,
  },
  greeting: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    letterSpacing: -0.4,
  },
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
    marginBottom: spacing.xl,
  },
  heroWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.squircle,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md + 2,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.squircle,
  },
  heroArt: { borderRadius: 14 },
  heroMeta: { flex: 1, gap: 2 },
  heroKicker: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    letterSpacing: -0.3,
  },
  heroSub: {
    color: colors.textDim,
    fontSize: 12.5,
    fontFamily: fonts.medium,
    marginTop: 2,
  },
  heroPlay: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  artistCard: { width: 150, height: 150, borderRadius: radius.squircle, overflow: 'hidden' },
  artistGradient: {
    width: '100%',
    height: '100%',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  artistName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    lineHeight: 20,
  },
  artistSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
  aiCard: {
    width: 150,
    height: 150,
    borderRadius: radius.squircle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  aiCardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
  },
  aiCardSub: {
    color: colors.textDim,
    fontSize: 12,
    fontFamily: fonts.regular,
    lineHeight: 15,
  },
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
