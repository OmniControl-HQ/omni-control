import { BlurView } from "expo-blur";
import { Platform, StyleSheet, Text, View } from "react-native";
import { IconButton } from "../ui/IconButton";
import { colors, spacing, typography } from "../../theme/tokens";

export function TopAppBar() {
  return (
    <View style={styles.wrapper}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={styles.content}>
        <IconButton icon="sensors" />
        <Text style={styles.title}>OmniRemote</Text>
        <IconButton icon="battery-charging-full" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "rgba(17, 20, 21, 0.72)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
  content: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.gridGutter,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
});
