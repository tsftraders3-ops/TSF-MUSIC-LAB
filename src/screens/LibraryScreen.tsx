/**
 * Library v2 — playlists first, exactly like Spotify:
 *   Your Sound stats card → filter chips (Playlists / Liked / Downloads /
 *   Recent) → rows. Playlists get create + rename + delete, all with
 *   toasts. The stats card deep-links into the listening-stats screen.
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { Playlist, Track } from '../types';
import { usePlayer } from '../player/PlayerProvider';
import {
  createPlaylist,
  deletePlaylist,
  getFavorites,
  getPlaylists,
  getRecents,
  renamePlaylist,
} from '../storage/store';
import { verifyDownloads } from '../storage/downloads';
import { TrackRow } from '../components/TrackRow';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { useToast } from '../components/Toast';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

type Tab = 'playlists' | 'favorites' | 'downloads' | 'recent';

export function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const toast = useToast();

  const [tab, setTab] = useState<Tab>('playlists');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [downloads, setDownloads] = useState<Track[]>([]);
  const [recents, setRecents] = useState<Track[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [menuFor, setMenuFor] = useState<Playlist | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameText, setRenameText] = useState('');

  const reload = useCallback(async () => {
    const [p, f, d, r] = await Promise.all([
      getPlaylists(),
      getFavorites(),
      verifyDownloads(),
      getRecents(),
    ]);
    setPlaylists(p);
    setFavorites(f);
    setDownloads(d);
    setRecents(r);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload]),
  );

  const playTracks = (list: Track[], index = 0) => {
    if (list.length) {
      playQueue(list, index);
      nav.navigate('Player');
    }
  };

  const onCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    const pl = await createPlaylist(name);
    setCreateOpen(false);
    setNewName('');
    await reload();
    toast.show({ message: `Created “${pl.name}”`, icon: 'add-circle' });
    nav.navigate('Playlist', { playlistId: pl.id });
  };

  const onRename = async () => {
    if (!menuFor) return;
    const name = renameText.trim();
    if (name) {
      await renamePlaylist(menuFor.id, name);
      toast.show({ message: 'Playlist renamed', icon: 'pencil' });
    }
    setRenameOpen(false);
    setMenuFor(null);
    await reload();
  };

  const onDelete = async () => {
    if (!menuFor) return;
    await deletePlaylist(menuFor.id);
    toast.show({ message: `Deleted “${menuFor.name}”`, icon: 'trash-outline' });
    setMenuFor(null);
    await reload();
  };

  const totalSongs =
    favorites.length + downloads.length + playlists.reduce((s, p) => s + p.tracks.length, 0);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Library</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <PressableScale
            hitSlop={6}
            haptic
            style={styles.iconBtn}
            onPress={() => nav.navigate('Stats')}
          >
            <Ionicons name="stats-chart-outline" size={21} color={colors.text} />
          </PressableScale>
          <PressableScale hitSlop={6} haptic style={styles.iconBtn} onPress={() => setCreateOpen(true)}>
            <Ionicons name="add" size={25} color={colors.text} />
          </PressableScale>
        </View>
      </View>

      {/* Your Sound — stats card */}
      <PressableScale
        haptic
        onPress={() => nav.navigate('Stats')}
        style={styles.statsCard}
      >
        <LinearGradient
          colors={[colors.aiStart, colors.aiMid, colors.aiEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsGradient}
        >
          <View>
            <Text style={styles.statsTitle}>Your Sound</Text>
            <Text style={styles.statsSub}>
              {totalSongs} saved · {recents.length} recently played
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.85)" />
        </LinearGradient>
      </PressableScale>

      <View style={styles.tabs}>
        {(['playlists', 'favorites', 'downloads', 'recent'] as Tab[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tabPill, tab === t && styles.tabPillActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'playlists'
                ? `Playlists ${playlists.length ? playlists.length : ''}`
                : t === 'favorites'
                  ? `Liked ${favorites.length ? favorites.length : ''}`
                  : t === 'downloads'
                    ? `Downloads ${downloads.length ? downloads.length : ''}`
                    : 'Recent'}
            </Text>
          </Pressable>
        ))}
      </View>

      {tab === 'playlists' ? (
        <FlatList
          data={playlists}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ paddingBottom: 160, flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="add-circle-outline" size={48} color={colors.textFaint} />
              <Text style={styles.emptyTitle}>No playlists yet</Text>
              <Text style={styles.emptySub}>
                Tap + to create one, or let TSF AI generate a mix for you
              </Text>
            </View>
          }
          ListHeaderComponent={
            playlists.length ? (
              <PressableScale
                haptic
                style={styles.createRow}
                onPress={() => setCreateOpen(true)}
              >
                <View style={styles.createIcon}>
                  <Ionicons name="add" size={24} color={colors.text} />
                </View>
                <View style={{ gap: 2 }}>
                  <Text style={styles.createTitle}>New playlist</Text>
                  <Text style={styles.createSub}>Build your own collection</Text>
                </View>
              </PressableScale>
            ) : null
          }
          renderItem={({ item }) => (
            <PressableScale
              haptic
              style={styles.playlistRow}
              onLongPress={() => {
                setMenuFor(item);
                setRenameText(item.name);
              }}
              delayLongPress={300}
              onPress={() => nav.navigate('Playlist', { playlistId: item.id })}
            >
              {item.aiGenerated ? (
                <View style={styles.playlistArtFallback}>
                  <LinearGradient
                    colors={[colors.aiStart, colors.aiEnd]}
                    style={styles.playlistGradient}
                  >
                    <Ionicons name="sparkles" size={22} color="#fff" />
                  </LinearGradient>
                </View>
              ) : (
                <Artwork
                  uri={item.tracks[0]?.artwork}
                  seed={item.id}
                  size={62}
                  variant="rounded"
                />
              )}
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={styles.playlistName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.playlistMeta} numberOfLines={1}>
                  {item.aiGenerated ? 'TSF AI · ' : 'Playlist · '}
                  {item.tracks.length} songs
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
            </PressableScale>
          )}
        />
      ) : (
        <TrackTabList
          tracks={tab === 'favorites' ? favorites : tab === 'downloads' ? downloads : recents}
          tab={tab}
          onPlay={playTracks}
        />
      )}

      {/* Create playlist modal */}
      <Modal visible={createOpen} transparent animationType="fade" onRequestClose={() => setCreateOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setCreateOpen(false)}>
          <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.dialogTitle}>New playlist</Text>
            <TextInput
              style={styles.dialogInput}
              placeholder="Playlist name"
              placeholderTextColor={colors.textFaint}
              value={newName}
              onChangeText={setNewName}
              autoFocus
              onSubmitEditing={onCreate}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
              <PressableScale style={styles.dialogCancel} onPress={() => setCreateOpen(false)} haptic>
                <Text style={styles.dialogCancelText}>Cancel</Text>
              </PressableScale>
              <PressableScale style={styles.dialogCreate} onPress={onCreate} haptic>
                <Text style={styles.dialogCreateText}>Create</Text>
              </PressableScale>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Playlist long-press menu */}
      <Modal visible={!!menuFor} transparent animationType="fade" onRequestClose={() => setMenuFor(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setMenuFor(null)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle} numberOfLines={1}>
              {menuFor?.name}
            </Text>
            <PressableScale style={styles.sheetAction} onPress={() => setRenameOpen(true)} haptic>
              <Ionicons name="pencil-outline" size={20} color={colors.text} />
              <Text style={styles.sheetActionText}>Rename</Text>
            </PressableScale>
            <PressableScale style={styles.sheetAction} onPress={onDelete} haptic>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
              <Text style={[styles.sheetActionText, { color: colors.danger }]}>Delete playlist</Text>
            </PressableScale>
            <PressableScale style={[styles.sheetAction, { borderBottomWidth: 0 }]} onPress={() => setMenuFor(null)} haptic>
              <Ionicons name="close" size={20} color={colors.textDim} />
              <Text style={[styles.sheetActionText, { color: colors.textDim }]}>Cancel</Text>
            </PressableScale>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Rename modal */}
      <Modal visible={renameOpen} transparent animationType="fade" onRequestClose={() => setRenameOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setRenameOpen(false)}>
          <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.dialogTitle}>Rename playlist</Text>
            <TextInput
              style={styles.dialogInput}
              placeholder="Playlist name"
              placeholderTextColor={colors.textFaint}
              value={renameText}
              onChangeText={setRenameText}
              autoFocus
              onSubmitEditing={onRename}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
              <PressableScale style={styles.dialogCancel} onPress={() => setRenameOpen(false)} haptic>
                <Text style={styles.dialogCancelText}>Cancel</Text>
              </PressableScale>
              <PressableScale style={styles.dialogCreate} onPress={onRename} haptic>
                <Text style={styles.dialogCreateText}>Save</Text>
              </PressableScale>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function TrackTabList({
  tracks,
  tab,
  onPlay,
}: {
  tracks: Track[];
  tab: Tab;
  onPlay: (list: Track[], index?: number) => void;
}) {
  if (!tracks.length) {
    const icon =
      tab === 'favorites' ? 'heart-outline' : tab === 'downloads' ? 'arrow-down-circle-outline' : 'time-outline';
    const title =
      tab === 'favorites' ? 'No liked songs' : tab === 'downloads' ? 'No downloads' : 'Nothing played yet';
    const sub =
      tab === 'favorites'
        ? 'Tap the heart on any song to save it here'
        : tab === 'downloads'
          ? 'Download from the player for offline listening'
          : 'Songs you play will show up here';
    return (
      <View style={styles.empty}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={48} color={colors.textFaint} />
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptySub}>{sub}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={tracks}
      keyExtractor={(t) => t.id}
      contentContainerStyle={{ paddingBottom: 160 }}
      renderItem={({ item, index }) => (
        <TrackRow track={item} onPress={() => onPlay(tracks, index)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + 2,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    fontFamily: fonts.black,
    letterSpacing: -0.4,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: { marginHorizontal: spacing.lg, marginBottom: spacing.md, borderRadius: radius.lg, overflow: 'hidden' },
  statsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg + 2,
  },
  statsTitle: { color: '#fff', fontSize: 18, fontWeight: '900', fontFamily: fonts.black },
  statsSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontFamily: fonts.medium, marginTop: 2 },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  tabPill: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    backgroundColor: colors.card,
  },
  tabPillActive: { backgroundColor: colors.accent },
  tabText: { color: colors.textDim, fontSize: 13, fontWeight: '700', fontFamily: fonts.bold },
  tabTextActive: { color: colors.accentDeep },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xxl },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800', fontFamily: fonts.extrabold },
  emptySub: { color: colors.textDim, fontSize: 13, textAlign: 'center', fontFamily: fonts.regular },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  createIcon: {
    width: 62,
    height: 62,
    borderRadius: radius.sm + 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createTitle: { color: colors.text, fontSize: 16, fontWeight: '700', fontFamily: fonts.bold },
  createSub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 9,
    minHeight: 78,
  },
  playlistArtFallback: { borderRadius: radius.sm + 2, overflow: 'hidden' },
  playlistGradient: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistName: { color: colors.text, fontSize: 16, fontWeight: '600', fontFamily: fonts.semibold },
  playlistMeta: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dialog: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  dialogTitle: { color: colors.text, fontSize: 19, fontWeight: '800', fontFamily: fonts.extrabold },
  dialogInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.medium,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    height: 46,
  },
  dialogCancel: {
    flex: 1,
    backgroundColor: colors.elevated,
    borderRadius: radius.full,
    alignItems: 'center',
    paddingVertical: 12,
  },
  dialogCancelText: { color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  dialogCreate: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    alignItems: 'center',
    paddingVertical: 12,
  },
  dialogCreateText: { color: colors.accentDeep, fontSize: 14, fontWeight: '800', fontFamily: fonts.extrabold },
  sheet: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  sheetTitle: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.bold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sheetActionText: { color: colors.text, fontSize: 15, fontWeight: '600', fontFamily: fonts.semibold },
});
