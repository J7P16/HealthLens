import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Diagnose" options={{ headerShown: false }} />
      <Tabs.Screen name="Recommendations" options={{ headerShown: false }} />
      <Tabs.Screen name="ProfileScreen" options={{headerShown: false}}/>
      <Tabs.Screen name="diagnose/index"        options={{ href: null }} />
      <Tabs.Screen name="History"               options={{ href: null }} />
      <Tabs.Screen name="Profile"               options={{ href: null }} />
      <Tabs.Screen
        name="(settings)"
        options={{
          headerShown: false,
          href: null, // This hides it from tabs
        }}
      />
    </Tabs>
  );
}
