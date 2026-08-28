/**
 * StatsScreen — "Your Sound": minutes listened, total plays, distinct
 * tracks, top artists (with play counts), top songs. Spotify-Wrapped
 * energy, computed entirely on-device from play counts.
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ListeningStats } from '../types';
import { getStats } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

function fmtMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function StatsScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const [stats, setStats] = useState<ListeningStats | null>(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.topLabel}>Your Sound</Text>
        <View style={{ width: 26 }} />
      </View>

      {!stats ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Crunching your listening data…</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
          {/* Hero stats */}
          <LinearGradient
            colors={[colors.aiStart, colors.aiMid, colors.aiEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Text style={styles.heroTitle}>Your listening</Text>
            <View style={styles.heroRow}>
              <HeroStat value={fmtMinutes(stats.minutesEstimate)} label="minutes" />
              <HeroStat value={String(stats.totalPlays)} label="plays" />
              <HeroStat value={String(stats.distinctTracks)} label="songs" />
            </View>
          </LinearGradient>

          {/* Top artists */}
          <Text style={styles.sectionTitle}>Top artists</Text>
          {stats.topArtists.length ? (
            stats.topArtists.map((a, i) => (
              <View key={a.artist} style={styles.artistRow}>
                <Text style={styles.rank}>{i + 1}</Text>
                <Artwork uri={a.artwork} seed={a.artist} size={48} variant="circle" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.artistName} numberOfLines={1}>
                    {a.artist}
                  </Text>
                  <Text style={styles.artistPlays}>
                    {a.plays} {a.plays === 1 ? 'play' : 'plays'}
                  </Text>
                </View>
                {i === 0 ? <Ionicons name="trophy" size={18} color={colors.aiEnd} /> : null}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Play some music to build your taste profile</Text>
          )}

          {/* Top tracks */}
          {stats.topTracks.length ? (
            <>
              <Text style={styles.sectionTitle}>Top songs</Text>
              {stats.topTracks.map((e, i) => (
                <PressableScale
                  key={e.track.id}
                  haptic
                  style={styles.trackRow}
                  onPress={() => {
                    playQueue(
                      stats.topTracks.map((x) => x.track),
                      i,
                    );
                    nav.navigate('Player');
                  }}
                >
                  <Text style={styles.rank}>{i + 1}</Text>
                  <Artwork uri={e.track.artwork} seed={e.track.id} size={48} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.trackTitle} numberOfLines={1}>
                      {e.track.title}
                    </Text>
                    <Text style={styles.trackSub} numberOfLines={1}>
                      {e.track.artist} · {e.count} {e.count === 1 ? 'play' : 'plays'}
                    </Text>
                  </View>
                </PressableScale>
              ))}
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroValue}>{value}</Text>
      <Text style={styles.heroLabel}>{label}</Text>
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
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: colors.textDim, fontSize: 14, fontFamily: fonts.medium },
  hero: {
    margin: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
  },
  heroTitle: { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold, opacity: 0.9 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },
  heroStat: { alignItems: 'center', gap: 2 },
  heroValue: { color: '#fff', fontSize: 26, fontWeight: '900', fontFamily: fonts.black },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: fonts.medium },
  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
  },
  rank: {
    width: 22,
    color: colors.textFaint,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  artistName: { color: colors.text, fontSize: 15, fontWeight: '600', fontFamily: fonts.semibold },
  artistPlays: { color: colors.textDim, fontSize: 12.5, fontFamily: fonts.regular },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
  },
  trackTitle: { color: colors.text, fontSize: 15, fontWeight: '600', fontFamily: fonts.semibold },
  trackSub: { color: colors.textDim, fontSize: 12.5, fontFamily: fonts.regular },
  emptyText: {
    color: colors.textDim,
    fontSize: 13,
    fontFamily: fonts.regular,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
