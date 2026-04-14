import React from 'react';
import { Pressable } from 'react-native';
import { AppText } from './AppText';
import type { AppTheme } from '@/src/theme';

type TextLinkProps = {
  theme: AppTheme;
  label: string;
  onPress?: () => void;
  centered?: boolean;
};

export function TextLink({ theme, label, onPress, centered = false }: TextLinkProps) {
  return (
    <Pressable onPress={onPress} style={centered ? { alignSelf: 'center' } : undefined}>
      <AppText theme={theme} variant="link" style={{ color: theme.colors.link }}>
        {label}
      </AppText>
    </Pressable>
  );
}
