import { Pressable, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { colors, spacing } from "../../theme/tokens";

type IconButtonProps = {
  icon: React.ComponentProps<typeof Icon>["name"];
  onPress?: () => void;
};

export function IconButton({ icon, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      hitSlop={8}
    >
      <Icon name={icon} size={24} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: spacing.touchTargetMin,
    height: spacing.touchTargetMin,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
