import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AuthHeader } from '@/src/components/auth/AuthHeader';
import { VerificationCodeInput } from '@/src/components/auth/VerificationCodeInput';
import { BackButton } from '@/src/components/ui/BackButton';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { TextLink } from '@/src/components/ui/TextLink';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';
import { AppText } from '@/src/components/ui/AppText';

export default function CheckEmailScreen() {
  const theme = useAppTheme('light');
  const [code, setCode] = useState('');

  return (
    <Screen theme={theme} scroll contentContainerStyle={styles.screenContent}>
      <View style={styles.content}>
        <View style={styles.pageTop}>
          <BackButton theme={theme} onPress={() => router.back()} />
        </View>

        <AuthHeader
          theme={theme}
          title="Check your email"
          subtitle="We sent a reset link to johndoe@email.com enter 5 digit code that mentioned in the email"
        />

        <View style={styles.codeWrap}>
          <VerificationCodeInput theme={theme} value={code} onChange={setCode} />
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            theme={theme}
            label="Verify Code"
            onPress={() => router.push(routes.setNewPassword)}
            disabled={code.length < 5}
          />
          <View style={styles.resendRow}>
            <AppText theme={theme} variant="body" style={{ color: theme.colors.textMuted }}>
              Haven’t got the email yet?
            </AppText>
            <TextLink theme={theme} label="Resend email" onPress={() => {}} />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  pageTop: {
    marginBottom: spacing.xl,
    alignSelf: 'flex-start',
  },
  codeWrap: {
    marginTop: spacing.xl,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.xl,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xxs,
  },
});