import { View, Text, StyleSheet } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { colors, typography } from "../../src/theme/tokens";

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App configuration and preferences</Text>
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
