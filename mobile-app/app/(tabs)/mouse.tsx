import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassButton } from "../../src/components/ui/GlassButton";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, typography, radii } from "../../src/theme/tokens";

export default function MouseScreen() {
  const [isTouching, setIsTouching] = useState(false);

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        <Pressable
          style={({ pressed }) => [
            styles.trackpad,
            (pressed || isTouching) && styles.trackpadActive,
          ]}
          onPressIn={() => setIsTouching(true)}
          onPressOut={() => setIsTouching(false)}
        >
          {!isTouching && (
            <View style={styles.trackpadIndicator}>
              <Icon
                name="touch-app"
                size={40}
                color={colors.onSurfaceVariant}
              />
              <Text style={styles.trackpadHint}>Swipe to move cursor</Text>
            </View>
          )}
        </Pressable>

        <View style={styles.controlBar}>
          <View style={styles.mouseButtons}>
            <GlassButton style={styles.mouseButton}>
              <Icon name="arrow-back" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Left</Text>
            </GlassButton>
            <GlassButton style={styles.mouseButton}>
              <Icon name="arrow-forward" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Right</Text>
            </GlassButton>
          </View>

          <View style={styles.actionRow}>
            <GlassButton style={styles.scrollButton}>
              <Icon name="arrow-upward" size={20} color={colors.primary} />
            </GlassButton>
            <GlassButton style={styles.actionButton}>
              <Icon name="touch-app" size={20} color={colors.primary} />
              <Text style={styles.actionText}>2x</Text>
            </GlassButton>
            <GlassButton style={styles.scrollButton}>
              <Icon name="arrow-downward" size={20} color={colors.primary} />
            </GlassButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: spacing.gridGutter,
    gap: spacing.gridGutter,
  },
  trackpad: {
    flex: 1,
    backgroundColor: "rgba(26, 28, 30, 0.72)",
    borderRadius: radii.lg,
    borderWidth: 2,
    // borderColor: "rgba(255, 255, 255, 0.05)",
    // borderTopColor: "rgba(255, 255, 255, 0.1)",
    // borderLeftColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(46, 91, 255, 0.1)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  trackpadActive: {
    backgroundColor: "rgba(46, 91, 255, 0.08)",
    borderColor: "rgba(46, 91, 255, 0.3)",
    borderTopColor: "rgba(46, 91, 255, 0.4)",
  },
  trackpadIndicator: {
    alignItems: "center",
    gap: 12,
    opacity: 0.6,
  },
  trackpadHint: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  controlBar: {
    gap: spacing.gridGutter,
  },
  mouseButtons: {
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  mouseButton: {
    flex: 1,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  mouseButtonText: {
    ...typography.labelMd,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  scrollButton: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    flex: 1,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionText: {
    ...typography.labelSm,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
});
