import React from "react";
import { View, Text, Pressable} from "react-native";
import * as Colors from "@/src/theme/tokens/colors"
import * as Spacing from "@/src/theme/tokens/spacing"
import * as Radius from "@/src/theme/tokens/radius"
import * as Sizes from "@/src/theme/tokens/sizes"
import * as Typography from "@/src/theme/tokens/typography"

type Photo = {
  uri: string;
};

type Props = {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
  onDelete: (index: number) => void;
};

export default function PhotoList({ photos, onSelect, onDelete }: Props) {
  return (
    <View style={{margin: Spacing.spacing.lg, width: '90%'}}>
      {photos.map((p, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: Colors.palette.white,
            padding: Spacing.spacing.xxl,
            borderRadius: Radius.radius.lg,
            marginBottom: Spacing.spacing.xs,
            height: Sizes.sizes.primaryButtonHeight,
            width: '100%'
          }}
        >
          <Pressable onPress={() => onSelect(p)}>
            <Text style={{
                    color: Colors.palette.navy900,
                    fontFamily: Typography.typography.fontFamily.regular
            }}>
                Photo {index + 1}
            </Text>
          </Pressable>

          <Pressable onPress={() => onDelete(index)}>
            <Text style={{ 
                    color: Colors.palette.red500, 
                    fontSize: Typography.typography.size.button}}>
                        ✕
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}