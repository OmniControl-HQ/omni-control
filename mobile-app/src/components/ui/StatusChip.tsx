import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../../theme/tokens";

type StatusChipProps = {
  label: string;
};

export function StatusChip({ label }: StatusChipProps) {
  return (
    <View style={styles.chip}>
      <View style={styles.dot} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.connected,
  },
  label: {
    ...typography.labelSm,
    color: colors.connectedText,
    textTransform: "capitalize",
  },
});
