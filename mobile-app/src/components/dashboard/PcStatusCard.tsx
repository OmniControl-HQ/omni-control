import { StyleSheet, Text, View } from "react-native";
import { GlassPanel } from "../ui/GlassPanel";
import { Icon } from "../ui/Icon";
import { colors, spacing, typography } from "../../theme/tokens";
import { useConnection } from "../../contexts/ConnectionContext";

export function PcStatusCard() {
  const { isConnected, isAuthenticated, error, serverInfo } = useConnection();
  return (
    <GlassPanel style={styles.connectionCard}>
      <View style={styles.connectionHeader}>
        <Icon
          name={
            isAuthenticated ? "check-circle" : isConnected ? "sync" : "error"
          }
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

      {error && <Text style={styles.errorText}>{error}</Text>}
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
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
