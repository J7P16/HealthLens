import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AuthCard } from '@/src/components/auth/AuthCard';
import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { BackButton } from '@/src/components/ui/BackButton';
import { InputField } from '@/src/components/ui/InputField';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';

export default function SetNewPasswordScreen() {
  const theme = useAppTheme('light');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit = useMemo(() => {
    return password.trim().length > 0 && confirmPassword.trim().length > 0;
  }, [password, confirmPassword]);

  return (
    <Screen
      theme={theme}
      scroll
      contentContainerStyle={styles.screenContent}
    >
      <View style={styles.content}>
        <View style={styles.pageTop}>
          <BackButton theme={theme} onPress={() => router.back()} />
        </View>

        <AuthHeader
          theme={theme}
          title="Set a new password"
          subtitle="Create a new password. Make sure it is different from your previous one."
        />

        <View style={styles.cardWrap}>
          <AuthCard theme={theme}>
            <View style={styles.formFields}>
              <InputField
                theme={theme}
                label="Password"
                placeholder="Enter your new password"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry
              />
              <InputField
                theme={theme}
                label="Confirm Password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                icon="lock"
                secureTextEntry
              />
              <PrimaryButton
                theme={theme}
                label="Update Password"
                onPress={() => router.push(routes.passwordResetSuccess)}
                disabled={!canSubmit}
              />
            </View>
          </AuthCard>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  pageTop: {
    marginBottom: spacing.xl,
  },
  cardWrap: {
    marginTop: spacing.xl,
  },
  formFields: {
    gap: spacing.md,
  },
});