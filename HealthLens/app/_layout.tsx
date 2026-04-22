// app/_layout.tsx
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { useAppTheme } from "@/src/hooks/useAppTheme";

export default function RootLayout() {
  const theme = useAppTheme("light");
  const [fontsLoaded] = useFonts({
    Monda: require("./styles/fonts/Monda.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator color={theme.colors.link} />
      </View>
    );
  }

  return <Slot />;
}
