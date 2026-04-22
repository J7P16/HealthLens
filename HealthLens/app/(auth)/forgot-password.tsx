import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AuthCard } from "@/src/components/auth/AuthCard";
import { AuthHeader } from "@/src/components/auth/AuthHeader";
import { BackButton } from "@/src/components/ui/BackButton";
import { InputField } from "@/src/components/ui/InputField";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { Screen } from "@/src/components/ui/Screen";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/hooks/authHooks"; // ← added

export default function ForgotPasswordScreen() {
  const theme = useAppTheme("light");
  const [email, setEmail] = useState("");
  const { forgotPassword, loading } = useAuth(`/(auth)/check-email?email=${email}`); // ← added, passes email

  return (
    <Screen theme={theme} scroll contentContainerStyle={styles.screenContent}>
      <View style={styles.content}>
        <View style={styles.pageTop}>
          <BackButton theme={theme} onPress={() => router.back()} />
        </View>

        <AuthHeader
          theme={theme}
          title="Forgot password"
          subtitle="Please enter your email to reset the password"
        />

        <View style={styles.cardWrap}>
          <AuthCard theme={theme}>
            <InputField
              theme={theme}
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
            />
            <PrimaryButton
              theme={theme}
              label="Reset Password"
              onPress={() => forgotPassword(email)}
              disabled={!email || loading}
            />
          </AuthCard>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: spacing.xxl,
  },
  pageTop: {
    marginBottom: spacing.md,
    alignSelf: "flex-start",
  },
  cardWrap: {
    marginTop: spacing.md,
  },
  content: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
  },
});
