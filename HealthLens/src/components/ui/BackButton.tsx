import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { radius, sizes } from '@/src/theme';
import type { AppTheme } from '@/src/theme';

type BackButtonProps = {
  theme: AppTheme;
  onPress: () => void;
};

export function BackButton({ theme, onPress }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          borderColor: theme.colors.borderStrong,
        },
      ]}
    >
      <Feather name="chevron-left" size={24} color={theme.colors.borderStrong} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: sizes.backButtonSize,
    height: sizes.backButtonSize,
    borderRadius: radius.round,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
