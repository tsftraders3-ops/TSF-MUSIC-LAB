/**
 * PressableScale — every tappable surface in the app gets a buttery
 * press-down scale + optional haptic. The signature "expensive feel"
 * micro-interaction, matching Spotify's card compression.
 */

import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export function PressableScale({
  children,
  style,
  scaleTo = 0.965,
  haptic = false,
  onPressIn,
  onPressOut,
  ...rest
}: PressableProps & {
  scaleTo?: number;
  haptic?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handleIn = useCallback(
    (e: any) => {
      Animated.timing(scale, {
        toValue: scaleTo,
        duration: 110,
        useNativeDriver: true,
      }).start();
      if (haptic) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
      }
      onPressIn?.(e as never);
    },
    [scale, scaleTo, haptic, onPressIn],
  );

  const handleOut = useCallback(
    (e: any) => {
      Animated.spring(scale, {
        toValue: 1,
        speed: 22,
        bounciness: 6,
        useNativeDriver: true,
      }).start();
      onPressOut?.(e as never);
    },
    [scale, onPressOut],
  );

  return (
    <Pressable onPressIn={handleIn} onPressOut={handleOut} {...rest}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
