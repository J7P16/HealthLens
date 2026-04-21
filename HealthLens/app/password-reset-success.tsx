import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';

export default function PasswordResetSuccessScreen() {
  const theme = useAppTheme('light');

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
          title="Password reset"
          subtitle="Your password has been successfully reset. Click confirm to continue to sign in."
        />

        <View style={styles.buttonWrap}>
          <PrimaryButton
            theme={theme}
            label="Confirm"
            onPress={() => router.replace(routes.signIn)}
          />
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
  buttonWrap: {
    marginTop: spacing.xl,
    width: '100%',
  },
});