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
import { useUser } from "@/src/hooks/authHooks";
import Header from "@/src/components/ui/Header";
import ScoreCircle from "@/src/components/ui/ScoreCircle";
import ResultsCard from "@/src/components/ui/ResultsCard";

export default function Results() {
    const { width, height } = useWindowDimensions();
    const theme = useAppTheme("light");
    const { user } = useUser();
    
    const isCompact = width < 350;
    const isWide = width >= 900;
    return (
        <Screen
              theme={theme}
              scroll
              contentContainerStyle={[styles.screenContent, isWide && styles.screenContentWide]}
        >
            <View style={styles.content}>
                <Header title="Diagnostic Results" subtitle="Your Complete Skin Analysis Report"/>
                <ResultsCard>
                    <Text style={styles.title}>Overall Score</Text>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <ScoreCircle score={92}/>
                    </View>
                </ResultsCard>
                <ResultsCard>
                    <Text style={styles.title}>Analysis</Text>
                </ResultsCard>
                <ResultsCard>
                    <Text style={styles.title}>Sources</Text>
                </ResultsCard>
            </View>
        </Screen>
    )
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
    resultsBox: {
        borderRadius: Radius.radius.md,
    },
    title: {
        fontFamily: Typography.typography.fontFamily.regular,
        margin: Spacing.spacing.md,
        color: Colors.palette.slate500
    }
});