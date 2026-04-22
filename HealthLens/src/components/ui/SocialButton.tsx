import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { radius, sizes, spacing } from '@/src/theme';
import { AppText } from './AppText';
import type { AppTheme } from '@/src/theme';

const iconMap = {
  google: <AntDesign name="google" size={22} color="#000000" />,
  apple: <FontAwesome name="apple" size={24} color="#000000" />,
};

type SocialButtonProps = {
  theme: AppTheme;
  provider: keyof typeof iconMap;
  label: string;
  onPress?: () => void;
};

export function SocialButton({ theme, provider, label, onPress }: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.socialSurface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={styles.icon}>{iconMap[provider]}</View>
      <AppText theme={theme} variant="subtitle" style={{ color: theme.colors.textMuted }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: sizes.socialButtonHeight,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    width: '100%',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    width: 28,
    alignItems: 'center',
  },
});
