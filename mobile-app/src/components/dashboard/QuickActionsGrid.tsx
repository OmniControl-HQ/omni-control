import { StyleSheet, Text, View } from "react-native";
import { GlassButton } from "../ui/GlassButton";
import { Icon } from "../ui/Icon";
import { colors, typography } from "../../theme/tokens";

type QuickAction = {
  id: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
};

const defaultActions: QuickAction[] = [
  { id: "wake", icon: "power-settings-new", label: "Wake on LAN" },
  { id: "lock", icon: "lock", label: "Lock PC" },
  { id: "sleep", icon: "dark-mode", label: "Screen Sleep" },
  { id: "launch", icon: "apps", label: "Launch App" },
];

type QuickActionsGridProps = {
  actions?: QuickAction[];
  onActionPress?: (actionId: string) => void;
};

export function QuickActionsGrid({
  actions = defaultActions,
  onActionPress,
}: QuickActionsGridProps) {
  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <View key={action.id} style={styles.cell}>
          <GlassButton
            style={styles.actionButton}
            onPress={() => onActionPress?.(action.id)}
          >
            <Icon name={action.icon} size={28} color={colors.primary} />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </GlassButton>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -2,
    marginTop: 8,
  },
  cell: {
    width: "50%",
    padding: 2,
  },
  actionButton: {
    height: 112,
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 12,
  },
  actionLabel: {
    ...typography.labelMd,
    color: colors.onSurface,
  },
});
