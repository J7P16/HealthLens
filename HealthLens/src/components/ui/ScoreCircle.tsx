import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import * as Typography from '@/src/theme/tokens/typography';
import * as Colors from "@/src/theme/tokens/colors";

type Props = {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
};

export default function ScoreCircle({
  score,
  size = 120,
  strokeWidth = 10,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = () => {
    if (score >= 80) return "#4CAF50"; 
    if (score >= 50) return "#FFC107"; 
    return "#F44336"; 
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Good";
    return "Poor";
  };

  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6E6E6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          stroke={getColor()}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.label}>{getScoreLabel(score)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  scoreText: {
    fontSize: 28,
    fontFamily: Typography.typography.fontFamily.regular,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.palette.navy900
  },
  label: {
    fontSize: Typography.typography.size.caption,
    fontFamily: Typography.typography.fontFamily.regular,
    textAlign: "center",
    color: "#777",
  },
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});