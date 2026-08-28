import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { Track } from '../types';
import { searchMusic } from '../api/music';
import { usePlayer } from '../player/PlayerProvider';
import {
  clearRecentSearches,
  getRecentSearches,
  pushRecentSearch,
} from '../storage/store';
import { TrackRow } from '../components/TrackRow';
import { colors, spacing, radius, type as typo } from '../theme';
import type { RootStackParamList } from './navigation';

const SUGGESTIONS = [
  'Arijit Singh',
  'Weeknd',
  'Punjabi Top Hits',
  'Lo-fi Beats',
  'Eminem',
  'Taylor Swift',
  'AR Rahman',
  'Travis Scott',
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
  const inputRef = useRef<TextInput>(null);
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

  const showEmptyState = !query && !searched;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.searchWrap}>
        <View style={styles.inputRow}>
          <Ionicons name="search" size={20} color={colors.textFaint} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Songs, artists, albums…"
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => runSearch(query)}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable hitSlop={8} onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textFaint} />
            </Pressable>
          )}
        </View>
      </View>

      {showEmptyState ? (
        <View style={styles.emptyWrap}>
          {recentSearches.length > 0 && (
            <View style={styles.chipSection}>
              <View style={styles.chipHeader}>
                <Text style={styles.chipTitle}>Recent searches</Text>
                <Pressable hitSlop={8} onPress={async () => {
                  await clearRecentSearches();
                  setRecentSearches([]);
                }}>
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
          )}
          <View style={styles.chipSection}>
            <Text style={styles.chipTitle}>Try something new</Text>
            <View style={styles.chipRow}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.chip} onPress={() => setQuery(s)}>
                  <Ionicons name="trending-up" size={14} color={colors.accent} />
                  <Text style={styles.chipText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      ) : loading ? (
        <View style={styles.centerWrap}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : results.length === 0 ? (
        <View style={styles.centerWrap}>
          <Ionicons name="musical-notes-outline" size={44} color={colors.textFaint} />
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
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 120 }}
          ListHeaderComponent={
            degraded ? (
              <Text style={styles.degradedNote}>
                Full-length streams unavailable for this search — showing 30s previews
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
  searchWrap: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    height: 46,
  },
  input: { flex: 1, color: colors.text, fontSize: typo.body, fontWeight: '500' },
  emptyWrap: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.xxl },
  chipSection: { gap: spacing.md },
  chipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipTitle: { color: colors.text, fontSize: typo.headline, fontWeight: '800' },
  chipClear: { color: colors.textFaint, fontSize: typo.caption, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
  },
  chipText: { color: colors.textDim, fontSize: typo.caption, fontWeight: '500' },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xl },
  noResults: { color: colors.text, fontSize: typo.headline, fontWeight: '700' },
  noResultsSub: { color: colors.textDim, fontSize: typo.caption },
  degradedNote: {
    color: colors.textDim,
    fontSize: typo.micro,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
