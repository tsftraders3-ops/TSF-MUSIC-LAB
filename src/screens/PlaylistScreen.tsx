/**
 * PlaylistScreen — Spotify playlist detail: big cover, name, meta,
 * Play + Shuffle + heart rows, track list with per-track remove and the
 * long-press TrackMenu (play next / queue / add to other playlist).
 */

import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { Track } from '../types';
import { getPlaylists, removeTrackFromPlaylist } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { TrackRow } from '../components/TrackRow';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { TrackMenu } from '../components/TrackMenu';
import { useToast } from '../components/Toast';
import { colors, fonts, radius, spacing } from '../theme';
import { useTrackPalette } from '../theme/DynamicThemeProvider';
import type { RootStackParamList } from './navigation';

export function PlaylistScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Playlist'>>();
  const { playlistId } = route.params;
  const { playQueue } = usePlayer();
  const toast = useToast();

  const [menuTrack, setMenuTrack] = useState<Track | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  // Playlists are small — read from storage each render pass (cheap).
  const [playlist, setPlaylist] = React.useState<{
    id: string;
    name: string;
    tracks: Track[];
    aiGenerated?: boolean;
    prompt?: string;
  } | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    getPlaylists().then((list) => {
      if (cancelled) return;
      const pl = list.find((p) => p.id === playlistId) ?? null;
      setPlaylist(pl);
    });
    return () => {
      cancelled = true;
    };
  }, [playlistId, dataVersion]);

  const removeTrack = useCallback(
    async (trackId: string) => {
      await removeTrackFromPlaylist(playlistId, trackId);
      toast.show({ message: 'Removed from playlist', icon: 'remove-circle-outline' });
      setDataVersion((v) => v + 1);
    },
    [playlistId, toast],
  );

  if (!playlist) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.topBar}>
          <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </PressableScale>
          <View style={{ width: 26 }} />
        </View>
      </View>
    );
  }

  const play = (index: number) => {
    if (playlist.tracks.length) {
      playQueue(playlist.tracks, index);
      nav.navigate('Player');
    }
  };

  const playShuffled = () => {
    if (!playlist.tracks.length) return;
    const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5);
    playQueue(shuffled, 0);
    nav.navigate('Player');
  };

  // playlists wear their own cover's colors
  const palette = useTrackPalette(
    playlist.aiGenerated ? undefined : playlist.tracks[0]?.artwork,
    playlist.id,
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Spotify's tinted header wash: cover color melting into #121212 */}
      <LinearGradient
        colors={[playlist.aiGenerated ? '#7C4DFF' : palette.dominant, '#121212']}
        locations={[0, 0.85]}
        style={styles.headerWash}
        pointerEvents="none"
      />
      <View style={styles.topBar}>
        <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.topLabel}>Playlist</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={playlist.tracks}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingBottom: 160 }}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            {playlist.aiGenerated ? (
              <LinearGradient
                colors={[colors.aiStart, colors.aiMid, colors.aiEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiArt}
              >
                <Ionicons name="sparkles" size={44} color="#fff" />
              </LinearGradient>
            ) : (
              <View style={styles.artWrap}>
                <Artwork
                  uri={playlist.tracks[0]?.artwork}
                  seed={playlist.id}
                  size={204}
                  variant="card"
                  style={styles.art}
                />
              </View>
            )}
            <Text style={styles.name}>{playlist.name}</Text>
            <Text style={styles.meta}>
              Playlist · {playlist.tracks.length} songs
              {playlist.prompt ? ` · from “${playlist.prompt}”` : ''}
            </Text>
            {/* Spotify action row */}
            <View style={styles.actions}>
              <View style={styles.actionLeft}>
                <PressableScale
                  hitSlop={8}
                  haptic
                  onPress={() => toast.show({ message: 'Added to Your Library', icon: 'heart' })}
                >
                  <Ionicons name="heart-outline" size={26} color={colors.text} />
                </PressableScale>
              </View>
              <View style={styles.actionRight}>
                <PressableScale hitSlop={8} haptic onPress={playShuffled} disabled={!playlist.tracks.length}>
                  <Ionicons name="shuffle" size={26} color={colors.text} />
                </PressableScale>
                <PressableScale
                  haptic
                  onPress={() => play(0)}
                  disabled={!playlist.tracks.length}
                  style={styles.playFab}
                >
                  <Ionicons name="play" size={26} color={colors.black} style={{ marginLeft: 2 }} />
                </PressableScale>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="musical-notes-outline" size={44} color={colors.textFaint} />
            <Text style={styles.emptyTitle}>This playlist is empty</Text>
            <Text style={styles.emptySub}>
              Search for songs and use “Add to playlist” from a long-press
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <TrackRow
            track={item}
            index={index}
            onLongPress={() => setMenuTrack(item)}
            right={
              <PressableScale hitSlop={12} onPress={() => void removeTrack(item.id)} style={styles.removeBtn}>
                <Ionicons name="remove-circle-outline" size={22} color={colors.textFaint} />
              </PressableScale>
            }
            onPress={() => play(index)}
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
  },
  headerCard: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  aiArt: {
    width: 204,
    height: 204,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  artWrap: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  art: {},
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    fontFamily: fonts.bold,
    textAlign: 'center',
    letterSpacing: -0.4,
    marginTop: spacing.sm,
  },
  meta: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
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
    backgroundColor: colors.accentBright,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  empty: { alignItems: 'center', gap: spacing.md, padding: spacing.xxl, paddingTop: spacing.xxl + 10 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '800', fontFamily: fonts.extrabold },
  emptySub: { color: colors.textDim, fontSize: 13, textAlign: 'center', fontFamily: fonts.regular },
  removeBtn: { padding: 8 },
});
