import React from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { spacing, typography } from "@/src/theme";
import type { AppTheme } from "@/src/theme";
import { AppText } from "@/src/components/ui/AppText";

const logoMark = require("@/src/assets/images/branding/logo-mark.png");
const dotsLeft = require("@/src/assets/images/branding/dots-left.png");
const dotsRight = require("@/src/assets/images/branding/dots-right.png");

type AuthLogoProps = {
  theme: AppTheme;
  showDots?: boolean;
};

export function AuthLogo({ theme, showDots = true }: AuthLogoProps) {
  const { width } = useWindowDimensions();

  const isCompact = width < 0;
  const isWide = width >= 900;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {showDots ? (
          <Image
            source={dotsLeft}
            resizeMode="contain"
            style={[styles.dots, isCompact && styles.dotsCompact, isWide && styles.dotsWide]}
          />
        ) : (
          <View style={styles.sideSpacer} />
        )}

        <View style={styles.centerBlock}>
          <AppText
            theme={theme}
            variant="body"
            style={[styles.welcomeText, { color: theme.colors.textMuted }]}
          >
            Welcome to
          </AppText>

          <AppText
            theme={theme}
            style={[styles.wordmark, isCompact && styles.wordmarkCompact, isWide && styles.wordmarkWide]}
          >
            HEALTHLENS
          </AppText>

          <Image
            source={logoMark}
            resizeMode="contain"
            style={[styles.logoMark, isCompact && styles.logoMarkCompact, isWide && styles.logoMarkWide]}
          />
        </View>

        {showDots ? (
          <Image
            source={dotsRight}
            resizeMode="contain"
            style={[styles.dots, isCompact && styles.dotsCompact, isWide && styles.dotsWide]}
          />
        ) : (
          <View style={styles.sideSpacer} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  row: {
    width: "100%",
    maxWidth: 420,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
  centerBlock: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  welcomeText: {
    textAlign: "center",
  },
  wordmark: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.5,
    textAlign: "center",
    fontFamily: typography.fontFamily.bold,
  },
  wordmarkCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  wordmarkWide: {
    fontSize: 32,
    lineHeight: 38,
  },
  logoMark: {
    width: 48,
    height: 48,
    marginTop: spacing.xs,
  },
  logoMarkCompact: {
    width: 42,
    height: 42,
  },
  logoMarkWide: {
    width: 56,
    height: 56,
  },
  dots: {
    width: 52,
    height: 120,
  },
  dotsCompact: {
    width: 40,
    height: 96,
  },
  dotsWide: {
    width: 60,
    height: 132,
  },
  sideSpacer: {
    width: 52,
  },
});
