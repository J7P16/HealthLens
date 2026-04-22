import React from "react";
import { Modal, View, Image, Pressable, Text } from "react-native";
import * as Colors from "@/src/theme/tokens/colors"
import * as Spacing from "@/src/theme/tokens/spacing"
import * as Radius from "@/src/theme/tokens/radius"
import * as Sizes from "@/src/theme/tokens/sizes"

type Photo = {
  uri: string;
};

type Props = {
  visible: boolean;
  photo: Photo | null;
  onClose: () => void;
};

export default function PhotoPreview({visible, photo, onClose}: Props) {

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View
          style={{
            width: "70%",
            height: "70%",
            backgroundColor: "white",
            borderRadius: Radius.radius.md,
            overflow: "hidden",
          }}>
          {photo && (
            <Image
              source={{uri: photo.uri}}
              style={{width: "100%", height: "100%"}}
              resizeMode="cover"
            />
          )}
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              top: Spacing.spacing.md,
              right: Spacing.spacing.md,
              backgroundColor: Colors.palette.shadowDark,
              width: Sizes.sizes.iconMd,
              height: Sizes.sizes.iconMd,
              borderRadius: Radius.radius.round,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{color: Colors.palette.white, fontSize: Sizes.sizes.iconSm}}>✕</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}