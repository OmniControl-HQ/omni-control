import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassPanel } from "../../src/components/ui/GlassPanel";
import { GlassButton } from "../../src/components/ui/GlassButton";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, typography, radii } from "../../src/theme/tokens";

export default function MouseScreen() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        {/* Trackpad Area */}
        <GlassPanel style={styles.trackpadContainer} contentStyle={styles.trackpadContent}>
          <Text style={styles.trackpadLabel}>Trackpad</Text>
          <Pressable
            style={({ pressed }) => [
              styles.trackpad,
              (pressed || isDragging) && styles.trackpadActive,
            ]}
            onPressIn={() => setIsDragging(true)}
            onPressOut={() => setIsDragging(false)}
          >
            <View style={styles.trackpadIndicator}>
              <Icon name="touch-app" size={32} color={colors.onSurfaceVariant} />
              <Text style={styles.trackpadHint}>Touch to move cursor</Text>
            </View>
          </Pressable>

          {/* Mouse Buttons */}
          <View style={styles.mouseButtons}>
            <GlassButton style={styles.mouseButton}>
              <Text style={styles.mouseButtonText}>L</Text>
            </GlassButton>
            <GlassButton style={styles.mouseButton}>
              <Text style={styles.mouseButtonText}>R</Text>
            </GlassButton>
          </View>
        </GlassPanel>

        {/* Scroll Area */}
        <GlassPanel style={styles.scrollContainer} contentStyle={styles.scrollContent}>
          <Text style={styles.sectionLabel}>Scroll</Text>
          <View style={styles.scrollButtons}>
            <GlassButton style={styles.scrollButton}>
              <Icon name="arrow-upward" size={24} color={colors.primary} />
            </GlassButton>
            <GlassButton style={styles.scrollButton}>
              <Icon name="arrow-downward" size={24} color={colors.primary} />
            </GlassButton>
          </View>
        </GlassPanel>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <GlassButton style={styles.actionButton}>
            <Icon name="double-arrow" size={20} color={colors.primary} />
            <Text style={styles.actionLabel}>Double Click</Text>
          </GlassButton>
          <GlassButton style={styles.actionButton}>
            <Icon name="desktop-windows" size={20} color={colors.primary} />
            <Text style={styles.actionLabel}>Show Desktop</Text>
          </GlassButton>
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
    paddingBottom: 120,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackGap,
  },
  trackpadContainer: {
    flex: 1,
  },
  trackpadContent: {
    padding: spacing.stackGap,
    gap: spacing.gridGutter,
  },
  trackpadLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
  },
  trackpad: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  trackpadActive: {
    backgroundColor: "rgba(46, 91, 255, 0.08)",
    borderColor: "rgba(46, 91, 255, 0.2)",
  },
  trackpadIndicator: {
    alignItems: "center",
    gap: 8,
  },
  trackpadHint: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  mouseButtons: {
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  mouseButton: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  mouseButtonText: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  scrollContainer: {
    alignSelf: "stretch",
  },
  scrollContent: {
    padding: spacing.stackGap,
    gap: spacing.gridGutter,
  },
  sectionLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
  },
  scrollButtons: {
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  scrollButton: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: spacing.gridGutter,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 8,
  },
  actionLabel: {
    ...typography.labelSm,
    color: colors.primary,
  },
});
