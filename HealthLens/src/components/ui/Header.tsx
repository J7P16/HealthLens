import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";
import * as Typography from "@/src/theme/tokens/typography";
import * as Sizes from "@/src/theme/tokens/sizes";


type Props = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 390;

  return (
    <View style={styles.upload}>
      <Image
        source={require("@/src/assets/images/lens.png")}
        style={styles.icon}
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
          {title}
        </Text>

        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  upload: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  icon: {
    width: Sizes.sizes.iconLg,
    height: Sizes.sizes.iconLg,
  },
  titleText: {
    fontFamily: Typography.typography.fontFamily.regular,
  },
  subtitleText: {
    color: "#959595",
    fontSize: Typography.typography.size.caption,
    fontFamily: Typography.typography.fontFamily.regular,
  },
});