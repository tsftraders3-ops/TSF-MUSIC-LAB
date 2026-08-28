/**
 * Player v3 — the inspiration-fueled now-playing experience:
 *   artwork-blurred backdrop tinted by the song's extracted palette ·
 *   rotating VINYL disc with the cover as the record label (inspo 3/5) ·
 *   WAVEFORM scrubber — 44 song-shaped bars, played side glowing in the
 *   track's accent (inspo 3) · glass chips for Smart Shuffle / Autoplay ·
 *   queue sheet (now playing + next up) · song radio · share · download.
 *
 * Performance: exactly ONE BlurView (backdrop), one native-driver rotation
 * loop, and 44 static-height bars whose colors change with progress.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from 'react-native-track-player';
import type { Track } from '../types';
import { getRadio } from '../ai/engine';
import { usePlayer } from '../player/PlayerProvider';
import { downloadTrack, deleteDownload } from '../storage/downloads';
import { getDownloadIndex } from '../storage/store';
import { Artwork } from '../components/Artwork';
import { TrackRow, EqualizerBars } from '../components/TrackRow';
import { PressableScale } from '../components/PressableScale';
import { TrackMenu } from '../components/TrackMenu';
import { useToast } from '../components/Toast';
import { withAlpha } from '../theme/dynamic';
import { useDynamicPalette } from '../theme/DynamicThemeProvider';
import { colors, fonts, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ── deterministic per-song waveform silhouette ─────────────────────── */

function makeBars(seed: string, count: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    return h / 4294967295;
  };
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;
  const f1 = 0.42 + rand() * 0.25;
  const f2 = 0.16 + rand() * 0.12;
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const wave =
      0.52 * Math.abs(Math.sin(t * Math.PI * f1 * count + p1)) +
      0.32 * Math.abs(Math.sin(t * Math.PI * f2 * count + p2)) +
      0.16 * rand();
    bars.push(Math.min(1, Math.max(0.22, 0.34 + wave * 0.66)));
  }
  return bars;
}

/* ── waveform scrubber (inspo 3) ─────────────────────────────────────── */

function WaveformScrubber({
  trackKey,
  duration,
  position,
  scrubbing,
  scrubValue,
  glow,
  onScrubStart,
  onScrubMove,
  onScrubEnd,
}: {
  trackKey: string;
  duration: number;
  position: number;
  scrubbing: boolean;
  scrubValue: number;
  glow: string;
  onScrubStart: () => void;
  onScrubMove: (seconds: number) => void;
  onScrubEnd: (seconds: number) => void;
}) {
  const BAR_COUNT = 44;
  const HEIGHT = 40;
  const bars = useMemo(() => makeBars(trackKey, BAR_COUNT), [trackKey]);
  const widthRef = useRef(1);

  const ratio =
    duration > 0 ? Math.min(1, (scrubbing ? scrubValue : position) / duration) : 0;
  const playedBars = Math.round(ratio * BAR_COUNT);

  const ratioFromEvent = (x: number): number => {
    const w = widthRef.current || 1;
    return Math.min(1, Math.max(0, x / w));
  };

  return (
    <View
      style={styles.wave}
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
      }}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(e) => {
        onScrubStart();
        onScrubMove(ratioFromEvent(e.nativeEvent.locationX) * duration);
      }}
      onResponderMove={(e) => {
        onScrubMove(ratioFromEvent(e.nativeEvent.locationX) * duration);
      }}
      onResponderRelease={(e) => {
        onScrubEnd(ratioFromEvent(e.nativeEvent.locationX) * duration);
      }}
      onResponderTerminate={() => onScrubEnd(scrubValue)}
    >
      {bars.map((h, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: Math.round(h * HEIGHT),
            borderRadius: 2,
            backgroundColor:
              i < playedBars ? glow : i === playedBars ? withAlpha(glow, 0.55) : 'rgba(255,255,255,0.18)',
          }}
        />
      ))}
    </View>
  );
}

/* ── vinyl disc (inspo 3/5) ─────────────────────────────────────────── */

function VinylDisc({
  artwork,
  seed,
  size,
  spinning,
  glow,
}: {
  artwork?: string;
  seed: string;
  size: number;
  spinning: boolean;
  glow: string;
}) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinning) {
      const loop = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 24000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loop.start();
      return () => loop.stop();
    }
    return undefined;
  }, [spinning, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const labelSize = Math.round(size * 0.62);

  return (
    <Animated.View
      style={[
        styles.vinyl,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ rotate }],
          shadowColor: glow,
        },
      ]}
    >
      {/* groove rings */}
      <View
        style={{
          position: 'absolute',
          top: size * 0.045,
          left: size * 0.045,
          right: size * 0.045,
          bottom: size * 0.045,
          borderRadius: size * 0.455,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(255,255,255,0.055)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: size * 0.14,
          left: size * 0.14,
          right: size * 0.14,
          bottom: size * 0.14,
          borderRadius: size * 0.36,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(255,255,255,0.04)',
        }}
      />
      {/* the record label = album art */}
      <View
        style={{
          width: labelSize,
          height: labelSize,
          borderRadius: labelSize / 2,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Artwork uri={artwork} seed={seed} size={labelSize} variant="circle" />
        {/* spindle hole */}
        <View style={styles.spindle} />
      </View>
    </Animated.View>
  );
}

