/**
 * OnboardingPick5 (§9.9) — the first 30 minutes, engineered.
 *
 * Pick-5 artists (language tabs, chart-anchored; skip allowed) → instant
 * profile seeds at weight 3.0 each (≈6h of listening equivalent, §6.7)
 * → first session runs exploration-heavy (the bandit is the cold-start
 * engine). Shown once; "skip" is a first-class choice.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchSaavnClean } from '../api/saavn';
import { mindbeat } from '../ai/mindbeat';
import { PressableScale } from './PressableScale';
import { colors, fonts, radius, spacing } from '../theme';

const TABS: Array<{ key: string; label: string; query: string }> = [
  { key: 'hindi', label: 'Hindi', query: 'top hindi hits' },
  { key: 'punjabi', label: 'Punjabi', query: 'top punjabi hits' },
  { key: 'english', label: 'English', query: 'top english hits' },
  { key: 'punjabi2', label: 'Rap', query: 'top desi hip hop' },
];

const SEED_COUNT = 5;

export function OnboardingPick5({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState(TABS[0]!.key);
  const [artistsByTab, setArtistsByTab] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const done = await mindbeat.kvGet<boolean>('onboardingDone');
      if (!done) setVisible(true);
    })().catch(() => undefined);
  }, []);

  const loadTab = async (key: string, query: string) => {
    if (artistsByTab[key]) return;
    setLoading(true);
    try {
      const tracks = await searchSaavnClean(query, 30);
      const artists: string[] = [];
      for (const t of tracks) {
        const a = t.artist.split(' feat')[0]!.trim();
        if (a && a !== 'Unknown artist' && !artists.some((x) => x.toLowerCase() === a.toLowerCase())) {
          artists.push(a);
        }
        if (artists.length >= 18) break;
      }
      setArtistsByTab((prev) => ({ ...prev, [key]: artists }));
    } catch {
      setArtistsByTab((prev) => ({ ...prev, [key]: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = TABS.find((x) => x.key === tab);
    if (t) void loadTab(t.key, t.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const toggle = (artist: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(artist)) next.delete(artist);
      else if (next.size < SEED_COUNT) next.add(artist);
      return next;
    });
  };

  const finish = async (withPicks: boolean) => {
    await mindbeat.kvSet('onboardingDone', true);
    if (withPicks && picked.size) {
      await mindbeat.setOnboardingSeeds([...picked]);
    }
    setVisible(false);
    onDone();
  };

  const artists = useMemo(() => artistsByTab[tab] ?? [], [artistsByTab, tab]);

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={() => void finish(false)}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={18} color={colors.textOnGreen} />
          </View>
          <Text style={styles.title}>Pick 5 artists</Text>
          <Text style={styles.sub}>
            TSF AI starts learning from these — your radio, mixes and shuffle get smarter from the first song. You can
            change everything later in Taste DNA.
          </Text>

          <View style={styles.tabs}>
            {TABS.map((t) => (
              <PressableScale
                key={t.key}
                haptic
                onPress={() => setTab(t.key)}
                style={[styles.tab, tab === t.key && styles.tabActive]}
              >
                <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
              </PressableScale>
            ))}
          </View>

          <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
            {loading && !artists.length ? (
              <View style={styles.loadingWrap}>
                <ActivityIndicator color={colors.accentBright} />
              </View>
            ) : (
              <View style={styles.grid}>
                {artists.map((a) => {
                  const on = picked.has(a);
                  return (
                    <PressableScale
                      key={a}
                      haptic
                      onPress={() => toggle(a)}
                      style={[styles.artistChip, on && styles.artistChipOn]}
                    >
                      {on ? <Ionicons name="checkmark-circle" size={14} color={colors.textOnGreen} /> : null}
                      <Text style={[styles.artistChipText, on && styles.artistChipTextOn]} numberOfLines={1}>
                        {a}
                      </Text>
                    </PressableScale>
                  );
                })}
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <PressableScale haptic onPress={() => void finish(false)} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </PressableScale>
            <PressableScale
              haptic
              disabled={picked.size === 0}
              onPress={() => void finish(true)}
              style={[styles.goBtn, picked.size === 0 && { opacity: 0.4 }]}
            >
              <Text style={styles.goText}>{picked.size < SEED_COUNT ? `Start (${picked.size}/5)` : 'Start'}</Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  sheet: {
    width: '100%',
    maxHeight: '86%',
    backgroundColor: colors.surface,
    borderRadius: radius.squircle,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.md,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accentBright,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: { color: colors.text, fontSize: 22, fontWeight: '900', fontFamily: fonts.black, textAlign: 'center' },
  sub: { color: colors.textDim, fontSize: 12.5, fontFamily: fonts.regular, textAlign: 'center', lineHeight: 17 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.cardDim,
  },
  tabActive: { backgroundColor: colors.accentBright },
  tabText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.medium },
  tabTextActive: { color: colors.textOnGreen, fontWeight: '700', fontFamily: fonts.bold },
  loadingWrap: { paddingVertical: 40, alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: spacing.sm },
  artistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.cardDim,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    maxWidth: '100%',
  },
  artistChipOn: { backgroundColor: colors.accentBright, borderColor: colors.accentBright },
  artistChipText: { color: colors.text, fontSize: 13, fontFamily: fonts.medium },
  artistChipTextOn: { color: colors.textOnGreen, fontWeight: '700', fontFamily: fonts.bold },
  footer: { flexDirection: 'row', gap: 10, marginTop: spacing.xs },
  skipBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: radius.md,
    backgroundColor: colors.cardDim,
    alignItems: 'center',
  },
  skipText: { color: colors.textDim, fontSize: 14.5, fontWeight: '700', fontFamily: fonts.bold },
  goBtn: {
    flex: 2,
    paddingVertical: 13,
    borderRadius: radius.md,
    backgroundColor: colors.accentBright,
    alignItems: 'center',
  },
  goText: { color: colors.textOnGreen, fontSize: 14.5, fontWeight: '800', fontFamily: fonts.extrabold },
});
