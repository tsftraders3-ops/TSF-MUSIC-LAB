/**
 * Player v2 — the full Spotify now-playing experience:
 *   blurred artwork backdrop · scaled cover art · like + more ·
 *   scrub slider · control deck · Smart Shuffle & Autoplay toggles ·
 *   share · queue sheet (now playing + next up) · song radio · download.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
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
import Slider from '@react-native-community/slider';
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
import { colors, fonts, radius, spacing } from '../theme';
import type { RootStackParamList } from './navigation';

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PlayerScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();
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
  const artScale = useRef(new Animated.Value(1)).current;

  const isFav = active ? favorites.has(active.id) : false;
  const trackKey = active?.id ?? 'none';

  useEffect(() => {
    void refreshQueue();
  }, [refreshQueue]);

  useEffect(() => {
    Animated.spring(artScale, {
      toValue: isPlaying ? 1 : 0.88,
      friction: 8,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [isPlaying, artScale, trackKey]);

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
        toast.show({ message: 'Not enough songs for a radio — try another track', icon: 'alert-circle-outline' });
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
      {/* Blurred artwork backdrop */}
      {active?.artwork ? (
        <View style={StyleSheet.absoluteFill}>
          <Image source={{ uri: active.artwork }} style={styles.backdrop} resizeMode="cover" />
          <BlurView intensity={45} experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.55)' }]} />
        </View>
      ) : (
        <LinearGradient
          colors={['#1A1524', '#0E0E12', '#0A0A0B']}
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
          <Animated.View style={{ transform: [{ scale: artScale }] }}>
            {active ? (
              <Artwork uri={active.artwork} seed={active.id} size={320} style={styles.art} />
            ) : (
              <Artwork seed="empty" size={320} style={styles.art} />
            )}
          </Animated.View>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleActions}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {trackName}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {artistName}
              </Text>
            </View>
            <PressableScale hitSlop={10} haptic onPress={() => active && toggleLike(active)}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={27}
                color={isFav ? colors.accentBright : colors.textDim}
              />
            </PressableScale>
          </View>
        </View>

        <View style={styles.progressSection}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={Math.max(1, duration)}
            value={Math.min(position_, Math.max(1, duration))}
            minimumTrackTintColor={colors.text}
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbTintColor={colors.text}
            onSlidingStart={(v) => {
              setScrubbing(true);
              setScrubValue(v);
            }}
            onValueChange={(v) => setScrubValue(v)}
            onSlidingComplete={(v) => {
              setScrubbing(false);
              seek(v);
            }}
            disabled={!active}
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
              color={shuffle ? colors.accentBright : colors.textDim}
            />
          </PressableScale>
          <PressableScale hitSlop={10} onPress={prev} disabled={!active}>
            <Ionicons name="play-skip-back" size={36} color={colors.text} />
          </PressableScale>
          <PressableScale style={styles.playBtn} onPress={togglePlay} disabled={!active} haptic>
            {loading ? (
              <View style={styles.spinnerWrap}>
                <PulseDot />
              </View>
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color={colors.bg} />
            )}
          </PressableScale>
          <PressableScale hitSlop={10} onPress={next} disabled={!active}>
            <Ionicons name="play-skip-forward" size={36} color={colors.text} />
          </PressableScale>
          <PressableScale hitSlop={10} onPress={cycleRepeat}>
            <View>
              <Ionicons
                name={repeatActive ? 'repeat' : 'repeat'}
                size={26}
                color={repeatActive ? colors.accentBright : colors.textDim}
              />
              {repeat === 'track' ? <View style={styles.repeatOne} /> : null}
            </View>
          </PressableScale>
        </View>

        {/* Bottom action row */}
        <View style={styles.bottomRow}>
          <PressableScale hitSlop={10} onPress={onShare} disabled={!active}>
            <Ionicons name="share-social-outline" size={22} color={colors.textDim} />
          </PressableScale>
          <PressableScale
            hitSlop={10}
            haptic
            onPress={() => setSmartShuffle(!smartShuffle)}
            style={styles.smartBtn}
          >
            <Ionicons
              name="sparkles"
              size={22}
              color={smartShuffle ? colors.aiEnd : colors.textDim}
            />
            <Text style={[styles.smartText, smartShuffle && { color: colors.aiEnd }]}>
              Smart Shuffle
            </Text>
          </PressableScale>
          <PressableScale hitSlop={10} onPress={() => setShowQueue(true)}>
            <Ionicons name="list" size={24} color={colors.textDim} />
          </PressableScale>
        </View>

        <View style={styles.autoRow}>
          <PressableScale hitSlop={10} haptic onPress={() => setAutoplay(!autoplay)} style={styles.autoBtn}>
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

function PulseDot() {
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
        backgroundColor: colors.bg,
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
  topSub: { color: colors.text, fontSize: 13, fontWeight: '600', fontFamily: fonts.semibold, maxWidth: 180 },
  artWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  art: {
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOpacity: 0.65,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 18,
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
  artist: { color: colors.textDim, fontSize: 16, fontFamily: fonts.medium, marginTop: 2 },
  progressSection: { gap: 2 },
  slider: { width: '100%', height: 38 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: '600', fontFamily: fonts.semibold },
  repeatOne: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentBright,
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
  },
  spinnerWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  smartBtn: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  smartText: { color: colors.textDim, fontSize: 12, fontWeight: '700', fontFamily: fonts.bold },
  autoRow: { alignItems: 'center' },
  autoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
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