export function PlayerScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();
  const palette = useDynamicPalette();
  const {
    active,
    isPlaying,
    loading,
    queue,
    shuffle,
    smartShuffle,
    autoplay,
    repeat,
    favorites,
    toggleLike,
    togglePlay,
    next,
    prev,
    seek,
    setShuffle,
    setSmartShuffle,
    setAutoplay,
    cycleRepeat,
    playQueue,
    removeFromQueue,
    refreshQueue,
  } = usePlayer();

  const { position, duration: liveDuration } = useProgress(250);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const duration = liveDuration > 0 ? liveDuration : active?.duration ?? 0;
  const position_ = scrubbing ? scrubValue : position;

  const [showQueue, setShowQueue] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');
  const [downloadPct, setDownloadPct] = useState(0);
  const [radioLoading, setRadioLoading] = useState(false);

  const isFav = active ? favorites.has(active.id) : false;
  const trackKey = active?.id ?? 'none';
  // vinyl breathes with the screen: 300 on standard phones, smaller on compact ones
  const discSize = Math.min(320, Math.max(240, Dimensions.get('window').width - 100));

  useEffect(() => {
    void refreshQueue();
  }, [refreshQueue]);

  useEffect(() => {
    setDownloadState('idle');
    setDownloadPct(0);
    let cancelled = false;
    if (active) {
      getDownloadIndex().then((index) => {
        if (cancelled) return;
        setDownloadState(index.some((t) => t.id === active.id) ? 'done' : 'idle');
      });
    }
    return () => {
      cancelled = true;
    };
  }, [trackKey]);

  const onDownload = async () => {
    if (!active || downloadState === 'downloading') return;
    setDownloadState('downloading');
    const ok = await downloadTrack(active, (p) => setDownloadPct(Math.round(p * 100)));
    setDownloadState(ok ? 'done' : 'error');
  };

  const onRemoveDownload = async () => {
    if (!active) return;
    await deleteDownload(active);
    setDownloadState('idle');
    toast.show({ message: 'Download removed', icon: 'trash-outline' });
  };

  const startRadio = async () => {
    if (!active || radioLoading) return;
    setRadioLoading(true);
    toast.show({ message: 'Building your radio…', icon: 'radio-outline' });
    try {
      const radio = await getRadio(active, 12);
      if (radio.length) {
        await playQueue([active, ...radio], 0);
        toast.show({ message: `Radio started · ${radio.length + 1} songs`, icon: 'radio' });
      } else {
        toast.show({
          message: 'Not enough songs for a radio — try another track',
          icon: 'alert-circle-outline',
        });
      }
    } finally {
      setRadioLoading(false);
    }
  };

  const onShare = async () => {
    if (!active) return;
    try {
      await Share.share({
        message: `🎶 ${active.title} — ${active.artist}\nPlaying on TSF Music`,
      });
    } catch {
      /* user cancelled */
    }
  };

  const repeatActive = repeat !== 'off';

  const trackName = active?.title ?? 'Nothing playing';
  const artistName = active?.artist ?? '—';

  return (
    <View style={styles.root}>
      {/* Blurred artwork backdrop, tinted by the song's palette */}
      {active?.artwork ? (
        <View style={StyleSheet.absoluteFill}>
          <Image source={{ uri: active.artwork }} style={styles.backdrop} resizeMode="cover" />
          <BlurView intensity={45} experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={[withAlpha(palette.deep, 0.62), 'rgba(4,5,8,0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      ) : (
        <LinearGradient
          colors={[palette.deep, '#050609']}
          style={StyleSheet.absoluteFill}
        />
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable hitSlop={12} onPress={() => nav.goBack()}>
            <Ionicons name="chevron-down" size={28} color={colors.text} />
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.topLabel}>Playing from</Text>
            <Text style={styles.topSub} numberOfLines={1}>
              {active?.album ?? 'TSF Music'}
            </Text>
          </View>
          <Pressable hitSlop={12} onPress={() => setShowMore(true)}>
            <Ionicons name="ellipsis-horizontal" size={26} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.artWrap}>
          <VinylDisc
            artwork={active?.artwork}
            seed={trackKey}
            size={discSize}
            spinning={isPlaying}
            glow={palette.glow}
          />
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleActions}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {trackName}
              </Text>
              <Text style={[styles.artist, { color: palette.glow }]} numberOfLines={1}>
                {artistName}
              </Text>
            </View>
            <PressableScale hitSlop={10} haptic onPress={() => active && toggleLike(active)}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={27}
                color={isFav ? palette.glow : colors.textDim}
              />
            </PressableScale>
          </View>
        </View>

        <View style={styles.progressSection}>
          <WaveformScrubber
            trackKey={trackKey}
            duration={Math.max(1, duration)}
            position={position}
            scrubbing={scrubbing}
            scrubValue={scrubValue}
            glow={palette.glow}
            onScrubStart={() => {
              setScrubbing(true);
              setScrubValue(position);
            }}
            onScrubMove={(sec) => setScrubValue(sec)}
            onScrubEnd={(sec) => {
              setScrubbing(false);
              void seek(sec);
            }}
          />
          <View style={styles.timeRow}>
            <Text style={styles.time}>{fmt(position_)}</Text>
            <Text style={styles.time}>{fmt(duration)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <PressableScale hitSlop={10} onPress={() => setShuffle(!shuffle)}>
            <Ionicons
              name="shuffle"
              size={26}
              color={shuffle ? palette.glow : colors.textDim}
            />
          </PressableScale>
          <PressableScale hitSlop={10} onPress={prev} disabled={!active}>
            <Ionicons name="play-skip-back" size={36} color={colors.text} />
          </PressableScale>
          <PressableScale
            style={[styles.playBtn, { shadowColor: palette.glow }]}
            onPress={togglePlay}
            disabled={!active}
            haptic
          >
            {loading ? (
              <View style={styles.spinnerWrap}>
                <PulseDot glow={palette.glow} />
              </View>
            ) : (
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={40}
                color={colors.bgDeep}
              />
            )}
          </PressableScale>
          <PressableScale hitSlop={10} onPress={next} disabled={!active}>
            <Ionicons name="play-skip-forward" size={36} color={colors.text} />
          </PressableScale>
          <PressableScale hitSlop={10} onPress={cycleRepeat}>
            <View>
              <Ionicons
                name="repeat"
                size={26}
                color={repeatActive ? palette.glow : colors.textDim}
              />
              {repeat === 'track' ? (
                <View style={[styles.repeatOne, { backgroundColor: palette.glow }]} />
              ) : null}
            </View>
          </PressableScale>
        </View>

        {/* Bottom action row — glass chips */}
        <View style={styles.bottomRow}>
          <PressableScale hitSlop={10} onPress={onShare} disabled={!active}>
            <Ionicons name="share-social-outline" size={22} color={colors.textDim} />
          </PressableScale>
          <PressableScale
            hitSlop={10}
            haptic
            onPress={() => setSmartShuffle(!smartShuffle)}
            style={[
              styles.smartBtn,
              smartShuffle && {
                backgroundColor: withAlpha(palette.vibrant, 0.16),
                borderColor: withAlpha(palette.glow, 0.38),
              },
            ]}
          >
            <Ionicons
              name="sparkles"
              size={20}
              color={smartShuffle ? palette.glow : colors.textDim}
            />
            <Text style={[styles.smartText, smartShuffle && { color: palette.glow }]}>
              Smart Shuffle
            </Text>
          </PressableScale>
          <PressableScale hitSlop={10} onPress={() => setShowQueue(true)}>
            <Ionicons name="list" size={24} color={colors.textDim} />
          </PressableScale>
        </View>

        <View style={styles.autoRow}>
          <PressableScale
            hitSlop={10}
            haptic
            onPress={() => setAutoplay(!autoplay)}
            style={[
              styles.autoBtn,
              autoplay && {
                backgroundColor: withAlpha(colors.accent, 0.16),
                borderColor: withAlpha(colors.accentBright, 0.35),
              },
            ]}
          >
            <Ionicons
              name="radio-outline"
              size={16}
              color={autoplay ? colors.accentBright : colors.textFaint}
            />
            <Text style={[styles.autoText, autoplay && { color: colors.accentBright }]}>
              Autoplay {autoplay ? 'on' : 'off'}
            </Text>
          </PressableScale>
        </View>

        {active?.previewOnly ? (
          <Text style={styles.previewNote}>30-second preview (full stream unavailable)</Text>
        ) : null}
      </ScrollView>

      {/* Queue sheet */}
      <Modal visible={showQueue} animationType="slide" onRequestClose={() => setShowQueue(false)}>
        <View style={[styles.queueRoot, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.queueHeader}>
            <Pressable hitSlop={12} onPress={() => setShowQueue(false)}>
              <Ionicons name="chevron-down" size={26} color={colors.text} />
            </Pressable>
            <Text style={styles.queueTitle}>Queue · {queue.length}</Text>
            <View style={{ width: 26 }} />
          </View>
          <QueueList
            onItemPress={() => setShowQueue(false)}
            onRemove={(id) => void removeFromQueue(id)}
          />
        </View>
      </Modal>

      {/* More menu */}
      <TrackMenu
        track={active}
        visible={showMore}
        onClose={() => setShowMore(false)}
        extraActions={[
          {
            icon: radioLoading ? 'hourglass-outline' : 'radio-outline',
            label: radioLoading ? 'Building radio…' : 'Start song radio',
            onPress: () => void startRadio(),
          },
          {
            icon: 'share-social-outline',
            label: 'Share',
            onPress: () => void onShare(),
          },
          ...(downloadState === 'done'
            ? [
                {
                  icon: 'trash-outline' as const,
                  label: 'Remove download' as string,
                  onPress: () => void onRemoveDownload(),
                },
              ]
            : []),
        ]}
      />
    </View>
  );
}

function PulseDot({ glow }: { glow: string }) {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 420, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: glow,
        opacity: pulse,
      }}
    />
  );
}

