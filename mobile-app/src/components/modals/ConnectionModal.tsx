import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
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
  const [showScanner, setShowScanner] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    await connect(editableIp, editablePin);
    setIsConnecting(false);
  };

  const handleScanQR = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (status === "granted") {
      setShowScanner(true);
    }
  };

  const handleQRScanned = ({ data }: { data: string }) => {
    try {
      const connectionData = JSON.parse(data);
      if (connectionData.ip && connectionData.pin) {
        setEditableIp(connectionData.ip);
        setEditablePin(connectionData.pin);
        setShowScanner(false);
        // Auto-connect after QR scan
        setTimeout(() => {
          connect(connectionData.ip, connectionData.pin);
        }, 300);
      }
    } catch (err) {
      console.error("Invalid QR code data:", err);
    }
  };

  if (showScanner) {
    return (
      <Modal
        visible={showConnectionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleQRScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <View style={styles.scannerOverlay}>
              <View style={styles.scannerHeader}>
                <Text style={styles.scannerTitle}>Scan QR Code</Text>
                <Text style={styles.scannerSubtitle}>
                  Point camera at the QR code from desktop app
                </Text>
              </View>

              <View style={styles.scannerFrame} />

              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowScanner(false)}
              >
                <Icon name="close" size={24} color={colors.onSurface} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </CameraView>
        </View>
      </Modal>
    );
  }

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
              <Text style={styles.discoveringText}>
                Scanning network for PC...
              </Text>
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
                <GlassButton style={styles.qrButton} onPress={handleScanQR}>
                  <Icon
                    name="qr-code-scanner"
                    size={20}
                    color={colors.onSurfaceVariant}
                  />
                  <Text style={styles.qrButtonText}>Scan QR Code</Text>
                </GlassButton>

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
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  qrButtonText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    fontFamily: "Inter_500Medium",
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
  // Scanner styles
  scannerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: spacing.containerPadding,
  },
  scannerHeader: {
    alignItems: "center",
    gap: 8,
  },
  scannerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  scannerSubtitle: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
    textAlign: "center",
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radii.lg,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.full,
  },
  cancelButtonText: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontFamily: "Inter_600SemiBold",
  },
});
