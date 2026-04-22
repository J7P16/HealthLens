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
import { useState } from "react";
import globalStyles from "./styles/globalStyles";
import PrimaryButton from "./src/theme/components/ui/PrimaryButton";
import { useFonts } from "expo-font";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Types from "./src/theme/types";
import * as LightTheme from "./src/theme/lightTheme";
import * as DarkTheme from "./src/theme/darkTheme";
import * as Colors from "./src/theme/tokens/colors";
import * as Spacing from "./src/theme/tokens/spacing";
import * as Radius from "./src/theme/tokens/radius";
import * as Typography from "./src/theme/tokens/typography";
import * as Sizes from "./src/theme/tokens/sizes";
import * as Shadows from "./src/theme/tokens/shadows";
import * as Gradients from "./src/theme/tokens/gradients";
import * as ImagePicker from "expo-image-picker";
import { uploadAndDiagnose } from "../uploadImage";

export default function UploadPicture() {
  const { width, height } = useWindowDimensions();
  const [photoUploaded, setPhotoUploaded] = useState(false);

  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      <Stack.Screen options={{ headerShown: false }} />
      {""}
      <View style={[styles.upload, { flexDirection: "row" }]}>
        <Image
          source={require("../assets/images/lens.png")}
          style={[{ height: height * 0.1, width: width * 0.1 }]}
          resizeMode="contain"
        />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.titleText}>Upload a Picture</Text>
          <Text style={styles.subtitleText}>{"Scan your skin and see what's going on!"}</Text>
        </View>
      </View>

      {photoUploaded ? (
        <View></View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}>
          <View
            style={[
              styles.imageAdd,
              Shadows.shadows.card,
              { width: width * 0.87, height: height * 0.5, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Image
              source={require("../assets/images/image-add.png")}
              style={{ width: "44%", height: "50%" }}
              resizeMode="contain"
            />
            <View style={{ margin: 10, alignItems: "center" }}>
              <Text style={[styles.boldSubtitleText]}>No Photos Uploaded Yet</Text>
              <Text style={[styles.subtitleText]}>Add up to 5 photos of the affected area</Text>
            </View>
          </View>
        </View>
      )}

      <View style={{ gap: "0%" }}>
        <PrimaryButton
          label="Take Photo"
          icon={require("../assets/images/camera.png")}
          color={Gradients.gradients.primary}
          style={{ marginTop: "5%", marginBottom: "1%" }}
          onPress={async () => {
            console.log("👉 BUTTON PRESSED - calling backend now");
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;

              console.log("Uploading + diagnosing...");

              const response = await uploadAndDiagnose(uri, "user1");

              console.log("RESULT:", response);

              setPhotoUploaded(true);
            }
          }}
        />

        <PrimaryButton
          label="Choose From Library"
          icon={require("../assets/images/upload.png")}
          color={Gradients.gradients.coral}
          style={{ marginTop: "1%", marginBottom: "5%" }}
          onPress={async () => {
            console.log("👉 BUTTON PRESSED - calling backend now");
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;

              console.log("Uploading + diagnosing...");

              const response = await uploadAndDiagnose(uri, "user1");

              console.log("RESULT:", response);

              setPhotoUploaded(true);
            }
          }}
        />
      </View>

      {photoUploaded && (
        <PrimaryButton
          label="Analyze Photos"
          icon={require("../assets/images/check.png")}
          color={Gradients.gradients.green}
          onPress={() => router.push("/somewhere")}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upload: {
    padding: 10,
    margin: 5,
    gap: 5,
  },

  titleText: {
    fontFamily: Typography.typography.fontFamily.regular,
    fontSize: Typography.typography.size.title,
    lineHeight: Typography.typography.lineHeight.title,
  },

  subtitleText: {
    color: "#959595",
    fontSize: Typography.typography.size.caption,
    fontFamily: Typography.typography.fontFamily.regular,
    lineHeight: Typography.typography.lineHeight.caption,
  },

  boldSubtitleText: {
    color: "#959595",
    fontSize: Typography.typography.size.label,
    fontFamily: Typography.typography.fontFamily.bold,
    fontWeight: "bold",
    lineHeight: Typography.typography.lineHeight.label,
  },

  imageAdd: {
    backgroundColor: Colors.palette.slate160,
    borderRadius: Radius.radius.lg,
  },
});
