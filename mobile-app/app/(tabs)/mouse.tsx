import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { GlassButton } from "../../src/components/ui/GlassButton";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, typography, radii } from "../../src/theme/tokens";
import { useMouseControl } from "../../src/hooks/useMouseControl";

export default function MouseScreen() {
  const [isTouching, setIsTouching] = useState(false);
  const {
    isConnected,
    isAuthenticated,
    error,
    connect,
    disconnect,
    sendMouseClick,
    sendScroll,
    createTrackpadResponder,
  } = useMouseControl({ sensitivity: 1.8, scrollSensitivity: 8 });

  const trackpadResponder = useRef(createTrackpadResponder()).current;

  useEffect(() => {
    const serverUrl = "http://192.168.0.103:4321";
    const pin = "4812";

    console.log("[MouseScreen] Mounting, isConnected:", isConnected, "isAuthenticated:", isAuthenticated);

    if (!isConnected && !isAuthenticated) {
      console.log("[MouseScreen] Starting connection to", serverUrl);
      connect(serverUrl, pin);
    }

    return () => {
      console.log("[MouseScreen] Unmounting");
      disconnect();
    };
  }, []);

  const handleLeftClick = async () => {
    await sendMouseClick("left", false);
  };

  const handleRightClick = async () => {
    await sendMouseClick("right", false);
  };

  const handleDoubleClick = async () => {
    await sendMouseClick("left", true);
  };

  const handleScrollUp = () => {
    sendScroll("up");
  };

  const handleScrollDown = () => {
    sendScroll("down");
  };

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        {/* Connection Status */}
        {!isAuthenticated && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              {error
                ? `Error: ${error}`
                : isConnected
                  ? "Authenticating..."
                  : "Connecting..."}
            </Text>
          </View>
        )}

        {/* Large Trackpad Area */}
        <View
          {...trackpadResponder.panHandlers}
          style={[
            styles.trackpad,
            isTouching && styles.trackpadActive,
            !isAuthenticated && styles.trackpadDisabled,
          ]}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => setIsTouching(false)}
        >
          {!isTouching && (
            <View style={styles.trackpadIndicator}>
              <Icon
                name={isAuthenticated ? "touch-app" : "sync"}
                size={40}
                color={colors.onSurfaceVariant}
              />
              <Text style={styles.trackpadHint}>
                {isAuthenticated
                  ? "Swipe to move cursor"
                  : "Connecting to server..."}
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Control Bar */}
        <View style={styles.controlBar}>
          {/* Mouse Buttons */}
          <View style={styles.mouseButtons}>
            <GlassButton
              style={styles.mouseButton}
              onPress={handleLeftClick}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-back" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Left</Text>
            </GlassButton>
            <GlassButton
              style={styles.mouseButton}
              onPress={handleRightClick}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-forward" size={20} color={colors.primary} />
              <Text style={styles.mouseButtonText}>Right</Text>
            </GlassButton>
          </View>

          {/* Scroll & Actions */}
          <View style={styles.actionRow}>
            <GlassButton
              style={styles.scrollButton}
              onPress={handleScrollUp}
              disabled={!isAuthenticated}
            >
              <Icon name="arrow-upward" size={20} color={colors.primary} />
            </GlassButton>
            <GlassButton
              style={styles.actionButton}
              onPress={handleDoubleClick}
              disabled={!isAuthenticated}
            >
              <Icon name="touch-app" size={20} color={colors.primary} />
              <Text style={styles.actionText}>2x</Text>
            </GlassButton>
            <GlassButton
              style={styles.scrollButton}
              onPress={handleScrollDown}
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
  statusBar: {
    backgroundColor: "rgba(46, 91, 255, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    alignItems: "center",
  },
  statusText: {
    ...typography.labelMd,
    color: colors.primary,
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
