import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { AppTheme } from '@/src/theme';
import { spacing } from '@/src/theme';

type ScreenProps = {
  children: React.ReactNode;
  theme: AppTheme;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  theme,
  scroll = false,
  contentContainerStyle,
}: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    minHeight: '100%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
});