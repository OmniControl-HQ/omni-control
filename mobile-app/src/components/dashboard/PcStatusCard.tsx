import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { GlassPanel } from "../ui/GlassPanel";
import { Icon } from "../ui/Icon";
import { StatusChip } from "../ui/StatusChip";
import { colors, typography } from "../../theme/tokens";

type PcStatusCardProps = {
  deviceName?: string;
  networkName?: string;
  latencyMs?: number;
  bandwidthGbps?: number;
  statusLabel?: string;
};

export function PcStatusCard({
  deviceName = "MacBook Pro M3",
  networkName = "Studio Network",
  latencyMs = 5,
  bandwidthGbps = 1.2,
  statusLabel = "Connected",
}: PcStatusCardProps) {
  return (
    <View style={styles.ambientGlow}>
      <LinearGradient
        colors={["rgba(46, 91, 255, 0.12)", "rgba(46, 91, 255, 0)"]}
        style={styles.glow}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
      <GlassPanel contentStyle={styles.panelContent}>
        <View style={styles.headerRow}>
          <View style={styles.deviceInfo}>
            <View style={styles.deviceIconWrap}>
              <Icon name="laptop-mac" size={28} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.deviceName}>{deviceName}</Text>
              <Text style={styles.networkName}>{networkName}</Text>
            </View>
          </View>
          <StatusChip label={statusLabel} />
        </View>

        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.1)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />

        <View style={styles.metricsRow}>
          <View style={styles.metricBlock}>
            <Text style={styles.metricLabel}>Latency</Text>
            <Text style={styles.metricValue}>
              {latencyMs}
              <Text style={styles.metricUnit}> ms</Text>
            </Text>
          </View>
          <View style={[styles.metricBlock, styles.metricBlockEnd]}>
            <Text style={styles.metricLabel}>Bandwidth</Text>
            <Text style={styles.metricValue}>
              {bandwidthGbps}
              <Text style={styles.metricUnit}> gbps</Text>
            </Text>
          </View>
        </View>
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  ambientGlow: {
    position: "relative",
  },
  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120%",
    height: "120%",
    marginLeft: "-60%",
    marginTop: "-60%",
    zIndex: -1,
  },
  panelContent: {
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 12,
  },
  deviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  deviceName: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  networkName: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 4,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  metricBlock: {
    gap: 2,
  },
  metricBlockEnd: {
    alignItems: "flex-end",
  },
  metricLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metricValue: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  metricUnit: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});
