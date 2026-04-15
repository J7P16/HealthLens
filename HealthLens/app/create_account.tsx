import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import globalStyles from "./styles/globalStyles";
import { useFonts } from "expo-font";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "./hooks/authHooks";
import { useState } from "react";

export default function createAccount() {
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    Monda: require("./styles/fonts/Monda.ttf"),
  });

  const { createAccount, loading, error } = useAuth("/(tabs)/Diagnose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={[globalStyles.scrollContent]} style={globalStyles.bgColor}>
      <Stack.Screen options={{ headerShown: false }} />
      {""}

      <Image
        source={require("../assets/images/healthlens-logo.png")}
        style={[{ width: width * 0.65, height: height * 0.3, margin: "7%" }]}
        resizeMode="contain"
      />

      <View style={[globalStyles.card, { width: width * 0.85, height: height * 0.9, margin: "5%" }]}>
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={true}>
          <View>
            <Text style={{ color: "#ADADAD", fontSize: RFValue(16, height), fontFamily: "Monda" }}>
              Email
            </Text>
            <View style={[globalStyles.input]}>
              <Image
                source={require("../assets/images/mailicon.png")}
                style={styles.icon}
                resizeMode="contain"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Your Email"
                style={{ outlineStyle: "none", color: "#9C9C9C", fontFamily: "Monda" }}
              ></TextInput>
            </View>
          </View>

          <View>
            <Text style={{ color: "#ADADAD", fontSize: RFValue(16, height), fontFamily: "Monda" }}>
              Password
            </Text>
            <View style={[globalStyles.input]} resizeMode="contain">
              <Image
                source={require("../assets/images/lockicon.png")}
                style={styles.icon}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Your Password"
                value={password}
                onChangeText={setPassword}
                style={{ outlineStyle: "none", color: "#9C9C9C", fontFamily: "Monda" }}
              ></TextInput>
            </View>
          </View>

          <View>
            <Text style={{ color: "#ADADAD", fontSize: RFValue(16, height), fontFamily: "Monda" }}>
              Confirm Password
            </Text>
            <View style={[globalStyles.input]} resizeMode="contain">
              <Image
                source={require("../assets/images/lockicon.png")}
                style={styles.icon}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Confirmed Password"
                style={{ outlineStyle: "none", color: "#9C9C9C", fontFamily: "Monda" }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              ></TextInput>
            </View>
          </View>

          <Pressable
            style={{ flexDirection: "row", justifyContent: "center" }}
            onPress={() => createAccount(email, password, confirmPassword)}
          >
            <LinearGradient
              colors={["#4BA8E6", "#5187DD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={globalStyles.button}
            >
              <Text style={{ color: "#FFFFFF", fontFamily: "Monda" }}>Create Account</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.line}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#7C7C7C" }} />
        <Text style={{ marginHorizontal: 10, color: "#7C7C7C", fontFamily: "Monda" }}>Or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#7C7C7C" }} />
      </View>

      <Pressable style={[styles.continue]}>
        <Image source={require("../assets/images/googleicon.png")} style={styles.icon} resizeMode="contain" />
        <Text style={{ color: "#9C9C9C" }}>Continue with Google</Text>
      </Pressable>

      <Pressable style={[styles.continue]}>
        <Image source={require("../assets/images/appleicon.png")} style={styles.icon} resizeMode="contain" />
        <Text style={{ color: "#9C9C9C" }}>Continue with Apple</Text>
      </Pressable>

      <View style={{ alignItems: "center", margin: "6%" }}>
        <Text style={{ color: "#7C7C7C", fontFamily: "Monda", fontSize: RFValue(12, height) }}>
          Already have an account?
        </Text>
        <Pressable
          onPress={() => router.push("/")}
          style={{ flexDirection: "row", justifyContent: "center", width: width * 0.8 }}
        >
          <LinearGradient
            colors={["#4BA8E6", "#5187DD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[globalStyles.button, { margin: "1%", height: height * 0.08 }]}
          >
            <Text style={{ color: "#FFFFFF", fontFamily: "Monda" }}>Sign In</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  line: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 50,
  },

  continue: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#93A0BA",
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    padding: "2%",
    width: "70%",
    margin: "1%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
