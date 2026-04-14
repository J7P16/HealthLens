import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, sizes, typography } from '@/src/theme';
import { AppText } from './AppText';
import type { AppTheme } from '@/src/theme';

type PrimaryButtonProps = {
  theme: AppTheme;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ theme, label, onPress, disabled = false }: PrimaryButtonProps) {
  const colors = disabled ? theme.gradients.primaryDisabled : theme.gradients.primary;

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <LinearGradient colors={[...colors]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradient}>
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
