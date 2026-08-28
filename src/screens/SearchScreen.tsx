/**
 * Search v2 — Spotify's search: persistent rounded field up top,
 * recent-search chips, and the iconic colorful "Browse all" genre grid.
 * Each tile opens a search-backed collection. An AI banner card sits at
 * the top of browse for one-tap playlist generation.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import { LinearGradient } from 'expo-linear-gradient';
import type { Track } from '../types';
import { searchMusic } from '../api/music';
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

const GENRES: Array<{ label: string; query: string; icon: string }> = [
  { label: 'Pop', query: 'pop hits', icon: 'musical-notes' },
  { label: 'Bollywood', query: 'bollywood hits', icon: 'film-outline' },
  { label: 'Punjabi', query: 'punjabi hits', icon: 'flame' },
  { label: 'Hip-Hop', query: 'rap hip hop', icon: 'mic-outline' },
  { label: 'Rock', query: 'rock hits', icon: 'flash' },
  { label: 'Lo-Fi', query: 'lofi songs', icon: 'moon-outline' },
  { label: 'Party', query: 'party dance hits', icon: 'wine' },
  { label: 'Romance', query: 'romantic love songs', icon: 'heart' },
  { label: 'Workout', query: 'workout gym', icon: 'barbell' },
  { label: 'Devotional', query: 'devotional bhajan', icon: 'flower-outline' },
  { label: 'Sufi', query: 'sufi songs', icon: 'sparkles-outline' },
  { label: '90s Bollywood', query: '90s hindi songs', icon: 'time-outline' },
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
  const [searched, setSearched] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchGen = useRef(0);

  useEffect(() => {
    getRecentSearches().then(setRecentSearches);
  }, []);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      searchGen.current += 1;
      setResults([]);
      setSearched(false);
      return;
    }
    const gen = ++searchGen.current;
    setLoading(true);
    setSearched(true);
    try {
      const { tracks, degraded: dg } = await searchMusic(q);
      if (gen !== searchGen.current) return; // stale response — ignore
      setResults(tracks);
      setDegraded(dg);
      if (tracks.length) await pushRecentSearch(q);
      setRecentSearches(await getRecentSearches());
    } catch {
      if (gen !== searchGen.current) return;
      setResults([]);
      setDegraded(true);
    } finally {
      if (gen === searchGen.current) setLoading(false);
    }
  }, []);

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
    playQueue(results, index);
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
      <View style={styles.searchWrap}>
        <View style={styles.inputRow}>
          <Ionicons name="search" size={20} color={colors.textFaint} />
          <TextInput
            style={styles.input}
            placeholder="What do you want to listen to?"
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => runSearch(query)}
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <Pressable hitSlop={8} onPress={() => setQuery('')}>
              <Ionicons name="close" size={20} color={colors.textFaint} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {showBrowse ? (
        <FlatList
          data={GENRES}
          keyExtractor={(g) => g.label}
          numColumns={2}
          columnWrapperStyle={styles.genreRow}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 195 }}
          ListHeaderComponent={
            <View>
              {recentSearches.length > 0 ? (
                <View style={styles.chipSection}>
                  <View style={styles.chipHeader}>
                    <Text style={styles.chipTitle}>Recent searches</Text>
                    <Pressable
                      hitSlop={8}
                      onPress={async () => {
                        await clearRecentSearches();
                        setRecentSearches([]);
                      }}
                    >
                      <Text style={styles.chipClear}>Clear</Text>
                    </Pressable>
                  </View>
                  <View style={styles.chipRow}>
                    {recentSearches.map((s) => (
                      <Pressable key={s} style={styles.chip} onPress={() => setQuery(s)}>
                        <Ionicons name="time-outline" size={14} color={colors.textFaint} />
                        <Text style={styles.chipText}>{s}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ) : null}

              <PressableScale
                onPress={() => nav.navigate('Tabs', { screen: 'AI' })}
                haptic
                style={styles.aiBannerWrap}
              >
                <LinearGradient
                  colors={['#7C4DFF', '#B04DD6', '#C86DD7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aiBanner}
                >
                  <View style={styles.aiBannerIcon}>
                    <Ionicons name="sparkles" size={24} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.aiBannerTitle}>Create a playlist with TSF AI</Text>
                    <Text style={styles.aiBannerSub}>
                      “Punjabi gym bangers”, “90s heartbreak Bollywood” — just describe it
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
                </LinearGradient>
              </PressableScale>

              <Text style={styles.browseTitle}>Browse all</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const [c1, c2] = genreGradient(index);
            return (
              <PressableScale
                onPress={() => openGenre(item.label, item.query)}
                haptic
                style={[styles.genreTile, { backgroundColor: c1 }]}
              >
                <View style={[styles.tileGradient, { backgroundColor: c2 }]} />
                <Text style={styles.genreLabel}>{item.label}</Text>
                <View style={styles.genreIconWrap}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={26} color="rgba(0,0,0,0.35)" />
                </View>
              </PressableScale>
            );
          }}
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
            <TrackRow track={item} onPress={() => play(index)} />
          )}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 195 }}
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
  root: { flex: 1, backgroundColor: 'transparent' },
  searchWrap: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.glassStrong,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  input: { flex: 1, color: colors.text, fontSize: 15, fontFamily: fonts.medium },
  chipSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },
  chipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
  },
  chipClear: { color: colors.textDim, fontSize: 13, fontWeight: '600', fontFamily: fonts.semibold },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.glass,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 9,
  },
  chipText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.medium },
  aiBannerWrap: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: radius.squircle,
    overflow: 'hidden',
    shadowColor: '#7C4DFF',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg + 2,
  },
  aiBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBannerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    fontFamily: fonts.bold,
  },
  aiBannerSub: {
    color: colors.textDim,
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: 2,
    lineHeight: 16,
  },
  browseTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  genreRow: { gap: 8, paddingHorizontal: spacing.lg, marginBottom: 8 },
  genreTile: {
    flex: 1,
    height: 100,
    borderRadius: radius.md,
    padding: spacing.md - 2,
    overflow: 'hidden',
  },
  tileGradient: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    opacity: 0.75,
  },
  genreLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    maxWidth: '75%',
  },
  genreIconWrap: {
    position: 'absolute',
    bottom: -8,
    right: -4,
    transform: [{ rotate: '15deg' }],
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
