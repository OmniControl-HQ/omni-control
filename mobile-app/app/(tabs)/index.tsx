import { ScrollView, StyleSheet, View, Text } from "react-native";
import { GreetingSection } from "../../src/components/dashboard/GreetingSection";
import { PcStatusCard } from "../../src/components/dashboard/PcStatusCard";
import { PerformanceSection } from "../../src/components/dashboard/PerformanceSection";
import { QuickActionsGrid } from "../../src/components/dashboard/QuickActionsGrid";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassPanel } from "../../src/components/ui/GlassPanel";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, typography, radii } from "../../src/theme/tokens";
import { useConnection } from "../../src/contexts/ConnectionContext";

export default function DashboardScreen() {
  const { isConnected, isAuthenticated, error, serverInfo } = useConnection();

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Connection Status Card */}
        <GlassPanel style={styles.connectionCard}>
          <View style={styles.connectionHeader}>
            <Icon
              name={isAuthenticated ? "check-circle" : isConnected ? "sync" : "error"}
              size={24}
              color={isAuthenticated ? colors.connectedText : colors.primary}
            />
            <Text style={styles.connectionTitle}>
              {isAuthenticated
                ? "Connected to PC"
                : error
                ? "Connection Error"
                : isConnected
                ? "Authenticating..."
                : "Connecting..."}
            </Text>
          </View>
          
          {isAuthenticated && serverInfo && (
            <View style={styles.serverInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Device:</Text>
                <Text style={styles.infoValue}>{serverInfo.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>IP:</Text>
                <Text style={styles.infoValue}>{serverInfo.ip}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Platform:</Text>
                <Text style={styles.infoValue}>{serverInfo.platform}</Text>
              </View>
            </View>
          )}

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </GlassPanel>

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
  connectionCard: {
    padding: spacing.stackGap,
  },
  connectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  connectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  serverInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  infoValue: {
    ...typography.labelMd,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  errorText: {
    ...typography.labelMd,
    color: "#ef4444",
    marginTop: 8,
  },
});
