import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { AuthCard } from '@/src/components/auth/AuthCard';
import { AuthFooter } from '@/src/components/auth/AuthFooter';
import { AuthLogo } from '@/src/components/auth/AuthLogo';
import { Divider } from '@/src/components/ui/Divider';
import { InputField } from '@/src/components/ui/InputField';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { SocialButton } from '@/src/components/ui/SocialButton';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';

export default function CreateAccountScreen() {
  const theme = useAppTheme('light');
  const { width } = useWindowDimensions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isCompact = width < 390;
  const isWide = width >= 900;

  return (
    <Screen
      theme={theme}
      scroll
      contentContainerStyle={[
        styles.screenContent,
        isWide && styles.screenContentWide,
      ]}
    >
      <View style={styles.content}>
        <AuthLogo theme={theme} showDots />

        <AuthCard theme={theme}>
          <View style={styles.formFields}>
            <InputField
              theme={theme}
              label="Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              icon="user"
              autoCapitalize="words"
            />
            <InputField
              theme={theme}
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
            />
            <InputField
              theme={theme}
              label="Password"
              placeholder="••••••"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry
            />
            <PrimaryButton theme={theme} label="Create Account" />
          </View>
        </AuthCard>

        <View style={styles.authExtras}>
          <Divider theme={theme} />
          <View style={styles.socialGroup}>
            <SocialButton theme={theme} provider="google" label="Continue with Google" />
            <SocialButton theme={theme} provider="apple" label="Continue with Apple" />
          </View>
          <AuthFooter
            theme={theme}
            prefix="Already have an account?"
            action="Sign In"
            onPress={() => router.push(routes.signIn)}
          />
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