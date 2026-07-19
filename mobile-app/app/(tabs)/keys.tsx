import { View, Text, StyleSheet } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { colors, typography } from "../../src/theme/tokens";

export default function KeysScreen() {
  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        <Text style={styles.title}>Keys</Text>
        <Text style={styles.subtitle}>Keyboard shortcuts and macros</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.primary,
  },
  subtitle: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
});
