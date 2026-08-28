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

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
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
              <Artwork
                uri={playlist.tracks[0]?.artwork}
                seed={playlist.id}
                size={188}
                variant="rounded"
              />
            )}
            <Text style={styles.name}>{playlist.name}</Text>
            <Text style={styles.meta}>
              {playlist.tracks.length} songs
              {playlist.prompt ? ` · from “${playlist.prompt}”` : ''}
            </Text>
            <View style={styles.actions}>
              <PressableScale
                haptic
                style={styles.playBtn}
                onPress={() => play(0)}
                disabled={!playlist.tracks.length}
              >
                <Ionicons name="play" size={21} color={colors.accentDeep} />
                <Text style={styles.playBtnText}>Play</Text>
              </PressableScale>
              <PressableScale
                haptic
                style={styles.shuffleBtn}
                onPress={playShuffled}
                disabled={!playlist.tracks.length}
              >
                <Ionicons name="shuffle" size={19} color={colors.text} />
                <Text style={styles.shuffleBtnText}>Shuffle</Text>
              </PressableScale>
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
    width: 188,
    height: 188,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    fontFamily: fonts.black,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  meta: { color: colors.textDim, fontSize: 13, fontFamily: fonts.medium },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
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
  empty: { alignItems: 'center', gap: spacing.md, padding: spacing.xxl, paddingTop: spacing.xxl + 10 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '800', fontFamily: fonts.extrabold },
  emptySub: { color: colors.textDim, fontSize: 13, textAlign: 'center', fontFamily: fonts.regular },
  removeBtn: { padding: 8 },
});
