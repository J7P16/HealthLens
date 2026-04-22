import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { radius, sizes, spacing, typography } from '@/src/theme';
import type { AppTheme } from '@/src/theme';

type VerificationCodeInputProps = {
  theme: AppTheme;
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export function VerificationCodeInput({
  theme,
  value,
  onChange,
  length = 5,
}: VerificationCodeInputProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cleanValue = value.replace(/[^0-9]/g, '').slice(0, length);
  const cells = Array.from({ length }, (_, index) => cleanValue[index] ?? '');

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        value={cleanValue}
        onChangeText={(text) => onChange(text.replace(/[^0-9]/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        style={styles.hiddenInput}
      />

      <View style={styles.row}>
        {cells.map((cell, index) => {
          const isFilled = !!cell;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: isFilled ? theme.colors.borderStrong : theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  {
                    color: cell ? theme.colors.text : theme.colors.textSoft,
                  },
                ]}
              >
                {cell}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: sizes.codeCellSize,
    zIndex: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  cell: {
    width: sizes.codeCellSize,
    height: sizes.codeCellSize,
    borderWidth: 2,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cellText: {
    fontSize: 30,
    lineHeight: 36,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    minWidth: 20,
  },
});