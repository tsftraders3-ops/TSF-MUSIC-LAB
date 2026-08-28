/**
 * Collection v2 — generic detail page for charts, genre searches,
 * artist radios and local track lists (Liked Songs, Daily Mixes,
 * Trending). Lazy-resolves tracks when the route carries none:
 *   kind 'chart' → JioSaavn playlist, kind 'search' → clean search.
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { getCollectionTracks, searchSaavnClean } from '../api/saavn';
import { usePlayer } from '../player/PlayerProvider';
import { TrackRow } from '../components/TrackRow';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { TrackMenu } from '../components/TrackMenu';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

export function CollectionScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Collection'>>();
  const insets = useSafeAreaInsets();
  const { playQueue } = usePlayer();
  const { collection, tracks: routeTracks } = route.params;

  const [tracks, setTracks] = useState<Track[] | null>(routeTracks ?? null);
  const [loading, setLoading] = useState(!routeTracks && !!(collection.kind === 'chart' || collection.kind === 'search'));
  const [failed, setFailed] = useState(false);
  const [menuTrack, setMenuTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (routeTracks) return;
    let cancelled = false;
    (async () => {
      try {
        let list: Track[] = [];
        if (collection.kind === 'chart') {
          list = await getCollectionTracks(collection.id);
        } else if (collection.kind === 'search' && collection.query) {
          list = await searchSaavnClean(collection.query, 40);
        }
        if (!cancelled) {
          setTracks(list);
          setFailed(list.length === 0);
        }
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [collection.id, collection.kind, collection.query, routeTracks]);

  const play = (index: number) => {
    if (tracks && tracks.length) {
      playQueue(tracks, index);
      nav.navigate('Player');
    }
  };

  const playShuffled = () => {
    if (!tracks?.length) return;
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    playQueue(shuffled, 0);
    nav.navigate('Player');
  };

  const heroArt = tracks?.[0]?.artwork || collection.artwork;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.topLabel} numberOfLines={1}>
          {collection.subtitle ?? 'Collection'}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={tracks ?? []}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingBottom: 160, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Artwork uri={heroArt} seed={collection.id} size={188} variant="rounded" />
            <Text style={styles.title}>{collection.title}</Text>
            <Text style={styles.sub}>
              {tracks ? `${tracks.length} songs · 320 kbps` : 'Loading…'}
            </Text>
            {tracks && tracks.length ? (
              <View style={styles.actions}>
                <PressableScale haptic style={styles.playBtn} onPress={() => play(0)}>
                  <Ionicons name="play" size={21} color={colors.accentDeep} />
                  <Text style={styles.playBtnText}>Play</Text>
                </PressableScale>
                <PressableScale haptic style={styles.shuffleBtn} onPress={playShuffled}>
                  <Ionicons name="shuffle" size={19} color={colors.text} />
                  <Text style={styles.shuffleBtnText}>Shuffle</Text>
                </PressableScale>
              </View>
            ) : null}
            {loading ? (
              <View style={styles.loadingWrap}>
                <ActivityIndicator size="large" color={colors.accentBright} />
              </View>
            ) : null}
            {failed && !loading ? (
              <View style={styles.loadingWrap}>
                <Ionicons name="cloud-offline-outline" size={38} color={colors.textFaint} />
                <Text style={styles.failedText}>Couldn't load this — check your connection</Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => (
          <TrackRow
            track={item}
            index={index}
            onPress={() => play(index)}
            onLongPress={() => setMenuTrack(item)}
          />
        )}
      />

      <TrackMenu track={menuTrack} visible={!!menuTrack} onClose={() => setMenuTrack(null)} />
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
  topLabel: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  headerCard: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    fontFamily: fonts.black,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  sub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.medium },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.accentBright,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: 12,
  },
  playBtnText: { color: colors.accentDeep, fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold },
  shuffleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg + 4,
    paddingVertical: 12,
  },
  shuffleBtnText: { color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  loadingWrap: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  failedText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular, textAlign: 'center' },
});
