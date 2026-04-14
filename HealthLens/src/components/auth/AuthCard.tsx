import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { radius, shadows, sizes, spacing } from "@/src/theme";
import type { AppTheme } from "@/src/theme";

type AuthCardProps = PropsWithChildren<{
  theme: AppTheme;
}>;

export function AuthCard({ theme, children }: AuthCardProps) {
  return (
    <View
      style={[
        styles.card,
        shadows.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  // card: {
  //   width: "100%",
  //   maxWidth: sizes.authCardMaxWidth,
  //   alignSelf: "center",
  //   borderRadius: radius.xl,
  //   padding: sizes.authCardPadding,
  //   gap: spacing.md,
  // },
  card: {
    width: "100%",
    borderRadius: radius.xl,
    padding: sizes.authCardPadding,
    gap: spacing.md,
  }
});
