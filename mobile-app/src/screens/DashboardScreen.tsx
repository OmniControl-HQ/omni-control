import { ScrollView, StyleSheet, View } from "react-native";
import { GreetingSection } from "../components/dashboard/GreetingSection";
import { PcStatusCard } from "../components/dashboard/PcStatusCard";
import { PerformanceSection } from "../components/dashboard/PerformanceSection";
import { QuickActionsGrid } from "../components/dashboard/QuickActionsGrid";
import { BottomNavBar, NavTab } from "../components/layout/BottomNavBar";
import { TopAppBar } from "../components/layout/TopAppBar";
import { colors, spacing } from "../theme/tokens";

type DashboardScreenProps = {
  activeTab: NavTab;
  onTabPress?: (tab: NavTab) => void;
};

export function DashboardScreen({ activeTab, onTabPress }: DashboardScreenProps) {
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
      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
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
