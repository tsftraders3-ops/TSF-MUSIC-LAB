/**
 * StatsScreen — "Your Sound" v2 (§9.7): Wrapped-grade counting from the
 * Event Ledger.
 *
 *  • the 30-second rule (industry stream definition) — skips under 30s
 *    don't count, exactly like the charts do
 *  • listening clock (streams by hour — when this listener actually listens)
 *  • day streak + skip-profile stats — proof the ledger exists
 *  • entry to Taste DNA (the transparency screen §6.6)
 *
 * Falls back to v2.1 play-count stats when the ledger is young (ladder
 * §10.4 — never emptier than before).
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
import { mindbeat } from '../ai/mindbeat';
import { usePlayer } from '../player/PlayerProvider';
import { Artwork } from '../components/Artwork';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import { useDynamicPalette } from '../theme/DynamicThemeProvider';
import { withAlpha } from '../theme/dynamic';
import type { RootStackParamList } from './navigation';

type MindbeatStats = Awaited<ReturnType<typeof mindbeat.stats>>;

interface Merged {
  minutes: number;
  streams: number;
  songs: number;
  topArtists: Array<{ artist: string; plays: number; artwork?: string }>;
  topTracks: Array<{ track: import('../types').Track; plays: number }>;
  byHour?: number[];
  streakDays?: number;
  skipRate?: number;
  sessions?: number;
}

function fmtMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function ListeningClock({ byHour }: { byHour: number[] }) {
  const max = Math.max(1, ...byHour);
  return (
    <View style={styles.clockWrap}>
      <Text style={styles.clockTitle}>Listening clock</Text>
      <Text style={styles.clockSub}>Streams by hour — 30s+ listens only</Text>
      <View style={styles.clockRow}>
        {byHour.map((n, h) => (
          <View key={h} style={styles.clockCol}>
            <View style={[styles.clockBarWrap]}>
              <View
                style={[
                  styles.clockBar,
                  { height: Math.max(3, (n / max) * 64), backgroundColor: h >= 22 || h < 5 ? colors.aiEnd : colors.accentBright },
                ]}
              />
            </View>
            {h % 6 === 0 ? <Text style={styles.clockLabel}>{h}</Text> : <View style={{ height: 12 }} />}
          </View>
        ))}
      </View>
    </View>
  );
}

export function StatsScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const palette = useDynamicPalette();
  const [stats, setStats] = useState<Merged | null>(null);

  useEffect(() => {
    (async () => {
      // Ledger truth first (§9.7); v2.1 play counts fill the gaps.
      // Ladder rule (§10.4 — never emptier than before): a *resolved but
      // empty* ledger (fresh install / upgrade) must NOT zero out numbers
      // that legacy play counts can still provide. `??` alone can't do
      // this — 0 is not nullish — so maturity is decided explicitly.
      const [ledger, legacy] = await Promise.all([
        mindbeat.stats().catch(() => null as MindbeatStats),
        getStats().catch(() => null as ListeningStats | null),
      ]);
      const ledgerUsable = !!ledger && (ledger.streams ?? 0) > 0;
      const merged: Merged = {
        minutes: ledgerUsable
          ? (ledger!.minutes ?? 0)
          : (legacy?.minutesEstimate ?? ledger?.minutes ?? 0),
        streams: ledgerUsable
          ? (ledger!.streams ?? 0)
          : (legacy?.totalPlays ?? ledger?.streams ?? 0),
        songs: ledgerUsable
          ? (ledger!.topTracks?.length ?? 0)
          : (legacy?.distinctTracks ?? ledger?.topTracks?.length ?? 0),
        topArtists: (ledger?.topArtists?.length ? ledger.topArtists : legacy?.topArtists ?? []).map((a) => ({
          artist: a.artist,
          plays: a.plays,
          artwork: (a as { artwork?: string }).artwork,
        })),
        topTracks: (ledger?.topTracks?.length
          ? ledger.topTracks
          : (legacy?.topTracks ?? []).map((e) => ({ track: e.track, plays: e.count }))),
        byHour: ledgerUsable ? ledger?.byHour : undefined,
        streakDays: ledgerUsable ? ledger?.streakDays : undefined,
        skipRate: ledgerUsable ? ledger?.skipRate : undefined,
        sessions: ledgerUsable ? ledger?.sessions : undefined,
      };
      setStats(merged);
    })();
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <PressableScale hitSlop={12} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.topLabel}>Your Sound</Text>
        <PressableScale hitSlop={12} onPress={() => nav.navigate('Taste')}>
          <Ionicons name="finger-print-outline" size={22} color={colors.textDim} />
        </PressableScale>
      </View>

      {!stats ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Crunching your listening data…</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
          {/* Hero stats — wearing the current song's palette */}
          <LinearGradient
            colors={[withAlpha(palette.deep, 0.95), withAlpha(palette.vibrant, 0.5)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, { borderColor: withAlpha(palette.glow, 0.25) }]}
          >
            <Text style={styles.heroTitle}>Your listening</Text>
            <View style={styles.heroRow}>
              <HeroStat value={fmtMinutes(stats.minutes)} label="minutes" />
              <HeroStat value={String(stats.streams)} label="streams" />
              <HeroStat value={String(stats.songs)} label="songs" />
            </View>
            {stats.streakDays != null && stats.streakDays > 0 ? (
              <View style={styles.streakRow}>
                <Ionicons name="flame" size={14} color={colors.aiEnd} />
                <Text style={styles.streakText}>
                  {stats.streakDays}-day streak · {Math.round((stats.skipRate ?? 0) * 100)}% skip rate
                  {stats.sessions ? ` · ${stats.sessions} sessions` : ''}
                </Text>
              </View>
            ) : null}
          </LinearGradient>

          {/* Taste DNA entry — see and edit what the app believes (§6.6) */}
          <PressableScale haptic style={styles.dnaCard} onPress={() => nav.navigate('Taste')}>
            <Ionicons name="finger-print" size={22} color={colors.aiEnd} />
            <View style={{ flex: 1 }}>
              <Text style={styles.dnaTitle}>Taste DNA</Text>
              <Text style={styles.dnaSub}>See what TSF AI believes about you — and change it</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
          </PressableScale>

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
                    {a.plays} {a.plays === 1 ? 'stream' : 'streams'}
                  </Text>
                </View>
                {i === 0 ? <Ionicons name="trophy" size={18} color={colors.aiEnd} /> : null}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Play some music to build your taste profile</Text>
          )}

          {/* Listening clock — the ledger's visible proof (§9.7) */}
          {stats.byHour && stats.byHour.some((n) => n > 0) ? <ListeningClock byHour={stats.byHour} /> : null}

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
                      {e.track.artist} · {e.plays} {e.plays === 1 ? 'stream' : 'streams'}
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
    marginBottom: spacing.sm,
    borderRadius: radius.squircle,
    padding: spacing.xl,
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  heroTitle: { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold, opacity: 0.9 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },
  heroStat: { alignItems: 'center', gap: 2 },
  heroValue: { color: '#fff', fontSize: 26, fontWeight: '900', fontFamily: fonts.black },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: fonts.medium },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  streakText: { color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontFamily: fonts.medium },
  dnaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  dnaTitle: { color: colors.text, fontSize: 15, fontWeight: '700', fontFamily: fonts.bold },
  dnaSub: { color: colors.textDim, fontSize: 12, fontFamily: fonts.regular, marginTop: 2 },
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
  clockWrap: {
    margin: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  clockTitle: { color: colors.text, fontSize: 15, fontWeight: '700', fontFamily: fonts.bold },
  clockSub: { color: colors.textDim, fontSize: 12, fontFamily: fonts.regular, marginTop: 2, marginBottom: spacing.md },
  clockRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 80 },
  clockCol: { flex: 1, alignItems: 'center' },
  clockBarWrap: { height: 64, justifyContent: 'flex-end' },
  clockBar: { width: '100%', borderRadius: 2, minHeight: 3 },
  clockLabel: { color: colors.textFaint, fontSize: 9, fontFamily: fonts.medium, marginTop: 2 },
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
