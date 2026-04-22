import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { spacing, typography } from "@/src/theme";
import type { AppTheme } from "@/src/theme";
import { AppText } from "@/src/components/ui/AppText";

type AuthFooterProps = {
  theme: AppTheme;
  prefix: string;
  action: string;
  onPress?: () => void;
};

export function AuthFooter({
  theme,
  prefix,
  action,
  onPress,
}: AuthFooterProps) {
  return (
    <View style={styles.row}>
      <AppText
        theme={theme}
        variant="body"
        style={{ color: theme.colors.textMuted }}
      >
        {prefix}
      </AppText>
      <Pressable onPress={onPress}>
        <AppText
          theme={theme}
          variant="link"
          style={{
            color: theme.colors.link,
            fontFamily: typography.fontFamily.bold,
          }}
        >
          {action}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: spacing.xxs,
  },
});
