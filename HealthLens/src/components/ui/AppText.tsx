import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { typography } from '@/src/theme';
import type { AppTheme } from '@/src/theme';

type Variant = 'title' | 'subtitle' | 'body' | 'label' | 'button' | 'caption' | 'link';

type AppTextProps = PropsWithChildren<{
  theme: AppTheme;
  variant?: Variant;
  style?: StyleProp<TextStyle>;
}>;

const variantStyles = StyleSheet.create({
  title: {
    fontSize: typography.size.title,
    lineHeight: typography.lineHeight.title,
  },
  subtitle: {
    fontSize: typography.size.subtitle,
    lineHeight: typography.lineHeight.subtitle,
  },
  body: {
    fontSize: typography.size.body,
    lineHeight: typography.lineHeight.body,
  },
  label: {
    fontSize: typography.size.label,
    lineHeight: typography.lineHeight.label,
  },
  button: {
    fontSize: typography.size.button,
    lineHeight: typography.lineHeight.button,
  },
  caption: {
    fontSize: typography.size.caption,
    lineHeight: typography.lineHeight.caption,
  },
  link: {
    fontSize: typography.size.link,
    lineHeight: typography.lineHeight.body,
  },
});

export function AppText({ theme, variant = 'body', style, children }: AppTextProps) {
  return (
    <Text
      style={[
        styles.base,
        { color: theme.colors.text },
        variantStyles[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fontFamily.regular,
  },
});
