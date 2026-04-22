import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/src/theme';
import type { AppTheme } from '@/src/theme';
import { AppText } from './AppText';

export function Divider({ theme }: { theme: AppTheme }) {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: theme.colors.divider }]} />
      <AppText theme={theme} variant="body" style={{ color: theme.colors.textMuted }}>
        OR
      </AppText>
      <View style={[styles.line, { backgroundColor: theme.colors.divider }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
});
