import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { AuthCard } from '@/src/components/auth/AuthCard';
import { AuthLogo } from '@/src/components/auth/AuthLogo';
import { Divider } from '@/src/components/ui/Divider';
import { InputField } from '@/src/components/ui/InputField';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { SocialButton } from '@/src/components/ui/SocialButton';
import { TextLink } from '@/src/components/ui/TextLink';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';
import { AppText } from '@/src/components/ui/AppText';

export default function SignInScreen() {
  const theme = useAppTheme('light');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <Screen
      theme={theme}
      scroll
      contentContainerStyle={[
        styles.screenContent,
        isWide && styles.screenContentWide,
      ]}
    >   <View style={styles.content}>
        <AuthLogo theme={theme} showDots />

        <AuthCard theme={theme}>
          <View style={styles.formFields}>
            <InputField
              theme={theme}
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
            />
            <View style={styles.passwordBlock}>
              <InputField
                theme={theme}
                label="Password"
                placeholder="••••••"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry
              />
              <View style={styles.forgotLinkWrap}>
                <TextLink
                  theme={theme}
                  label="Forgot Password ?"
                  onPress={() => router.push(routes.forgotPassword)}
                />
              </View>
            </View>
            <PrimaryButton
              theme={theme}
              label="Log In"
              onPress={() => router.push(routes.diagnose)}
            />
          </View>
        </AuthCard>

        <View style={styles.authExtras}>
          <Divider theme={theme} />
          <View style={styles.socialGroup}>
            <SocialButton theme={theme} provider="google" label="Continue with Google" />
            <SocialButton theme={theme} provider="apple" label="Continue with Apple" />
          </View>
          <View style={styles.bottomCta}>
            <AppText
              theme={theme}
              variant="body"
              style={{ color: theme.colors.textMuted, textAlign: 'center' }}
            >
              New Here? Create an account today and never miss the latest updates
            </AppText>
            <PrimaryButton
              theme={theme}
              label="Create Account"
              onPress={() => router.push(routes.createAccount)}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  screenContentWide: {
    paddingVertical: spacing.xxl,
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  contentWide: {
    maxWidth: 520,
  },
  formFields: {
    gap: spacing.md,
  },
  passwordBlock: {
    gap: spacing.xs,
  },
  forgotLinkWrap: {
    alignItems: 'flex-end',
    marginTop: -2,
  },
  authExtras: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  socialGroup: {
    gap: spacing.sm,
  },
  bottomCta: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});