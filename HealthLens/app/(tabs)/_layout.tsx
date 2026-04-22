import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
 
const BLUE     = "#5187DD";
const BG       = "#FFFFFF";
const INACTIVE = "#B0BAC9";
 
function ScanButton(props: BottomTabBarButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => router.push("/diagnose/upload-picture")}
      style={styles.scanWrap}
      activeOpacity={0.85}
    >
      <View style={styles.scanBtn}>
        <Ionicons name="camera" size={28} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}
 
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="Recommendations"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
 
      <Tabs.Screen
        name="diagnose"
        options={{
          title: "Scan",
          tabBarButton: (props) => <ScanButton {...props} />,
        }}
      />
 
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
 
      {/* Hidden routes */}
      <Tabs.Screen name="History"                       options={{ href: null }} />
      <Tabs.Screen name="Profile"                       options={{ href: null }} />
      <Tabs.Screen name="diagnose/upload-picture"       options={{ href: null }} />
      <Tabs.Screen name="diagnose/results"              options={{ href: null }} />
      <Tabs.Screen name="diagnose/PhotoPreviewSection"  options={{ href: null }} />
      <Tabs.Screen name="(settings)"                    options={{ href: null }} />
    </Tabs>
  );
}
 
const styles = StyleSheet.create({
  bar: {
    backgroundColor: BG,
    borderTopWidth: 0,
    height: Platform.OS === "ios" ? 85 : 70,
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
    paddingTop: 8,
    shadowColor: "#93A0BA",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  scanWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -24,
  },
  scanBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
});