import React, { useRef, useState, useEffect} from "react";
import { View, Pressable, Text } from "react-native";
import { CameraView } from "expo-camera";
import * as Colors from "@/src/theme/tokens/colors"
import * as Spacing from "@/src/theme/tokens/spacing"
import * as Radius from "@/src/theme/tokens/radius"
import * as Sizes from "@/src/theme/tokens/sizes"

type Props = {
  onCapture: (photo: any) => void;
  onClose: () => void;
};

export default function CameraCapture({ onCapture, onClose }: Props) {
  const cameraRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync();
    onCapture(picture);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{flex: 1}} facing="back" onCameraReady={() => setIsReady(true)}>
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            top: Spacing.spacing.xl,
            right: Spacing.spacing.xl,
            width: Sizes.sizes.iconLg,
            height: Sizes.sizes.iconLg,
            borderRadius: Radius.radius.round,
            backgroundColor: Colors.palette.shadowDark,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <Text style={{color: "white", fontSize: Sizes.sizes.iconMd}}>✕</Text>
        </Pressable>

        {isReady && (
        <View
            style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: Spacing.spacing.xxxl,
            }}
        >
            <Pressable
                onPress={takePhoto}
                style={{
                    width: Sizes.sizes.iconXl,
                    height: Sizes.sizes.iconXl,
                    borderRadius: Radius.radius.round,
                    backgroundColor: Colors.palette.white,
                }}
            />
        </View>
        )}
      </CameraView>
    </View>
  );
}