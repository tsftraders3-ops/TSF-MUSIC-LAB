/**
 * Your Library — authentic Spotify Android layout:
 *   avatar + "Your Library" title, search & add icons right →
 *   filter chips (Playlists / Artists / Albums / Downloaded) →
 *   sort row ("Recent" + grid toggle) → list rows: 64px artwork
 *   (rounded-square playlists, circle artists), 16px bold title,
 *   13px dim subtitle. Liked Songs leads with the iconic purple→green
 *   gradient heart tile + green pin.
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

type Chip = 'playlists' | 'artists' | 'albums' | 'downloaded';

interface LibItem {
  key: string;
  title: string;
  subtitle: string;
  artwork?: string;
  seed: string;
  kind: 'liked' | 'stats' | 'playlist' | 'ai' | 'artist' | 'album' | 'track';
  playlistId?: string;
  tracks?: Track[];
  circle?: boolean;
}

export function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const toast = useToast();

  const [chip, setChip] = useState<Chip>('playlists');
  const [sortRecent, setSortRecent] = useState(true);
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

  const openCollection = (title: string, tracks: Track[]) =>
    nav.navigate('Collection', {
      collection: { id: `local-${title}`, title, artwork: tracks[0]?.artwork ?? '' },
      tracks,
    });

  /* ── build the Spotify-style item list per chip ──────────────────── */
  const items: LibItem[] = [];
  if (chip === 'playlists') {
    items.push({
      key: 'liked',
      title: 'Liked Songs',
      subtitle: `Playlist · ${favorites.length} songs`,
      seed: 'liked',
      kind: 'liked',
      tracks: favorites,
    });
    items.push({
      key: 'stats',
      title: 'Your Sound',
      subtitle: 'Your listening stats',
      seed: 'stats',
      kind: 'stats',
    });
    playlists
      .slice()
      .sort((a, b) =>
        sortRecent
          ? (b.createdAt ?? 0) - (a.createdAt ?? 0)
          : a.name.localeCompare(b.name),
      )
      .forEach((p) =>
        items.push({
          key: p.id,
          title: p.name,
          subtitle: `${p.aiGenerated ? 'TSF AI · ' : 'Playlist · '}${p.tracks.length} songs`,
          artwork: p.tracks[0]?.artwork,
          seed: p.id,
          kind: p.aiGenerated ? 'ai' : 'playlist',
          playlistId: p.id,
          tracks: p.tracks,
        }),
      );
  } else if (chip === 'artists') {
    const seen = new Set<string>();
    [...recents, ...favorites].forEach((t) => {
      if (seen.has(t.artist)) return;
      seen.add(t.artist);
      items.push({
        key: `artist-${t.artist}`,
        title: t.artist,
        subtitle: 'Artist',
        artwork: t.artwork,
        seed: t.artist,
        kind: 'artist',
        circle: true,
      });
    });
    items.sort((a, b) => a.title.localeCompare(b.title));
  } else if (chip === 'albums') {
    const seen = new Set<string>();
    [...recents, ...favorites].forEach((t) => {
      const alb = t.album ?? '';
      if (!alb || seen.has(alb)) return;
      seen.add(alb);
      items.push({
        key: `album-${alb}`,
        title: alb,
        subtitle: `Album · ${t.artist}`,
        artwork: t.artwork,
        seed: alb,
        kind: 'album',
      });
    });
    items.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    downloads.forEach((t) =>
      items.push({
        key: t.id,
        title: t.title,
        subtitle: `Song · ${t.artist}`,
        artwork: t.artwork,
        seed: t.id,
        kind: 'track',
        tracks: [t],
      }),
    );
  }

  const renderItem = ({ item }: { item: LibItem }) => {
    const onRowPress = () => {
      if (item.kind === 'liked') return openCollection('Liked Songs', item.tracks ?? []);
      if (item.kind === 'stats') return nav.navigate('Stats');
      if (item.playlistId) return nav.navigate('Playlist', { playlistId: item.playlistId });
      if (item.kind === 'artist')
        return nav.navigate('Collection', {
          collection: {
            id: `artist-${item.title}`,
            title: item.title,
            subtitle: 'Artist',
            artwork: '',
            kind: 'search',
            query: item.title,
          },
        });
      if (item.kind === 'album' || item.kind === 'track')
        return nav.navigate('Collection', {
          collection: {
            id: `local-${item.title}`,
            title: item.title,
            artwork: item.artwork ?? '',
          },
          tracks: item.tracks ?? [],
        });
      openCollection(item.title, item.tracks ?? []);
    };
    const longPressPlaylist = () => {
      const pl = playlists.find((p) => p.id === item.playlistId);
      if (pl) {
        setMenuFor(pl);
        setRenameText(pl.name);
      }
    };
    return (
      <PressableScale
        haptic
        scaleTo={0.985}
        style={styles.row}
        onPress={onRowPress}
        onLongPress={longPressPlaylist}
        delayLongPress={300}
      >
        {item.kind === 'liked' ? (
          <Artwork seed="liked" size={64} liked variant="rounded" />
        ) : item.kind === 'stats' ? (
          <View style={styles.statsTile}>
            <Ionicons name="pulse-outline" size={26} color="#fff" />
          </View>
        ) : item.kind === 'ai' ? (
          <View style={styles.aiTile}>
            <Ionicons name="sparkles" size={24} color="#fff" />
          </View>
        ) : (
          <Artwork
            uri={item.artwork}
            seed={item.seed}
            size={64}
            variant={item.circle ? 'circle' : 'rounded'}
          />
        )}
        <View style={{ flex: 1, gap: 3, paddingRight: 8 }}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.rowSubWrap}>
            {item.kind === 'liked' ? (
              <Ionicons name="pin" size={14} color={colors.accentBright} />
            ) : null}
            <Text style={styles.rowSub} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
        </View>
        {item.playlistId ? (
          <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
        ) : null}
      </PressableScale>
    );
  };

  const emptyCopy: Record<Chip, { title: string; sub: string }> = {
    playlists: {
      title: 'Create your first playlist',
      sub: "It's easy — we'll help you",
    },
    artists: { title: 'No artists yet', sub: 'Songs you play will show artists here' },
    albums: { title: 'No albums yet', sub: 'Music you play will collect here' },
    downloaded: { title: 'No downloads', sub: 'Download from the player for offline listening' },
  };

  const showEmpty = chip === 'playlists' ? items.length <= 2 : items.length === 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* header: avatar + title left · search + add right (Spotify) */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>T</Text>
          </View>
          <Text style={styles.title}>Your Library</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <PressableScale hitSlop={6} haptic style={styles.iconBtn} onPress={() => toast.show({ message: 'Search your library — coming soon', icon: 'search' })}>
            <Ionicons name="search" size={22} color={colors.text} />
          </PressableScale>
          <PressableScale hitSlop={6} haptic style={styles.iconBtn} onPress={() => setCreateOpen(true)}>
            <Ionicons name="add" size={26} color={colors.text} />
          </PressableScale>
        </View>
      </View>

      {/* filter chips (Spotify gray pills) */}
      <View style={styles.chips}>
        {(['playlists', 'artists', 'albums', 'downloaded'] as Chip[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setChip(t)}
            style={[styles.chip, chip === t && styles.chipActive]}
          >
            <Text style={[styles.chipText, chip === t && styles.chipTextActive]}>
              {t === 'playlists'
                ? 'Playlists'
                : t === 'artists'
                  ? 'Artists'
                  : t === 'albums'
                    ? 'Albums'
                    : 'Downloaded'}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* sort row */}
      <View style={styles.sortRow}>
        <PressableScale hitSlop={8} haptic onPress={() => setSortRecent((v) => !v)} style={styles.sortBtn}>
          <Ionicons name="swap-vertical" size={15} color={colors.textDim} />
          <Text style={styles.sortText}>{sortRecent ? 'Recent' : 'Alphabetical'}</Text>
          <Ionicons name="chevron-down" size={13} color={colors.textDim} />
        </PressableScale>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.key}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 170, flexGrow: 1 }}
        ListEmptyComponent={
          chip === 'playlists' ? null : (
            <View style={styles.empty}>
              <Ionicons
                name={chip === 'downloaded' ? 'arrow-down-circle-outline' : 'musical-notes-outline'}
                size={48}
                color={colors.textFaint}
              />
              <Text style={styles.emptyTitle}>{emptyCopy[chip].title}</Text>
              <Text style={styles.emptySub}>{emptyCopy[chip].sub}</Text>
            </View>
          )
        }
      />

      {showEmpty && chip === 'playlists' ? (
        <View style={styles.emptyOverlay}>
          <Text style={styles.emptyTitle}>{emptyCopy.playlists.title}</Text>
          <Text style={styles.emptySub}>{emptyCopy.playlists.sub}</Text>
          <PressableScale
            haptic
            onPress={() => setCreateOpen(true)}
            style={styles.emptyCreateBtn}
          >
            <Text style={styles.emptyCreateText}>Create</Text>
          </PressableScale>
        </View>
      ) : null}

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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm + 2,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.text, fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.sm + 2,
  },
  chip: {
    borderRadius: radius.full,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: colors.card, // Spotify chip gray
  },
  chipActive: { backgroundColor: colors.chipActiveBg },
  chipText: { color: colors.text, fontSize: 13, fontWeight: '600', fontFamily: fonts.semibold },
  chipTextActive: { color: colors.chipActiveText },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4 },
  sortText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.medium },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    minHeight: 78,
  },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: '500', fontFamily: fonts.medium },
  rowSubWrap: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rowSub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular, flexShrink: 1 },
  statsTile: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    backgroundColor: '#535353',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTile: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    backgroundColor: colors.aiStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xxl },
  emptyOverlay: { alignItems: 'center', gap: spacing.sm, padding: spacing.xxl, paddingTop: spacing.xxl + 20 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700', fontFamily: fonts.bold },
  emptySub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  emptyCreateBtn: {
    backgroundColor: colors.accentBright,
    borderRadius: radius.full,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
  },
  emptyCreateText: { color: colors.accentDeep, fontSize: 15, fontWeight: '700', fontFamily: fonts.bold },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  dialog: {
    width: '100%',
    backgroundColor: colors.elevated,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  dialogTitle: { color: colors.text, fontSize: 19, fontWeight: '700', fontFamily: fonts.bold },
  dialogInput: {
    backgroundColor: colors.card,
    borderRadius: radius.sm + 2,
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.regular,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    height: 46,
  },
  dialogCancel: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    alignItems: 'center',
    paddingVertical: 12,
  },
  dialogCancelText: { color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  dialogCreate: {
    flex: 1,
    backgroundColor: colors.accentBright,
    borderRadius: radius.full,
    alignItems: 'center',
    paddingVertical: 12,
  },
  dialogCreateText: { color: colors.accentDeep, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  sheet: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.xl,
    backgroundColor: colors.elevated,
    borderRadius: radius.xl,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.bold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
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
  sheetActionText: { color: colors.text, fontSize: 15, fontWeight: '500', fontFamily: fonts.medium },
});
