import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, sizes, typography } from '@/src/theme';
import { AppText } from './AppText';
import type { AppTheme } from '@/src/theme';
import type { ViewStyle } from 'react-native';

type SecondaryButtonProps = {
  colors: string[];
  theme: AppTheme;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export function SecondaryButton({colors, theme, label, onPress, disabled = false, style}: SecondaryButtonProps) {

  return (
    <Pressable onPress={onPress} disabled={disabled} style={style}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradient}>
        <AppText
          theme={theme}
          variant="button"
          style={{ color: theme.colors.primaryText, opacity: disabled ? 0.9 : 1, fontFamily: typography.fontFamily.bold }}
        >
          {label}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: sizes.primaryButtonHeight,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
