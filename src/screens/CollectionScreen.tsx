/**
 * Collection — authentic Spotify album/playlist detail page:
 *   artwork-tinted gradient header · big centered cover · centered bold
 *   title + meta · Spotify action row (heart, download, dots — shuffle +
 *   green play FAB right) · track rows. Lazy-resolves tracks when the
 *   route carries none: kind 'chart' → JioSaavn playlist,
 *   kind 'search' → clean search.
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { getAlbumTracks, getCollectionTracks, searchSaavnClean } from '../api/saavn';
import { usePlayer } from '../player/PlayerProvider';
import { TrackRow } from '../components/TrackRow';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { TrackMenu } from '../components/TrackMenu';
import { useToast } from '../components/Toast';
import { colors, fonts, radius, spacing } from '../theme';
import { useTrackPalette } from '../theme/DynamicThemeProvider';
import type { RootStackParamList } from './navigation';

export function CollectionScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Collection'>>();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const { playQueue } = usePlayer();
  const { collection, tracks: routeTracks } = route.params;

  const [tracks, setTracks] = useState<Track[] | null>(routeTracks ?? null);
  const [loading, setLoading] = useState(
    !routeTracks && !!(collection.kind === 'chart' || collection.kind === 'search' || collection.kind === 'album'),
  );
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
        } else if (collection.kind === 'album') {
          list = await getAlbumTracks(collection.id);
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
  const isLiked = collection.title === 'Liked Songs';
  // every collection wears its own artwork's colors (Spotify-style tint)
  const palette = useTrackPalette(isLiked ? undefined : heroArt, collection.id);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Spotify's tinted header wash: album color melting into #121212 */}
      <LinearGradient
        colors={[isLiked ? '#450AF5' : palette.wash, '#121212']}
        locations={[0, 0.85]}
        style={styles.headerWash}
        pointerEvents="none"
      />
      <View style={styles.topBar}>
        <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.topLabel} numberOfLines={1}>
          {collection.subtitle ?? ''}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={tracks ?? []}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingBottom: 170, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <View style={styles.artWrap}>
              {isLiked ? (
                <Artwork seed="liked" size={204} liked variant="card" style={styles.art} />
              ) : (
                <Artwork
                  uri={heroArt}
                  seed={collection.id}
                  size={204}
                  variant="card"
                  style={styles.art}
                />
              )}
            </View>
            <Text style={styles.title}>{collection.title}</Text>
            <Text style={styles.sub}>
              {tracks ? `${tracks.length} songs · 320 kbps` : 'Loading…'}
            </Text>

            {/* Spotify action row */}
            {tracks && tracks.length ? (
              <View style={styles.actions}>
                <View style={styles.actionLeft}>
                  <PressableScale
                    hitSlop={8}
                    haptic
                    onPress={() => toast.show({ message: 'Added to Your Library', icon: 'heart' })}
                  >
                    <Ionicons name="heart-outline" size={26} color={colors.text} />
                  </PressableScale>
                  <PressableScale
                    hitSlop={8}
                    haptic
                    onPress={() => toast.show({ message: 'Downloading playlist…', icon: 'arrow-down-circle-outline' })}
                  >
                    <Ionicons name="arrow-down-circle-outline" size={26} color={colors.text} />
                  </PressableScale>
                </View>
                <View style={styles.actionRight}>
                  <PressableScale hitSlop={8} haptic onPress={playShuffled}>
                    <Ionicons name="shuffle" size={26} color={colors.text} />
                  </PressableScale>
                  <PressableScale haptic onPress={() => play(0)} style={styles.playFab}>
                    <Ionicons name="play" size={26} color={colors.black} style={{ marginLeft: 2 }} />
                  </PressableScale>
                </View>
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
  headerWash: {
    ...StyleSheet.absoluteFillObject,
    bottom: '58%',
  },
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
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  artWrap: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  art: {},
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    fontFamily: fonts.bold,
    textAlign: 'center',
    letterSpacing: -0.4,
    marginTop: spacing.sm,
  },
  sub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: spacing.sm,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  actionRight: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  playFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentBright, // Spotify CTA green
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  loadingWrap: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  failedText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular, textAlign: 'center' },
});
