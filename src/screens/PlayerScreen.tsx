import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';
import { usePlayer } from '../player/PlayerProvider';
import { downloadTrack, deleteDownload } from '../storage/downloads';
import { getDownloadIndex } from '../storage/store';
import { Artwork } from '../components/Artwork';
import { TrackRow } from '../components/TrackRow';
import { colors, spacing, radius, type as typo } from '../theme';
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
  const {
    active,
    isPlaying,
    loading,
    queue,
    shuffle,
    repeat,
    favorites,
    toggleLike,
    togglePlay,
    next,
    prev,
    seek,
    setShuffle,
    cycleRepeat,
  } = usePlayer();
  const { position, duration: liveDuration } = useProgress(250);
  // Local scrub state — without it the thumb snaps back mid-drag.
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const duration = liveDuration > 0 ? liveDuration : active?.duration ?? 0;
  const position_ = scrubbing ? scrubValue : position;

  const [showQueue, setShowQueue] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');
  const [downloadPct, setDownloadPct] = useState(0);
  const artScale = useRef(new Animated.Value(1)).current;

  const isFav = active ? favorites.has(active.id) : false;
  const trackKey = active?.id ?? 'none';

  useEffect(() => {
    Animated.spring(artScale, {
      toValue: isPlaying ? 1 : 0.86,
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
      // Index + file must agree — a partial file without an index entry
      // is a broken download, not a finished one.
      getDownloadIndex().then(async (index) => {
        if (cancelled) return;
        const entry = index.find((t) => t.id === active.id);
        setDownloadState(entry ? 'done' : 'idle');
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
  };

  const repeatIcon = repeat === 'off' ? 'repeat-outline' : 'repeat';
  const repeatActive = repeat !== 'off';

  const trackName = active?.title ?? 'Nothing playing';
  const artistName = active?.artist ?? '—';

  return (
    <View style={styles.root}>
      <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topRow}>
            <Pressable hitSlop={12} onPress={() => nav.goBack()}>
              <Ionicons name="chevron-down" size={28} color={colors.text} />
            </Pressable>
            <Text style={styles.topLabel}>Now Playing</Text>
            <Pressable hitSlop={12} onPress={() => setShowQueue(true)}>
              <Ionicons name="list" size={24} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.artWrap}>
            <Animated.View style={{ transform: [{ scale: artScale }] }}>
              {active ? (
                <Artwork uri={active.artwork} seed={active.id} size={300} style={styles.art} />
              ) : (
                <Artwork seed="empty" size={300} style={styles.art} />
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
              <Pressable hitSlop={10} onPress={() => active && toggleLike(active)}>
                <Ionicons
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={26}
                  color={isFav ? colors.accent : colors.textDim}
                />
              </Pressable>
              {downloadState === 'done' ? (
                <Pressable hitSlop={10} onPress={onRemoveDownload}>
                  <Ionicons name="checkmark-circle" size={26} color={colors.accent} />
                </Pressable>
              ) : (
                <Pressable hitSlop={10} onPress={onDownload} disabled={!active || downloadState === 'downloading'}>
                  {downloadState === 'downloading' ? (
                    <View style={styles.dlPctWrap}>
                      <Text style={styles.dlPct}>{downloadPct}%</Text>
                    </View>
                  ) : (
                    <Ionicons
                      name={downloadState === 'error' ? 'alert-circle-outline' : 'arrow-down-circle-outline'}
                      size={26}
                      color={downloadState === 'error' ? colors.danger : colors.textDim}
                    />
                  )}
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.progressSection}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={Math.max(1, duration)}
              value={Math.min(position_, Math.max(1, duration))}
              minimumTrackTintColor={colors.accent}
              maximumTrackTintColor={colors.elevated}
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
            <Pressable hitSlop={10} onPress={() => setShuffle(!shuffle)}>
              <Ionicons
                name="shuffle"
                size={24}
                color={shuffle ? colors.accent : colors.textDim}
              />
            </Pressable>
            <Pressable hitSlop={10} onPress={prev} disabled={!active}>
              <Ionicons name="play-skip-back" size={34} color={colors.text} />
            </Pressable>
            <Pressable style={styles.playBtn} onPress={togglePlay} disabled={!active}>
              {loading ? (
                <ActivityIndicatorPlayer />
              ) : (
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color={colors.bg} />
              )}
            </Pressable>
            <Pressable hitSlop={10} onPress={next} disabled={!active}>
              <Ionicons name="play-skip-forward" size={34} color={colors.text} />
            </Pressable>
            <Pressable hitSlop={10} onPress={cycleRepeat}>
              <View>
                <Ionicons name={repeatIcon as any} size={24} color={repeatActive ? colors.accent : colors.textDim} />
                {repeat === 'track' && <View style={styles.repeatOne} />}
              </View>
            </Pressable>
          </View>

          {active?.previewOnly ? (
            <Text style={styles.previewNote}>30-second preview (full stream unavailable for this song)</Text>
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
            <FlatListQueue onItemPress={() => setShowQueue(false)} />
          </View>
        </Modal>
    </View>
  );
}

function ActivityIndicatorPlayer() {
  return (
    <View style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedSpinner />
    </View>
  );
}

function AnimatedSpinner() {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.linear }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);
  const rot = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return (
    <Animated.View
      style={{
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 3,
        borderColor: colors.bg,
        borderTopColor: 'transparent',
        transform: [{ rotate: rot }],
      }}
    />
  );
}

function FlatListQueue({ onItemPress }: { onItemPress: () => void }) {
  const { queue, playQueue } = usePlayer();
  return (
    <FlatList
      data={queue}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => (
        <TrackRow
          track={item}
          onPress={() => {
            playQueue(queue, queue.findIndex((x) => x.id === item.id));
            onItemPress();
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.xl, gap: spacing.lg, flexGrow: 1 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLabel: { color: colors.textFaint, fontSize: typo.micro, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  artWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  art: {
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  titleSection: { gap: spacing.sm },
  titleActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', letterSpacing: -0.3 },
  artist: { color: colors.textDim, fontSize: typo.body, marginTop: 2 },
  progressSection: { gap: 2 },
  slider: { width: '100%', height: 40 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  time: { color: colors.textFaint, fontSize: typo.micro, fontWeight: '600' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewNote: { color: colors.textFaint, fontSize: typo.micro, textAlign: 'center' },
  dlPctWrap: {
    width: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dlPct: { color: colors.accent, fontSize: 11, fontWeight: '800' },
  repeatOne: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  queueRoot: { flex: 1, backgroundColor: colors.bg },
  queueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  queueTitle: { color: colors.text, fontSize: typo.headline, fontWeight: '800' },
});
