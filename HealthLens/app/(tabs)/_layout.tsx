import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Diagnose" options={{ headerShown: false }} />
    </Tabs>
  );
}
