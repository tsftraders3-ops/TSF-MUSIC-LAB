/**
 * Home — authentic Spotify Android home architecture:
 *
 *   profile avatar (far left) + filter chips (All / Music / AI — green
 *   active pill w/ black text) → 8-tile 2-column quick-shortcut grid
 *   (#2A2A2A, 56px, art flush-left) → Made for you (AI Daily Mixes +
 *   create-with-AI card) → Jump back in (recents, "Album • Artist"
 *   subtitles) → Trending now (safety-filtered) → Because you listened
 *   (artist radios) → charts.
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
import type { Collection, DailyMix, Track } from '../types';
import {
  collectionIsClean,
  getCharts,
  getCollectionTracks,
  getTrending,
} from '../api/saavn';
import { getBecauseYouListened, getDailyMixes } from '../ai/engine';
import { mindbeat } from '../ai/mindbeat';
import type { NowSoundCard } from '../ai/surfaces/daylist';
import type { OnTheRiseCard } from '../ai/surfaces/ontherise';
import { getChartsCache, getFavorites, getRecents, setChartsCache } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { QuickTile, Shelf, ShelfCard } from '../components/Shelf';
import { ShelfSkeleton } from '../components/ShelfSkeleton';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

type Chip = 'all' | 'music' | 'ai';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const [chip, setChip] = useState<Chip>('all');

  const [mixes, setMixes] = useState<DailyMix[] | null>(null);
  const [trending, setTrending] = useState<Track[] | null>(null);
  const [because, setBecause] = useState<Array<{ artist: string; seedTrack?: Track }>>([]);
  const [charts, setCharts] = useState<Collection[]>([]);
  const [recents, setRecents] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [nowSound, setNowSound] = useState<NowSoundCard | null>(null);
  const [onTheRise, setOnTheRise] = useState<OnTheRiseCard | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);
  const [userName, setUserName] = useState('');

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
    // MINDBEAT surfaces (Mixes v2 / Now Sound / On the Rise) with the v2.1
    // engine as the graceful fallback (ladder §10.4).
    mindbeat
      .dailyMixes()
      .then((v2) => (v2.length ? setMixes(v2) : getDailyMixes().then(setMixes)))
      .catch(() => getDailyMixes().then(setMixes).catch(() => setMixes([])));
    getBecauseYouListened(2)
      .then(setBecause)
      .catch(() => setBecause([]));
    mindbeat.nowSound().then(setNowSound).catch(() => undefined);
    mindbeat.onTheRise().then(setOnTheRise).catch(() => undefined);

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

  // First name → "Made for {name}" (desktop-Spotify behaviour; falls back to
  // "Made for you" when unset). The profile-change subscription covers the
  // exact moment onboarding completes (seeding triggers a rebuild).
  useEffect(() => {
    mindbeat
      .kvGet<string>('userName')
      .then((n) => n && setUserName(n))
      .catch(() => undefined);
    return mindbeat.onProfile(() => {
      mindbeat
        .kvGet<string>('userName')
        .then((n) => setUserName(n ?? ''))
        .catch(() => undefined);
    });
  }, []);

  const hasMixes = !!mixes && mixes.length > 0;
  const loading = mixes === null && trending === null;
  const showAI = chip !== 'music'; // AI surfaces under All + AI chips

  /* Spotify's 8-tile shortcut grid: pinned first (Liked Songs), then
   * mixes, trending, recents, and the AI tile filling slot 8. */
  const quickTiles: Array<{
    title: string;
    subtitle?: string;
    artwork?: string;
    seed: string;
    icon?: keyof typeof Ionicons.glyphMap;
    liked?: boolean;
    onPress: () => void;
  }> = [];
  if (favorites.length > 0)
    quickTiles.push({
      title: 'Liked Songs',
      seed: 'liked-songs',
      liked: true,
      onPress: () => openTrackCollection('Liked Songs', favorites),
    });
  if (hasMixes)
    mixes!.slice(0, 2).forEach((m) =>
      quickTiles.push({
        title: m.title,
        artwork: m.artwork,
        seed: m.id,
        onPress: () => openTrackCollection(m.title, m.tracks),
      }),
    );
  if (trending && trending.length > 0)
    quickTiles.push({
      title: 'Trending now',
      subtitle: 'Hot hits',
      artwork: trending[0].artwork,
      seed: 'trending',
      onPress: () => openTrackCollection('Trending now', trending),
    });
  recents.slice(0, 3).forEach((t) =>
    quickTiles.push({
      title: t.title,
      artwork: t.artwork,
      seed: `recent-${t.id}`,
      onPress: () => play(recents, Math.max(0, recents.findIndex((r) => r.id === t.id))),
    }),
  );
  if (quickTiles.length > 0)
    quickTiles.push({
      title: 'Create with AI',
      seed: 'ai-tile',
      icon: 'sparkles',
      onPress: () => nav.navigate('AI'),
    });
  const quickTileList = quickTiles.slice(0, 8);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
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
        {/* ── Header: avatar far-left + chips (genuine Spotify order) ── */}
        <View style={styles.header}>
          <PressableScale
            scaleTo={0.92}
            haptic
            onPress={() => nav.navigate('Stats')}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>T</Text>
          </PressableScale>
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
        </View>

        {offline ? (
          <View style={styles.offlineChip}>
            <Ionicons name="cloud-offline-outline" size={13} color={colors.textDim} />
            <Text style={styles.offlineText}>Offline — pull to retry</Text>
          </View>
        ) : null}

        {/* ── Quick shortcuts — Spotify 8-tile grid, #2A2A2A ──────────── */}
        {quickTileList.length > 0 && (
          <View style={styles.quickGrid}>
            {quickTileList.map((t) => (
              <QuickTile
                key={t.seed}
                title={t.title}
                subtitle={t.subtitle}
                artwork={t.artwork}
                seed={t.seed}
                icon={t.icon}
                liked={t.liked}
                width={quickTileWidth()}
                onPress={t.onPress}
              />
            ))}
          </View>
        )}

        {loading ? (
          <ShelfSkeleton />
        ) : (
          <>
            {/* ── Now Sound (daylist §9.4) — the time-aware shelf ─────── */}
            {nowSound && nowSound.tracks.length > 0 && showAI ? (
              <Shelf title="Now Sound">
                <ShelfCard
                  title={nowSound.title}
                  subtitle={nowSound.subtitle}
                  artwork={nowSound.tracks[0]?.artwork ?? ''}
                  seed={nowSound.id}
                  size={150}
                  onPress={() =>
                    openTrackCollection(nowSound.title, nowSound.tracks as unknown as Track[])
                  }
                />
                <AICreateCard onPress={() => nav.navigate('AI')} />
              </Shelf>
            ) : null}

            {/* ── Made for you / Made for {name} (AI Daily Mixes) ────── */}
            {hasMixes && showAI ? (
              <Shelf title={userName ? `Made for ${userName}` : 'Made for you'}>
                {mixes!.map((mix) => (
                  <ShelfCard
                    key={mix.id}
                    title={mix.title}
                    subtitle={mix.subtitle}
                    artwork={mix.artwork}
                    seed={mix.id}
                    size={150}
                    onPress={() => openTrackCollection(mix.title, mix.tracks)}
                  />
                ))}
                <AICreateCard onPress={() => nav.navigate('AI')} />
              </Shelf>
            ) : null}

            {/* ── On the Rise (§9.6) — the weekly discovery flagship ──── */}
            {onTheRise && onTheRise.tracks.length > 2 && showAI ? (
              <Shelf title="On the Rise">
                {onTheRise.tracks.slice(0, 10).map((t) => (
                  <ShelfCard
                    key={t.id}
                    title={t.title}
                    subtitle={`via ${t.viaArtist}`}
                    artwork={t.artwork}
                    seed={`rise-${t.id}`}
                    size={150}
                    onPress={() =>
                      openTrackCollection('On the Rise', onTheRise.tracks as unknown as Track[])
                    }
                  />
                ))}
              </Shelf>
            ) : null}

            {/* ── Jump back in ───────────────────────────────────────── */}
            {recents.length > 0 ? (
              <Shelf title="Jump back in">
                {recents.slice(0, 10).map((t) => (
                  <ShelfCard
                    key={t.id}
                    title={t.title}
                    subtitle={t.album ? `Album · ${t.artist}` : t.artist}
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
                    subtitle={t.album ? `Album · ${t.artist}` : t.artist}
                    artwork={t.artwork}
                    seed={t.id}
                    size={150}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    backgroundColor: colors.chipInactiveBg, // current Spotify inactive chip
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipActive: { backgroundColor: colors.chipActiveBg }, // green pill (pixel-verified on real Spotify)
  chipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  chipTextActive: { color: colors.chipActiveText }, // black on green (genuine)
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#535353',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.text, fontSize: 15, fontWeight: '700', fontFamily: fonts.bold },
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
