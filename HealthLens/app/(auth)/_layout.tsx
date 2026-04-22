// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { useAuth } from "@/src/hooks/authHooks";

export default function AuthLayout() {
  const theme = useAppTheme("light");

  useAuth("/(tabs)/ProfileScreen");

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="check-email" />
      <Stack.Screen name="set-new-password" />
      <Stack.Screen name="password-reset-success" />
    </Stack>
  );
}
