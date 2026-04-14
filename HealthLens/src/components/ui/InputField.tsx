import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { radius, sizes, spacing, typography } from '@/src/theme';
import type { AppTheme } from '@/src/theme';
import { AppText } from './AppText';

type InputFieldProps = {
  theme: AppTheme;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: 'mail' | 'lock' | 'user';
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
};

export function InputField({
  theme,
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <AppText theme={theme} variant="label" style={{ color: theme.colors.textMuted }}>
        {label}
      </AppText>
      <View style={[styles.inputShell, { backgroundColor: theme.colors.inputBackground }]}> 
        <View style={[styles.iconWrap, { borderColor: theme.colors.border }]}> 
          <Feather name={icon} size={sizes.iconMd} color={theme.colors.inputIcon} />
        </View>
        <TextInput
          style={[styles.input, { color: theme.colors.inputText }]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSoft}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
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
