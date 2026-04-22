import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { AppTheme } from '@/src/theme';
import { spacing, typography } from '@/src/theme';
import { AppText } from '@/src/components/ui/AppText';

type AuthHeaderProps = {
  theme: AppTheme;
  title: string;
  subtitle: string;
};

export function AuthHeader({ theme, title, subtitle }: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText theme={theme} variant="title" style={{ fontFamily: typography.fontFamily.bold }}>
        {title}
      </AppText>
      <AppText theme={theme} variant="body" style={{ color: theme.colors.textMuted, maxWidth: 290 }}>
        {subtitle}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
});
