import { StyleSheet, Text } from "react-native";
import { colors, typography } from "../../theme/tokens";

type SectionLabelProps = {
  children: string;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1.8,
    paddingLeft: 4,
  },
});
