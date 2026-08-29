/**
 * Premium — the 4th bottom tab, styled like Spotify's Premium page:
 * giant bold white headline, feature rows with green checkmarks,
 * green pill CTA, fine print. CTA confirms TSF Music is already free.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PressableScale } from '../components/PressableScale';
import { useToast } from '../components/Toast';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

const FEATURES = [
  'Ad-free music, forever',
  'Unlimited skips and replays',
  'Offline downloads for any song',
  'AI playlists, radios and Daily Mixes',
  'Full audio quality on every track',
];

export function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 170, flexGrow: 1 }}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Premium</Text>
          <Text style={styles.heroSub}>
            Everything unlocked. Nothing to pay — TSF Music is free.
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionLabel}>INCLUDED IN TSF MUSIC</Text>
          {FEATURES.map((f) => (
            <View key={f} style={styles.featureRow}>
              <View style={styles.check}>
                <Ionicons name="checkmark" size={15} color={colors.textOnGreen} />
              </View>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}

          <PressableScale
            haptic
            scaleTo={0.97}
            style={styles.cta}
            onPress={() =>
              toast.show({ message: 'TSF Music is free — enjoy!', icon: 'heart' })
            }
          >
            <Text style={styles.ctaText}>Get Premium</Text>
          </PressableScale>

          <Text style={styles.fine}>
            Terms apply. TSF Music streams via public catalogs and personalizes
            entirely on your device.
          </Text>

          <PressableScale
            haptic
            scaleTo={0.97}
            style={styles.soundBtn}
            onPress={() => nav.navigate('Stats')}
          >
            <Ionicons name="pulse-outline" size={17} color={colors.textDim} />
            <Text style={styles.soundText}>See Your Sound — listening stats</Text>
          </PressableScale>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 60,
    fontWeight: '900',
    fontFamily: fonts.black,
    letterSpacing: -1.5,
    lineHeight: 62,
  },
  heroSub: {
    color: colors.textDim,
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 320,
  },
  body: { paddingHorizontal: spacing.lg, gap: 14, paddingBottom: 24 },
  sectionLabel: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: 1,
    marginTop: 6,
    marginBottom: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 5,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accentBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    color: colors.text,
    fontSize: 15.5,
    fontFamily: fonts.regular,
    flex: 1,
  },
  cta: {
    backgroundColor: colors.accentBright,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 18,
  },
  ctaText: {
    color: colors.textOnGreen,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
  },
  fine: {
    color: colors.textFaint,
    fontSize: 11.5,
    fontFamily: fonts.regular,
    lineHeight: 16,
    marginTop: 4,
  },
  soundBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginTop: 8,
  },
  soundText: {
    color: colors.textDim,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fonts.semibold,
  },
});
