import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors, radii } from "../../theme/tokens";

type GlassPanelProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function GlassPanel({ children, style, contentStyle }: GlassPanelProps) {
  return (
    <View style={[styles.wrapper, style]}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={28} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderRadius: radii.lg,
    backgroundColor: "rgba(26, 28, 30, 0.72)",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.05)",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderRightColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    padding: 24,
  },
});
