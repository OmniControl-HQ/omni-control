import { StyleSheet, Text, View } from "react-native";
import { GlassPanel } from "../ui/GlassPanel";
import { MetricChart } from "../ui/MetricChart";
import { SectionLabel } from "../ui/SectionLabel";
import { colors, spacing, typography, fonts } from "../../theme/tokens";

type PerformanceMetric = {
  id: string;
  label: string;
  value: string;
  linePath: string;
  areaPath: string;
};

const defaultMetrics: PerformanceMetric[] = [
  {
    id: "cpu",
    label: "CPU",
    value: "24%",
    linePath: "M0,35 Q10,25 20,30 T40,20 T60,10 T80,25 T100,15",
    areaPath: "M0,35 Q10,25 20,30 T40,20 T60,10 T80,25 T100,15 L100,40 L0,40 Z",
  },
  {
    id: "ram",
    label: "RAM",
    value: "16GB / 64GB",
    linePath: "M0,30 Q15,30 25,25 T50,30 T75,15 T100,20",
    areaPath: "M0,30 Q15,30 25,25 T50,30 T75,15 T100,20 L100,40 L0,40 Z",
  },
];

type PerformanceSectionProps = {
  metrics?: PerformanceMetric[];
};

export function PerformanceSection({ metrics = defaultMetrics }: PerformanceSectionProps) {
  return (
    <View style={styles.section}>
      <SectionLabel>Performance</SectionLabel>
      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.cell}>
            <GlassPanel style={styles.card} contentStyle={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>{metric.label}</Text>
                <Text style={styles.cardValue}>{metric.value}</Text>
              </View>
              <MetricChart
                linePath={metric.linePath}
                areaPath={metric.areaPath}
                gradientId={`gradient-${metric.id}`}
              />
            </GlassPanel>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    gap: spacing.stackGap,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -2,
  },
  cell: {
    width: "50%",
    padding: 2,
  },
  card: {
    minHeight: 128,
  },
  cardContent: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
  cardValue: {
    ...typography.labelSm,
    fontFamily: fonts.semiBold,
    color: colors.onSurfaceVariant,
    letterSpacing: 0,
    textTransform: "none",
  },
});
