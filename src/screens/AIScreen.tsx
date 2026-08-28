/**
 * AI screen — the TSF AI playlist generator.
 *
 * Type a vibe ("Punjabi gym bangers", "90s heartbreak Bollywood"),
 * watch the staged thinking animation, get a 25-track curated mix with
 * save-to-library, play, shuffle-play and regenerate. Fully on-device.
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
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
import { generatePlaylist, PROMPT_IDEAS, type GeneratedPlaylist } from '../ai/generator';
import { createPlaylist } from '../storage/store';
import { usePlayer } from '../player/PlayerProvider';
import { useToast } from '../components/Toast';
import { TrackRow } from '../components/TrackRow';
import { PressableScale } from '../components/PressableScale';
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

type Phase = 'idle' | 'understanding' | 'searching' | 'scoring' | 'done' | 'error';

const PHASE_LABEL: Record<Phase, string> = {
  idle: '',
  understanding: 'Understanding your vibe',
  searching: 'Digging through the catalog',
  scoring: 'Scoring & ordering tracks',
  done: 'Playlist ready',
  error: 'Something went wrong',
};

export function AIScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playQueue } = usePlayer();
  const toast = useToast();

  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [detail, setDetail] = useState('');
  const [result, setResult] = useState<GeneratedPlaylist | null>(null);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const orbit = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (phase === 'idle' || phase === 'done' || phase === 'error') return;
    const loop = Animated.loop(
      Animated.timing(orbit, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, orbit]);
  const spin = orbit.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const run = useCallback(async (text: string) => {
    const p = text.trim();
    if (!p) return;
    Keyboard.dismiss();
    setResult(null);
    setPhase('understanding');
    setDetail('Reading your vibe…');
    try {
      const generated = await generatePlaylist(p, (stage) => {
        setPhase(stage.phase === 'done' ? 'done' : stage.phase);
        setDetail(stage.detail);
      });
      if (!generated.tracks.length) {
        setPhase('error');
        setDetail('No songs matched — try different words');
        return;
      }
      setResult(generated);
      setPhase('done');
    } catch {
      setPhase('error');
      setDetail('Network hiccup — try again');
    }
  }, []);

  const save = useCallback(async () => {
    if (!result) return;
    setSaving(true);
    try {
      await createPlaylist(result.name, result.tracks);
      toast.show({ message: `Saved “${result.name}” to Your Library`, icon: 'checkmark-circle' });
    } finally {
      setSaving(false);
    }
  }, [result, toast]);

  const playAll = (shuffle: boolean) => {
    if (!result?.tracks.length) return;
    const list = shuffle ? [...result.tracks].sort(() => Math.random() - 0.5) : result.tracks;
    playQueue(list, 0);
    nav.navigate('Player');
  };

  const busy = phase === 'understanding' || phase === 'searching' || phase === 'scoring';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>TSF AI</Text>
        <Text style={styles.subtitle}>Describe a vibe. Get a playlist.</Text>
      </View>

      <View style={styles.inputWrap}>
        <LinearGradient
          colors={[colors.aiStart, colors.aiMid, colors.aiEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inputGlow}
        >
          <View style={styles.inputRow}>
            <Ionicons name="sparkles" size={20} color={colors.aiEnd} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="e.g. late night lofi for coding…"
              placeholderTextColor={colors.textFaint}
              value={prompt}
              onChangeText={setPrompt}
              returnKeyType="go"
              onSubmitEditing={() => run(prompt)}
              editable={!busy}
              multiline={false}
            />
            <PressableScale
              onPress={() => run(prompt)}
              disabled={!prompt.trim() || busy}
              haptic
              style={[styles.genBtn, (!prompt.trim() || busy) && { opacity: 0.4 }]}
            >
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </PressableScale>
          </View>
        </LinearGradient>
      </View>

      {busy ? (
        <View style={styles.thinking}>
          <Animated.View style={[styles.orbit, { transform: [{ rotate: spin }] }]}>
            <View style={styles.orbitDot} />
          </Animated.View>
          <View style={{ gap: 4, alignItems: 'center' }}>
            <Text style={styles.phaseText}>{PHASE_LABEL[phase]}</Text>
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        </View>
      ) : null}

      {phase === 'error' ? (
        <View style={styles.errorWrap}>
          <Ionicons name="cloud-offline-outline" size={34} color={colors.textFaint} />
          <Text style={styles.errorText}>{detail}</Text>
          <PressableScale onPress={() => run(prompt)} haptic style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </PressableScale>
        </View>
      ) : null}

      {result && phase === 'done' ? (
        <FlatList
          data={result.tracks}
          keyExtractor={(t) => t.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 170 }}
          ListHeaderComponent={
            <View style={styles.resultHeader}>
              <View style={styles.resultMeta}>
                <View style={styles.aiTag}>
                  <Ionicons name="sparkles" size={12} color={colors.aiEnd} />
                  <Text style={styles.aiTagText}>TSF AI</Text>
                </View>
                <Text style={styles.resultName} numberOfLines={2}>
                  {result.name}
                </Text>
                <Text style={styles.resultDesc} numberOfLines={2}>
                  {result.description}
                </Text>
                <View style={styles.resultActions}>
                  <PressableScale onPress={() => playAll(false)} haptic style={styles.playBtn}>
                    <Ionicons name="play" size={19} color={colors.accentDeep} />
                    <Text style={styles.playBtnText}>Play</Text>
                  </PressableScale>
                  <PressableScale onPress={() => playAll(true)} haptic style={styles.shuffleBtn}>
                    <Ionicons name="shuffle" size={17} color={colors.text} />
                    <Text style={styles.shuffleBtnText}>Shuffle</Text>
                  </PressableScale>
                  <PressableScale onPress={save} disabled={saving} haptic style={styles.iconBtn}>
                    {saving ? (
                      <ActivityIndicator size="small" color={colors.text} />
                    ) : (
                      <Ionicons name="add" size={22} color={colors.text} />
                    )}
                  </PressableScale>
                  <PressableScale onPress={() => run(prompt)} haptic style={styles.iconBtn}>
                    <Ionicons name="refresh" size={20} color={colors.text} />
                  </PressableScale>
                </View>
              </View>
              <Text style={styles.songsHeader}>
                Songs · {result.tracks.length}
              </Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <TrackRow
              track={item}
              onPress={() => {
                playQueue(result.tracks, index);
                nav.navigate('Player');
              }}
            />
          )}
        />
      ) : null}

      {!result && !busy && phase !== 'error' ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 170 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.ideasTitle}>Try one of these</Text>
          <View style={styles.ideasWrap}>
            {PROMPT_IDEAS.map((idea) => (
              <PressableScale
                key={idea}
                onPress={() => {
                  setPrompt(idea);
                  run(idea);
                }}
                haptic
                style={styles.ideaChip}
              >
                <Ionicons name="sparkles-outline" size={13} color={colors.aiEnd} />
                <Text style={styles.ideaText}>{idea}</Text>
              </PressableScale>
            ))}
          </View>
          <View style={styles.capability}>
            <Ionicons name="bulb-outline" size={18} color={colors.textDim} />
            <Text style={styles.capabilityText}>
              TSF AI runs 100% on your device — it understands artists, moods,
              genres and eras, then curates from millions of tracks. Smart
              Shuffle, Daily Mixes and Autoplay radio all learn from what you
              play.
            </Text>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg + 2, paddingBottom: spacing.md },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    fontFamily: fonts.black,
    letterSpacing: -0.4,
  },
  subtitle: { color: colors.textDim, fontSize: 14, fontFamily: fonts.medium, marginTop: 2 },
  inputWrap: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  inputGlow: { borderRadius: radius.xl, padding: 1.5 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#161620',
    borderRadius: radius.xl - 1,
    paddingLeft: spacing.lg,
    paddingRight: 5,
    height: 52,
  },
  input: { flex: 1, color: colors.text, fontSize: 15, fontFamily: fonts.medium },
  genBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.aiStart,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thinking: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: spacing.xxl,
  },
  orbit: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'rgba(124,77,255,0.25)',
    borderTopColor: colors.aiEnd,
  },
  orbitDot: { position: 'absolute', top: -3, left: 22, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.aiEnd },
  phaseText: { color: colors.text, fontSize: 16, fontWeight: '800', fontFamily: fonts.bold },
  detailText: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular },
  errorWrap: { alignItems: 'center', gap: spacing.md, paddingTop: spacing.xxl, padding: spacing.xl },
  errorText: { color: colors.textDim, fontSize: 14, fontFamily: fonts.medium },
  retryBtn: {
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: 10,
  },
  retryText: { color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  resultHeader: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  resultMeta: { gap: 6 },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,229,255,0.12)',
    borderRadius: radius.full,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  aiTagText: { color: colors.aiEnd, fontSize: 10, fontWeight: '800', fontFamily: fonts.bold, letterSpacing: 0.5 },
  resultName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: fonts.black,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  resultDesc: { color: colors.textDim, fontSize: 13, fontFamily: fonts.regular, lineHeight: 17 },
  resultActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.accentBright,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: 11,
  },
  playBtnText: { color: colors.accentDeep, fontSize: 15, fontWeight: '800', fontFamily: fonts.extrabold },
  shuffleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg + 4,
    paddingVertical: 11,
  },
  shuffleBtnText: { color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: fonts.bold },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songsHeader: {
    color: colors.textDim,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: fonts.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  ideasTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  ideasWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  ideaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
  },
  ideaText: { color: colors.text, fontSize: 13, fontFamily: fonts.medium },
  capability: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    backgroundColor: colors.cardDim,
    borderRadius: radius.lg,
    margin: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  capabilityText: {
    flex: 1,
    color: colors.textDim,
    fontSize: 12.5,
    fontFamily: fonts.regular,
    lineHeight: 18,
  },
});
