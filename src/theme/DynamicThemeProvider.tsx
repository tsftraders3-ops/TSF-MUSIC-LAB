/**
 * DynamicThemeProvider — paints the whole app with the current song.
 *
 * • Watches the active track in PlayerProvider and extracts its artwork
 *   palette (cached, off-render-path).
 * • AmbientBackdrop: the cross-fading tinted gradient wash that sits
 *   behind the tab screens — two stacked gradient groups, native-driver
 *   opacity fade, zero re-render of screen content during the fade.
 * • useTrackPalette: per-card hook (hero cards, collection headers) so
 *   any surface can wear its own artwork's colors.
 *
 * Performance contract:
 *   - exactly ONE AmbientBackdrop instance for the whole tab area
 *   - gradients are static views; only a single opacity animates
 *   - no blur anywhere in this file (glass = translucency + hairlines)
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePlayer } from '../player/PlayerProvider';
import {
  extractPalette,
  fallbackPalette,
  withAlpha,
  type DynamicPalette,
} from './dynamic';

const DynamicPaletteContext = createContext<DynamicPalette>(fallbackPalette('tsf'));

/** The palette of whatever is playing right now. */
export function useDynamicPalette(): DynamicPalette {
  return useContext(DynamicPaletteContext);
}

/**
 * Palette for an arbitrary artwork (hero card, collection header…).
 * Starts on a deterministic fallback, refines when extraction lands.
 */
export function useTrackPalette(artwork?: string, seed?: string): DynamicPalette {
  const [palette, setPalette] = useState<DynamicPalette>(() => fallbackPalette(seed ?? 'tsf'));

  useEffect(() => {
    if (!seed) return;
    if (!artwork) {
      setPalette(fallbackPalette(seed));
      return;
    }
    let cancelled = false;
    extractPalette(artwork, seed)
      .then((p) => {
        if (!cancelled) setPalette(p);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [artwork, seed]);

  return palette;
}

export function DynamicThemeProvider({ children }: { children: ReactNode }) {
  const { active } = usePlayer();
  const [palette, setPalette] = useState<DynamicPalette>(() => fallbackPalette('tsf-welcome'));

  const artwork = active?.artwork;
  const trackId = active?.id;

  useEffect(() => {
    if (!trackId) {
      setPalette(fallbackPalette('tsf-welcome'));
      return;
    }
    if (!artwork) {
      setPalette(fallbackPalette(trackId));
      return;
    }
    let cancelled = false;
    extractPalette(artwork, trackId)
      .then((p) => {
        if (!cancelled) setPalette(p);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [trackId, artwork]);

  const value = useMemo(() => palette, [palette]);
  return (
    <DynamicPaletteContext.Provider value={value}>
      {children}
    </DynamicPaletteContext.Provider>
  );
}

/* ── AmbientBackdrop ────────────────────────────────────────────────── */

/** One palette painted as a soft two-corner + floor wash. */
function AmbientLayer({ palette }: { palette: DynamicPalette }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* top sheet — deep tint fading down over half the screen */}
      <LinearGradient
        colors={[
          withAlpha(palette.deep, 0.94),
          withAlpha(palette.deep, 0.42),
          'rgba(0,0,0,0)',
        ]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={[StyleSheet.absoluteFill, { height: '58%' }]}
      />
      {/* upper-left vibrant bloom */}
      <LinearGradient
        colors={[withAlpha(palette.vibrant, 0.16), 'rgba(0,0,0,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { height: 300 }]}
      />
      {/* floor glow behind the pill tab bar */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', withAlpha(palette.deep, 0.55)]}
        style={[StyleSheet.absoluteFill, { top: '62%' }]}
      />
    </View>
  );
}

/**
 * Cross-fading ambient canvas. Keeps at most two layers alive; the new
 * palette fades in over the old one (700 ms, native driver) whenever the
 * song — and therefore the palette — changes.
 */
export function AmbientBackdrop() {
  const palette = useDynamicPalette();
  const [layers, setLayers] = useState<DynamicPalette[]>([palette]);
  const fade = useRef(new Animated.Value(1)).current;
  const lastKey = useRef(palette.key);

  useEffect(() => {
    if (lastKey.current === palette.key) return;
    lastKey.current = palette.key;
    fade.setValue(0);
    setLayers((prev) => [...prev.slice(-1), palette]);
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [palette, fade]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {layers.map((p, i) => (
        <Animated.View
          key={`${p.key}-${i}`}
          style={[StyleSheet.absoluteFill, { opacity: i === layers.length - 1 ? fade : 1 }]}
        >
          <AmbientLayer palette={p} />
        </Animated.View>
      ))}
    </View>
  );
}
