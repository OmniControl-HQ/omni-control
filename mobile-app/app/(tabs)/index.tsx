import { ScrollView, StyleSheet, View } from "react-native";
import { GreetingSection } from "../../src/components/dashboard/GreetingSection";
import { PcStatusCard } from "../../src/components/dashboard/PcStatusCard";
import { PerformanceSection } from "../../src/components/dashboard/PerformanceSection";
import { QuickActionsGrid } from "../../src/components/dashboard/QuickActionsGrid";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { colors, spacing } from "../../src/theme/tokens";

export default function DashboardScreen() {
  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GreetingSection />
        <PcStatusCard />
        <QuickActionsGrid />
        <PerformanceSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 80,
    paddingBottom: 120,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackGap,
  },
});
