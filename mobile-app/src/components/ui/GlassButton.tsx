import { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { radii } from "../../theme/tokens";

type GlassButtonProps = PressableProps & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function GlassButton({ children, style, ...props }: GlassButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.lg,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    borderLeftColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "rgba(46, 91, 255, 0.05)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
