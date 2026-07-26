import { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassButton } from "../../src/components/ui/GlassButton";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, typography, radii } from "../../src/theme/tokens";
import { useMouseControl } from "../../src/hooks/useMouseControl";
import { useConnection } from "../../src/contexts/ConnectionContext";

export default function MouseScreen() {
  const [isTouching, setIsTouching] = useState(false);
  const { isAuthenticated } = useConnection();

  const { sendMouseClick, sendScroll, createTrackpadResponder } =
    useMouseControl({
      sensitivity: 1.5,
      scrollSensitivity: 10,
    });

  const trackpadResponder = useMemo(
    () => createTrackpadResponder(setIsTouching),
    [createTrackpadResponder],
  );

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        <View
          {...trackpadResponder.panHandlers}
          style={[
            styles.trackpad,
            isTouching && styles.trackpadActive,
            !isAuthenticated && styles.trackpadDisabled,
          ]}
        >
          {!isTouching && (
            <View style={styles.trackpadIndicator}>
              <Icon
                name={isAuthenticated ? "touch-app" : "sync"}
                size={40}
                color={colors.onSurfaceVariant}
              />
              <Text style={styles.trackpadHint}>
                {isAuthenticated ? "Swipe to move cursor" : "Connecting..."}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.controlBar}>
          <View style={styles.mouseButtons}>
            <GlassButton
              style={styles.mouseButton}
              onPress={() => sendMouseClick("left", false)}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-back" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Left</Text>
            </GlassButton>
            <GlassButton
              style={styles.mouseButton}
              onPress={() => sendMouseClick("right", false)}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-forward" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Right</Text>
            </GlassButton>
          </View>

          <View style={styles.actionRow}>
            <GlassButton
              style={styles.scrollButton}
              onPress={() => sendScroll("up")}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-upward" size={20} color={colors.primary} />
            </GlassButton>
            <GlassButton
              style={styles.actionButton}
              onPress={() => sendMouseClick("left", true)}
              disabled={!isAuthenticated}
            >
              <Icon name="touch-app" size={20} color={colors.primary} />
              <Text style={styles.actionText}>2x</Text>
            </GlassButton>
            <GlassButton
              style={styles.scrollButton}
              onPress={() => sendScroll("down")}
              disabled={!isAuthenticated}
            >
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
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.08)",
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
  trackpadDisabled: {
    opacity: 0.5,
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
