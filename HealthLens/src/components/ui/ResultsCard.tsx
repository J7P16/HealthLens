import { View, StyleSheet, useWindowDimensions } from "react-native";
import * as Colors from "@/src/theme/tokens/colors";
import * as Spacing from "@/src/theme/tokens/spacing";
import * as Shadows from "@/src/theme/tokens/shadows";
import * as Radius from "@/src/theme/tokens/radius";

type Props = {
  children: React.ReactNode;
  minHeightRatio?: number;
};

export default function ResultsCard({
  children,
  minHeightRatio = 0.3,
}: Props) {
  const { height } = useWindowDimensions();

  return (
    <View
      style={[
        styles.card,
        Shadows.shadows.card,
        { minHeight: height * minHeightRatio },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: Spacing.spacing.lg,
    backgroundColor: Colors.palette.white,
    borderRadius: Radius.radius.md,
  },
});