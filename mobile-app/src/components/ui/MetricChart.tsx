import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { colors } from "../../theme/tokens";

type MetricChartProps = {
  linePath: string;
  areaPath: string;
  gradientId: string;
};

export function MetricChart({ linePath, areaPath, gradientId }: MetricChartProps) {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors.primary} stopOpacity={0.2} />
            <Stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill={`url(#${gradientId})`} />
        <Path d={linePath} stroke={colors.primary} strokeWidth={2} fill="none" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "100%",
    marginTop: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
});
