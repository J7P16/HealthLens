import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="create_account" options={{ title: 'Create' }} />
      <Stack.Screen name="forgot_password" options={{ title: 'Password' }} />
    </Stack>
  );
}
