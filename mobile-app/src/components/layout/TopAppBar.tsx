import { Image, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../theme/tokens";

export function TopAppBar() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            height: 40,
            width: 40,
          }}
        />
        <Text style={styles.title}>Omni Control</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: -2,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "#121212",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  content: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: spacing.gridGutter,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
});
