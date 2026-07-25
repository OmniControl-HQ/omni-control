import { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { GlassButton } from "../ui/GlassButton";
import { Icon } from "../ui/Icon";
import { colors, spacing, typography, radii } from "../../theme/tokens";
import { useConnection } from "../../contexts/ConnectionContext";

export function ConnectionModal() {
  const {
    showConnectionModal,
    serverIp,
    serverPin,
    error,
    isDiscovering,
    connect,
    closeConnectionModal,
  } = useConnection();

  const [editableIp, setEditableIp] = useState(serverIp);
  const [editablePin, setEditablePin] = useState(serverPin);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await connect(editableIp, editablePin);
    setIsConnecting(false);
  };

  return (
    <Modal
      visible={showConnectionModal}
      transparent
      animationType="fade"
      onRequestClose={closeConnectionModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Icon name="wifi" size={32} color={colors.primary} />
            <Text style={styles.title}>
              {isDiscovering ? "Discovering..." : "Connect to PC"}
            </Text>
          </View>

          {isDiscovering ? (
            <View style={styles.discoveringContainer}>
              <Icon name="sync" size={48} color={colors.primary} />
              <Text style={styles.discoveringText}>Scanning network for PC...</Text>
            </View>
          ) : (
            <>
              {error && (
                <View style={styles.errorBox}>
                  <Icon name="error" size={20} color="#ef4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PC IP Address</Text>
                  <TextInput
                    style={styles.input}
                    value={editableIp}
                    onChangeText={setEditableIp}
                    placeholder="192.168.x.x"
                    placeholderTextColor={colors.onSurfaceVariant}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PIN</Text>
                  <TextInput
                    style={styles.input}
                    value={editablePin}
                    onChangeText={setEditablePin}
                    placeholder="Enter 4-digit PIN"
                    placeholderTextColor={colors.onSurfaceVariant}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.actions}>
                <GlassButton
                  style={styles.connectButton}
                  onPress={handleConnect}
                  disabled={isConnecting || !editableIp || !editablePin}
                >
                  <Icon
                    name={isConnecting ? "sync" : "check"}
                    size={20}
                    color={colors.primary}
                  />
                  <Text style={styles.buttonText}>
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Text>
                </GlassButton>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.containerPadding,
  },
  modal: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.containerPadding,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: spacing.stackGap,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  discoveringContainer: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 16,
  },
  discoveringText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: radii.md,
    marginBottom: spacing.stackGap,
  },
  errorText: {
    ...typography.labelMd,
    color: "#ef4444",
    flex: 1,
  },
  form: {
    gap: spacing.stackGap,
    marginBottom: spacing.stackGap,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  input: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.md,
    padding: 16,
    color: colors.onSurface,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  actions: {
    gap: spacing.gridGutter,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  buttonText: {
    ...typography.labelMd,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
});
