import { View, Text, StyleSheet, Pressable } from "react-native";
import { TopAppBar } from "../../src/components/layout/TopAppBar";
import { Icon } from "../../src/components/ui/Icon";
import { colors, spacing, radii, typography } from "../../src/theme/tokens";
import { useMediaControl } from "../../src/hooks/useMediaControl";

export default function MediaScreen() {
  const { sendMediaCommand, isConnected } = useMediaControl();

  const handlePlayPause = () => sendMediaCommand("play-pause");
  const handleNext = () => sendMediaCommand("next");
  const handlePrevious = () => sendMediaCommand("previous");
  const handleVolumeUp = () => sendMediaCommand("volume-up");
  const handleVolumeDown = () => sendMediaCommand("volume-down");
  const handleMute = () => sendMediaCommand("mute");

  return (
    <View style={styles.screen}>
      <TopAppBar />
      <View style={styles.content}>
        {!isConnected && (
          <View style={styles.disconnectedBanner}>
            <Icon name="error" size={18} color="#ef4444" />
            <Text style={styles.disconnectedText}>Not connected to PC</Text>
          </View>
        )}

        <Text style={styles.title}>Media Control</Text>

        {/* Volume Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Volume</Text>
          <View style={styles.volumeRow}>
            <Pressable
              style={[
                styles.volumeButton,
                !isConnected && styles.buttonDisabled,
              ]}
              onPress={handleVolumeDown}
              disabled={!isConnected}
            >
              <Icon name="volume-down" size={28} color={colors.onSurface} />
            </Pressable>
            <Pressable
              style={[styles.muteButton, !isConnected && styles.buttonDisabled]}
              onPress={handleMute}
              disabled={!isConnected}
            >
              <Icon
                name="volume-off"
                size={24}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
            <Pressable
              style={[
                styles.volumeButton,
                !isConnected && styles.buttonDisabled,
              ]}
              onPress={handleVolumeUp}
              disabled={!isConnected}
            >
              <Icon name="volume-up" size={28} color={colors.onSurface} />
            </Pressable>
          </View>
        </View>

        {/* Playback Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Playback</Text>
          <View style={styles.playbackRow}>
            <Pressable
              style={[
                styles.playbackButton,
                !isConnected && styles.buttonDisabled,
              ]}
              onPress={handlePrevious}
              disabled={!isConnected}
            >
              <Icon name="skip-previous" size={32} color={colors.onSurface} />
            </Pressable>
            <Pressable
              style={[
                styles.playPauseButton,
                !isConnected && styles.buttonDisabled,
              ]}
              onPress={handlePlayPause}
              disabled={!isConnected}
            >
              <Icon name="play-arrow" size={48} color={colors.primary} />
            </Pressable>
            <Pressable
              style={[
                styles.playbackButton,
                !isConnected && styles.buttonDisabled,
              ]}
              onPress={handleNext}
              disabled={!isConnected}
            >
              <Icon name="skip-next" size={32} color={colors.onSurface} />
            </Pressable>
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
    padding: spacing.containerPadding,
    gap: spacing.stackGap * 2,
  },
  disconnectedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: radii.md,
  },
  disconnectedText: {
    ...typography.labelMd,
    color: "#ef4444",
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginBottom: spacing.stackGap,
  },
  section: {
    gap: spacing.stackGap,
  },
  sectionLabel: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.gridGutter,
  },
  volumeButton: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  muteButton: {
    width: 64,
    height: 64,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  playbackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.gridGutter * 2,
    marginTop: spacing.stackGap,
  },
  playbackButton: {
    width: 72,
    height: 72,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  playPauseButton: {
    width: 96,
    height: 96,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  buttonDisabled: {
    opacity: 0.3,
  },
});
