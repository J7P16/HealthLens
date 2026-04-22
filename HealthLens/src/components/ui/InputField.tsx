import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { radius, sizes, spacing, typography } from '@/src/theme';
import type { AppTheme } from '@/src/theme';
import { AppText } from './AppText';

type InputFieldProps = TextInputProps & {
  theme: AppTheme;
  label: string;
  icon: 'mail' | 'lock' | 'user';
};

export function InputField({
  theme,
  label,
  icon,
  ...inputProps
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <AppText theme={theme} variant="label" style={{ color: theme.colors.textMuted }}>
        {label}
      </AppText>

      <View style={[styles.inputShell, { backgroundColor: theme.colors.inputBackground }]}>
        <View style={styles.iconWrap}>
          <Feather name={icon} size={sizes.iconMd} color={theme.colors.inputIcon} />
        </View>

        <TextInput
          style={[styles.input, { color: theme.colors.inputText }]}
          placeholderTextColor={theme.colors.textSoft}
          autoCorrect={false}
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  inputShell: {
    height: sizes.inputHeight,
    borderRadius: radius.round,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: typography.size.input,
    fontFamily: typography.fontFamily.regular,
    paddingVertical: 0,
  },
});