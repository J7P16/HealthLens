import { Text, View, StyleSheet, Image, useWindowDimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import { SecondaryButton } from "@/src/components/ui/SecondaryButton";
import { Screen } from "@/src/components/ui/Screen";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { spacing } from "@/src/theme";
import * as Colors from "@/src/theme/tokens/colors";
import * as Spacing from "@/src/theme/tokens/spacing";
import * as Radius from "@/src/theme/tokens/radius";
import * as Typography from "@/src/theme/tokens/typography";
import * as Sizes from "@/src/theme/tokens/sizes";
import * as Shadows from "@/src/theme/tokens/shadows";
import * as Gradients from "@/src/theme/tokens/gradients";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker"; // ← added
import PhotoList from "@/src/components/ui/PhotoList";
import PhotoPreviewModal from "@/src/components/ui/PhotoPreview";
import CameraCapture from "@/src/components/ui/CameraCapture";
import { uploadUserImage } from "@/src/hooks/imageHooks"; // ← update path as needed
import { useUser } from "@/src/hooks/authHooks";

export default function UploadPicture() {
  const { width, height } = useWindowDimensions();
  const theme = useAppTheme("light");
  const { user } = useUser();

  const isCompact = width < 350;
  const isWide = width >= 900;

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChooseFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = result.assets.map((a) => ({ uri: a.uri }));
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5)); // ← cap at 5
    }
  };

  const handleAnalyze = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to upload images.");
      return;
    }

    setUploading(true);
    try {
      await Promise.all(photos.map((p) => uploadUserImage(user.uid, p.uri)));
      router.push("/(tabs)/diagnose/PhotoPreviewSection"); // ← correct route
    } catch {
      Alert.alert("Error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (showCamera) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CameraCapture
          onCapture={(picture) => {
            setPhotos((prev) => [...prev, picture].slice(0, 5)); // ← cap at 5
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <Screen
      theme={theme}
      scroll
      contentContainerStyle={[styles.screenContent, isWide && styles.screenContentWide]}
    >
      <View style={styles.content}>
        <View style={styles.upload}>
          <Image
            source={require("@/src/assets/images/lens.png")}
            style={[styles.icon]}
            resizeMode="contain"
          />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={[
                styles.titleText,
                {
                  fontSize: isCompact
                    ? Typography.typography.size.subtitle
                    : Typography.typography.size.title,
                },
              ]}
            >
              Upload a Picture
            </Text>
            <Text style={styles.subtitleText}>{"Scan your skin and see what's going on!"}</Text>
          </View>
        </View>

        {photos.length > 0 ? (
          <View
            style={[
              styles.imageAdd,
              Shadows.shadows.card,
              {
                width: Math.min(width * 0.87, 440),
                flex: 1,
                minHeight: height * 0.45,
                alignItems: "center",
                margin: Spacing.spacing.sm,
              },
            ]}
          >
            <PhotoList
              photos={photos}
              onSelect={(p) => {
                setPhoto(p);
                setShowPreview(true);
              }}
              onDelete={(index) => setPhotos((prev) => prev.filter((_, i) => i !== index))}
            />
          </View>
        ) : (
          <View
            style={[
              styles.imageAdd,
              Shadows.shadows.card,
              {
                width: Math.min(width * 0.87, 440),
                height: height * 0.45,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              },
            ]}
          >
            <Image
              source={require("@/src/assets/images/image-add.png")}
              style={{ width: "44%", height: "50%" }}
              resizeMode="contain"
            />
            <View style={{ margin: Spacing.spacing.sm, alignItems: "center" }}>
              <Text style={[styles.boldSubtitleText]}>No Photos Uploaded Yet</Text>
              <Text style={[styles.subtitleText]}>Add up to 5 photos of the affected area</Text>
            </View>
          </View>
        )}

        <View>
          <SecondaryButton
            colors={Gradients.gradients.primary}
            style={{ marginTop: Spacing.spacing.xxl, marginBottom: Spacing.spacing.xs }}
            label="Take Photo"
            theme={theme}
            onPress={async () => {
              if (!permission?.granted) {
                await requestPermission();
              }
              setShowCamera(true);
            }}
          />
          <SecondaryButton
            colors={Gradients.gradients.coral}
            style={{ marginVertical: Spacing.spacing.xs }}
            label="Choose From Library"
            theme={theme}
            onPress={handleChooseFromLibrary} // ← wired up
          />
        </View>

        {photos.length > 0 && (
          <SecondaryButton
            colors={Gradients.gradients.green}
            style={{ marginVertical: Spacing.spacing.xs }}
            label={uploading ? "Uploading..." : "Analyze Photos"} // ← upload state
            theme={theme}
            onPress={handleAnalyze} // ← wired up
            disabled={uploading}
          />
        )}
      </View>

      <PhotoPreviewModal
        visible={showPreview}
        photo={photo}
        onClose={() => {
          setPhoto(null);
          setShowPreview(false);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
  },
  screenContentWide: {
    paddingVertical: spacing.lg,
  },
  content: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
  },
  icon: {
    height: Sizes.sizes.iconLg,
    width: Sizes.sizes.iconLg,
  },
  upload: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  titleText: {
    fontFamily: Typography.typography.fontFamily.regular,
  },
  subtitleText: {
    color: "#959595",
    fontSize: Typography.typography.size.caption,
    fontFamily: Typography.typography.fontFamily.regular,
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
