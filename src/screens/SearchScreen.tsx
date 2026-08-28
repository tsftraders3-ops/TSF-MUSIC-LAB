/**
 * Search — authentic Spotify Android search:
 *   #242424 rounded search field ("What do you want to listen to?") →
 *   recent-search rows → "Browse all" 2-column grid of solid-color genre
 *   cards, each with an album cover rotated ~25° peeking out the bottom-
 *   right corner — Spotify's most iconic grid. A violet TSF AI card
 *   leads the grid.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { searchMusic } from '../api/music';
import { vibeSearch } from '../ai/surfaces/search';
import { mindbeat } from '../ai/mindbeat';
import { searchSaavnClean } from '../api/saavn';
import { getTrending } from '../api/saavn';
import { usePlayer } from '../player/PlayerProvider';
import {
  clearRecentSearches,
  getRecentSearches,
  pushRecentSearch,
} from '../storage/store';
import { TrackRow } from '../components/TrackRow';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing, genreGradient } from '../theme';
import type { RootStackParamList } from './navigation';

const GENRES: Array<{ label: string; query: string }> = [
  { label: 'Bollywood', query: 'bollywood hits' },
  { label: 'Punjabi', query: 'punjabi hits' },
  { label: 'Pop', query: 'pop hits' },
  { label: 'Hip-Hop', query: 'rap hip hop' },
  { label: 'Rock', query: 'rock hits' },
  { label: 'Lo-Fi', query: 'lofi songs' },
  { label: 'Devotional', query: 'devotional bhajan' },
  { label: 'Party', query: 'party dance hits' },
  { label: 'Romance', query: 'romantic love songs' },
  { label: 'Workout', query: 'workout gym' },
  { label: 'Sufi', query: 'sufi songs' },
  { label: '90s Hits', query: '90s hindi songs' },
];

export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [degraded, setDegraded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [browseArt, setBrowseArt] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [vibe, setVibe] = useState(false); // Keyword | Vibe mode (§9.8)
  const [vibeChips, setVibeChips] = useState<string[]>([]);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchGen = useRef(0);

  useEffect(() => {
    getRecentSearches().then(setRecentSearches);
    // artwork for the genre-card corners (Spotify peeks album art there)
    getTrending(24)
      .then((tracks) => setBrowseArt(tracks.map((t) => t.artwork).filter(Boolean)))
      .catch(() => undefined);
  }, []);

  const runSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        searchGen.current += 1;
        setResults([]);
        setVibeChips([]);
        setSearched(false);
        return;
      }
      const gen = ++searchGen.current;
      setLoading(true);
      setSearched(true);
      try {
        if (vibe) {
          // Vibe mode (§9.8): the S1 intent parser reads the query, typos
          // and Hinglish included; results ranked by mood/energy fit.
          const r = await vibeSearch(
            { search: (qq, limit) => searchSaavnClean(qq, limit) },
            q,
            25,
          );
          if (gen !== searchGen.current) return;
          setResults(r.tracks);
          setDegraded(false);
          setVibeChips([
            ...r.intent.moods.slice(0, 2),
            ...r.intent.languages.slice(0, 1),
            ...(r.shortcut ? [r.shortcut.label] : []),
          ]);
          void mindbeat.searchQueried(q, r.tracks.length);
        } else {
          const { tracks, degraded: dg } = await searchMusic(q);
          if (gen !== searchGen.current) return; // stale response — ignore
          setResults(tracks);
          setDegraded(dg);
          setVibeChips([]);
          void mindbeat.searchQueried(q, tracks.length);
        }
        await pushRecentSearch(q);
        setRecentSearches(await getRecentSearches());
      } catch {
        if (gen !== searchGen.current) return;
        setResults([]);
        setDegraded(true);
      } finally {
        if (gen === searchGen.current) setLoading(false);
      }
    },
    [vibe],
  );

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = query;
    debounce.current = setTimeout(() => runSearch(q), 400);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query, runSearch]);

  const play = (index: number) => {
    if (!results.length) return;
    playQueue(results, index, 'search');
    void mindbeat.searchClicked(results[index]!.id, index);
    Keyboard.dismiss();
    nav.navigate('Player');
  };

  const openGenre = (label: string, q: string) => {
    nav.navigate('Collection', {
      collection: {
        id: `genre-${label}`,
        title: label,
        subtitle: 'Browse',
        artwork: '',
        kind: 'search',
        query: q,
      },
    });
  };

  const showBrowse = !query && !searched;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Spotify search field + Keyword|Vibe mode toggle (§9.8) */}
      <View style={styles.searchWrap}>
        <View style={styles.modeRow}>
          {([false, true] as const).map((v) => (
            <PressableScale
              key={v ? 'vibe' : 'kw'}
              haptic
              onPress={() => {
                setVibe(v);
                if (query.trim()) runSearch(query);
              }}
              style={[styles.modeChip, vibe === v && styles.modeChipOn]}
            >
              <Ionicons
                name={v ? 'sparkles' : 'text'}
                size={12}
                color={vibe === v ? colors.textOnGreen : colors.textDim}
              />
              <Text style={[styles.modeChipText, vibe === v && styles.modeChipTextOn]}>{v ? 'Vibe' : 'Keyword'}</Text>
            </PressableScale>
          ))}
        </View>
        <View style={styles.inputRow}>
          <Ionicons name="search" size={21} color={colors.textDim} />
          <TextInput
            style={styles.input}
            placeholder="What do you want to listen to?"
            placeholderTextColor={colors.textDim}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => runSearch(query)}
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <Pressable hitSlop={8} onPress={() => setQuery('')}>
              <Ionicons name="close" size={20} color={colors.textDim} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Vibe-mode parsed-intent chips (§9.8) */}
      {!showBrowse && vibeChips.length > 0 ? (
        <View style={styles.vibeChipsRow}>
          {vibeChips.map((c) => (
            <View key={c} style={styles.vibeChip}>
              <Text style={styles.vibeChipText} numberOfLines={1}>
                {c}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {showBrowse ? (
        <FlatList
          data={GENRES}
          keyExtractor={(g) => g.label}
          numColumns={2}
          columnWrapperStyle={styles.genreRow}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 170 }}
          ListHeaderComponent={
            <View>
              {recentSearches.length > 0 ? (
                <View style={styles.recentSection}>
                  <Text style={styles.recentTitle}>Recent searches</Text>
                  {recentSearches.slice(0, 4).map((s) => (
                    <Pressable
                      key={s}
                      style={styles.recentRow}
                      onPress={() => setQuery(s)}
                    >
                      <Ionicons name="time-outline" size={19} color={colors.textDim} />
                      <Text style={styles.recentText} numberOfLines={1}>
                        {s}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
              <Text style={styles.browseTitle}>Browse all</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const [c1] = genreGradient(index);
            const art = browseArt[index % Math.max(1, browseArt.length)];
            return (
              <PressableScale
                onPress={() => openGenre(item.label, item.query)}
                scaleTo={0.97}
                haptic
                style={[styles.genreTile, { backgroundColor: c1 }]}
              >
                <Text style={styles.genreLabel}>{item.label}</Text>
                {art ? (
                  <Image source={{ uri: art }} style={styles.genreArt} />
                ) : null}
              </PressableScale>
            );
          }}
          ListFooterComponent={
            <PressableScale
              onPress={() => nav.navigate('AI')}
              scaleTo={0.97}
              haptic
              style={[styles.genreTile, { backgroundColor: colors.aiStart }]}
            >
              <View style={{ flex: 1, justifyContent: 'center', paddingRight: 40 }}>
                <Text style={styles.genreLabel}>TSF AI</Text>
                <Text style={styles.aiTileSub} numberOfLines={2}>
                  Describe your vibe, get a playlist
                </Text>
              </View>
              <View style={styles.aiTileIcon}>
                <Ionicons name="sparkles" size={22} color="#fff" />
              </View>
            </PressableScale>
          }
        />
      ) : loading ? (
        <View style={styles.centerWrap}>
          <ActivityIndicator size="large" color={colors.accentBright} />
        </View>
      ) : results.length === 0 ? (
        <View style={styles.centerWrap}>
          <Ionicons name="musical-notes-outline" size={48} color={colors.textFaint} />
          <Text style={styles.noResults}>No results for “{query}”</Text>
          <Text style={styles.noResultsSub}>Check the spelling or try something else</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(t) => t.id}
          renderItem={({ item, index }) => (
            <TrackRow track={item} onPress={() => play(index)} showHeart={false} />
          )}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 170 }}
          ListHeaderComponent={
            degraded ? (
              <Text style={styles.degradedNote}>
                Full-length streams unavailable — some results are 30s previews
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md - 2 },
  modeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.cardDim,
  },
  modeChipOn: { backgroundColor: colors.accentBright },
  modeChipText: { color: colors.textDim, fontSize: 12, fontFamily: fonts.medium },
  modeChipTextOn: { color: colors.textOnGreen, fontWeight: '700', fontFamily: fonts.bold },
  vibeChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: spacing.lg, paddingBottom: 6 },
  vibeChip: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  vibeChipText: { color: colors.aiEnd, fontSize: 11, fontFamily: fonts.medium },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card, // Spotify #242424 field
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  input: { flex: 1, color: colors.text, fontSize: 15.5, fontFamily: fonts.regular },
  recentSection: { paddingTop: spacing.md, paddingBottom: spacing.lg, gap: 2 },
  recentTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: fonts.bold,
    marginBottom: 6,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  recentText: { flex: 1, color: colors.text, fontSize: 15, fontFamily: fonts.medium },
  browseTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
    paddingBottom: spacing.md,
  },
  genreRow: { gap: 8, marginBottom: 8 },
  genreTile: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    borderRadius: 8,
    padding: spacing.md,
    overflow: 'hidden',
  },
  genreLabel: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
    maxWidth: '80%',
  },
  /** Spotify's signature: album art rotated ~25° peeking out the corner */
  genreArt: {
    position: 'absolute',
    bottom: -14,
    right: -8,
    width: 74,
    height: 74,
    borderRadius: 4,
    transform: [{ rotate: '25deg' }],
  },
  aiTileSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontFamily: fonts.medium,
    marginTop: 4,
    maxWidth: '95%',
  },
  aiTileIcon: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xl },
  noResults: { color: colors.text, fontSize: 18, fontWeight: '700', fontFamily: fonts.bold },
  noResultsSub: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  degradedNote: {
    color: colors.textDim,
    fontSize: 11,
    fontFamily: fonts.medium,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