function QueueList({
  onItemPress,
  onRemove,
}: {
  onItemPress: () => void;
  onRemove: (id: string) => void;
}) {
  const { queue, active, isPlaying, playQueue } = usePlayer();
  const activeIdx = queue.findIndex((t) => t.id === active?.id);
  const upcoming = activeIdx >= 0 ? queue.slice(activeIdx + 1) : queue;

  return (
    <FlatList
      data={upcoming}
      keyExtractor={(t) => t.id}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListHeaderComponent={
        <View>
          {active ? (
            <>
              <Text style={styles.queueSection}>Now playing</Text>
              <View style={styles.nowRow}>
                <View style={styles.nowArtWrap}>
                  <Artwork uri={active.artwork} seed={active.id} size={46} />
                  <View style={styles.nowOverlay}>
                    <EqualizerBars playing={isPlaying} size={16} />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nowTitle} numberOfLines={1}>
                    {active.title}
                  </Text>
                  <Text style={styles.nowSub} numberOfLines={1}>
                    {active.artist}
                  </Text>
                </View>
              </View>
            </>
          ) : null}
          <Text style={styles.queueSection}>Next up</Text>
          {upcoming.length === 0 ? (
            <Text style={styles.queueEmpty}>
              Nothing queued — Autoplay radio keeps the music going
            </Text>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.queueRowWrap}>
          <TrackRow
            track={item}
            showHeart={false}
            onPress={() => {
              playQueue(queue, queue.findIndex((x) => x.id === item.id));
              onItemPress();
            }}
            right={
              <PressableScale hitSlop={12} onPress={() => onRemove(item.id)} style={styles.removeBtn}>
                <Ionicons name="close" size={20} color={colors.textFaint} />
              </PressableScale>
            }
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgDeep },
  scroll: { flex: 1, paddingHorizontal: spacing.xl, gap: spacing.lg },
  backdrop: { width: '100%', height: '100%', transform: [{ scale: 1.6 }] },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  topSub: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: fonts.semibold,
    maxWidth: 180,
  },
  artWrap: { alignItems: 'center', paddingVertical: spacing.xl + 4 },
  vinyl: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0D11',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    shadowOpacity: 0.5,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 18 },
    elevation: 20,
  },
  spindle: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#0A0B0E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  titleSection: { gap: spacing.sm },
  titleActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    fontFamily: fonts.extrabold,
    letterSpacing: -0.3,
  },
  artist: { fontSize: 16, fontFamily: fonts.medium, marginTop: 2 },
  progressSection: { gap: 8 },
  wave: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 40,
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '600', fontFamily: fonts.semibold },
  repeatOne: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.bgDeep,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginTop: spacing.xs,
  },
  playBtn: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    elevation: 16,
  },
  spinnerWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  smartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glass,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  smartText: { color: colors.textDim, fontSize: 12, fontWeight: '700', fontFamily: fonts.bold },
  autoRow: { alignItems: 'center' },
  autoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glass,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  autoText: { color: colors.textFaint, fontSize: 11, fontWeight: '700', fontFamily: fonts.bold },
  previewNote: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  queueRoot: { flex: 1, backgroundColor: colors.bg },
  queueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  queueTitle: { color: colors.text, fontSize: 18, fontWeight: '800', fontFamily: fonts.extrabold },
  queueSection: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  nowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  nowArtWrap: { position: 'relative' },
  nowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  nowTitle: { color: colors.accentBright, fontSize: 15, fontWeight: '600', fontFamily: fonts.semibold },
  nowSub: { color: colors.textDim, fontSize: 12.5, fontFamily: fonts.regular },
  queueEmpty: {
    color: colors.textFaint,
    fontSize: 13,
    fontFamily: fonts.regular,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  queueRowWrap: { paddingRight: spacing.sm },
  removeBtn: { padding: 10 },
});
