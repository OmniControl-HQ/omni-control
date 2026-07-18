import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { io, Socket } from "socket.io-client";

type ConnectionStatus = "disconnected" | "connecting" | "connected";
type MediaAction =
  | "play-pause"
  | "next"
  | "previous"
  | "volume-up"
  | "volume-down"
  | "mute";
type PointerButton = "left" | "right" | "middle";

const statusColor: Record<ConnectionStatus, string> = {
  disconnected: "#f87171",
  connecting: "#fbbf24",
  connected: "#6ee7b7",
};

function ControlButton({
  label,
  onPress,
  compact = false,
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.controlButton,
        compact && styles.compactButton,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.controlLabel, compact && styles.compactLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function App() {
  const [host, setHost] = useState("192.168.1.145");
  const [port, setPort] = useState("4321");
  const [pin, setPin] = useState("4812");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [message, setMessage] = useState(
    "Enter your desktop address to connect.",
  );
  const socketRef = useRef<Socket | null>(null);
  const deviceId = useRef(
    `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  );
  const gestureRef = useRef({ x: 0, y: 0 });
  const pendingMovementRef = useRef({ dx: 0, dy: 0 });

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setStatus("disconnected");
    setMessage("Disconnected from your desktop.");
  };

  const connect = () => {
    const normalizedHost = host.trim();
    const normalizedPort = port.trim();
    if (!normalizedHost || !normalizedPort || pin.length !== 4) {
      setMessage("Enter a server address, port, and four-digit PIN.");
      return;
    }

    socketRef.current?.disconnect();
    setStatus("connecting");
    setMessage("Connecting to your desktop...");
    const socket = io(`http://${normalizedHost}:${normalizedPort}`, {
      transports: ["websocket"],
      timeout: 6000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit(
        "device:identify",
        {
          id: deviceId.current,
          name: Platform.OS === "ios" ? "iPhone Remote" : "Android Remote",
          platform: Platform.OS,
          pin,
        },
        (result: { ok: boolean; error?: string }) => {
          if (!result.ok) {
            setStatus("disconnected");
            setMessage(
              result.error ?? "Your desktop rejected this connection.",
            );
            socket.disconnect();
            return;
          }
          setStatus("connected");
          setMessage("Securely connected to your desktop.");
        },
      );
    });

    socket.on("connect_error", () => {
      setStatus("disconnected");
      setMessage("Unable to reach that server. Check the address and network.");
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });
  };

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    const interval = setInterval(() => {
      const movement = pendingMovementRef.current;
      if (!movement.dx && !movement.dy) return;
      pendingMovementRef.current = { dx: 0, dy: 0 };
      socketRef.current?.volatile.emit("control:pointer:move", movement);
    }, 8);
    return () => clearInterval(interval);
  }, [status]);

  const sendPointerClick = (button: PointerButton) => {
    socketRef.current?.emit("control:pointer:click", { button });
  };

  const sendMedia = (action: MediaAction) => {
    socketRef.current?.emit("control:media", { action });
  };

  const trackpadResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => status === "connected",
        onMoveShouldSetPanResponder: () => status === "connected",
        onPanResponderGrant: () => {
          gestureRef.current = { x: 0, y: 0 };
        },
        onPanResponderMove: (_, gesture) => {
          const dx = gesture.dx - gestureRef.current.x;
          const dy = gesture.dy - gestureRef.current.y;
          gestureRef.current = { x: gesture.dx, y: gesture.dy };
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
          pendingMovementRef.current = {
            dx: pendingMovementRef.current.dx + dx * 1.35,
            dy: pendingMovementRef.current.dy + dy * 1.35,
          };
        },
        onPanResponderRelease: (_, gesture) => {
          if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5)
            sendPointerClick("left");
        },
      }),
    [status],
  );

  const isConnected = status === "connected";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.mark}>
              <Text style={styles.markText}>O</Text>
            </View>
            <View>
              <Text style={styles.eyebrow}>OMNICONTROL</Text>
              <Text style={styles.title}>Remote</Text>
            </View>
            <Pressable
              onPress={isConnected ? disconnect : connect}
              style={({ pressed }) => [
                styles.statusPill,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: statusColor[status] },
                ]}
              />
              <Text style={[styles.statusText, { color: statusColor[status] }]}>
                {status}
              </Text>
            </Pressable>
          </View>

          <View style={styles.glassPanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Desktop connection</Text>
              <Text style={styles.panelCaption}>Secure PIN pairing</Text>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.hostInput}>
                <Text style={styles.inputLabel}>SERVER ADDRESS</Text>
                <TextInput
                  value={host}
                  onChangeText={setHost}
                  editable={!isConnected}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                  placeholder="192.168.1.145"
                  placeholderTextColor="#6f7477"
                  style={styles.input}
                />
              </View>
              <View style={styles.portInput}>
                <Text style={styles.inputLabel}>PORT</Text>
                <TextInput
                  value={port}
                  onChangeText={setPort}
                  editable={!isConnected}
                  keyboardType="number-pad"
                  placeholder="4321"
                  placeholderTextColor="#6f7477"
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.hostInput}>
                <Text style={styles.inputLabel}>CONNECTION PIN</Text>
                <TextInput
                  value={pin}
                  onChangeText={(value) =>
                    setPin(value.replace(/\D/g, "").slice(0, 4))
                  }
                  editable={!isConnected}
                  keyboardType="number-pad"
                  secureTextEntry
                  style={[styles.input, styles.pinInput]}
                />
              </View>
              <Pressable
                onPress={isConnected ? disconnect : connect}
                style={({ pressed }) => [
                  styles.connectButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.connectLabel}>
                  {isConnected ? "Disconnect" : "Connect"}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.helperText}>{message}</Text>
          </View>

          <SectionTitle>Trackpad</SectionTitle>
          <View
            style={[styles.trackpad, !isConnected && styles.disabledSurface]}
            {...trackpadResponder.panHandlers}
          >
            <View style={styles.trackpadGlow} />
            <Text style={styles.trackpadHint}>
              {isConnected
                ? "Tap to click · Drag to move"
                : "Connect to enable pointer control"}
            </Text>
          </View>
          <View style={styles.pointerActions}>
            <ControlButton
              label="Left click"
              onPress={() => sendPointerClick("left")}
            />
            <ControlButton
              label="Right click"
              onPress={() => sendPointerClick("right")}
            />
            <ControlButton
              label="Scroll up"
              onPress={() =>
                socketRef.current?.emit("control:pointer:scroll", {
                  dx: 0,
                  dy: 4,
                })
              }
              compact
            />
            <ControlButton
              label="Scroll down"
              onPress={() =>
                socketRef.current?.emit("control:pointer:scroll", {
                  dx: 0,
                  dy: -4,
                })
              }
              compact
            />
          </View>

          <SectionTitle>Media</SectionTitle>
          <View style={styles.glassPanel}>
            <View style={styles.mediaRow}>
              <ControlButton
                label="Mute"
                onPress={() => sendMedia("mute")}
                compact
              />
              <ControlButton
                label="Vol −"
                onPress={() => sendMedia("volume-down")}
                compact
              />
              <ControlButton
                label="Vol +"
                onPress={() => sendMedia("volume-up")}
                compact
              />
            </View>
            <View style={[styles.mediaRow, styles.mediaPrimaryRow]}>
              <ControlButton
                label="Previous"
                onPress={() => sendMedia("previous")}
                compact
              />
              <Pressable
                onPress={() => sendMedia("play-pause")}
                style={({ pressed }) => [
                  styles.playButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.playLabel}>Play / Pause</Text>
              </Pressable>
              <ControlButton
                label="Next"
                onPress={() => sendMedia("next")}
                compact
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#101314" },
  flex: { flex: 1 },
  content: { padding: 20, paddingBottom: 36, gap: 14 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 8,
  },
  mark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  markText: { color: "#f0f1f1", fontSize: 18, fontWeight: "300" },
  eyebrow: {
    color: "rgba(226,226,228,0.45)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.7,
  },
  title: {
    color: "#e2e2e4",
    fontSize: 25,
    fontWeight: "300",
    letterSpacing: 0.3,
  },
  statusPill: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { textTransform: "capitalize", fontSize: 11, fontWeight: "700" },
  glassPanel: {
    backgroundColor: "rgba(30,32,33,0.48)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    padding: 15,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  panelTitle: { color: "#e2e2e4", fontSize: 15, fontWeight: "600" },
  panelCaption: { color: "rgba(226,226,228,0.38)", fontSize: 11 },
  inputRow: { flexDirection: "row", gap: 10, marginBottom: 11 },
  hostInput: { flex: 1 },
  portInput: { width: 78 },
  inputLabel: {
    color: "rgba(226,226,228,0.4)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    color: "#e2e2e4",
    fontSize: 14,
    backgroundColor: "rgba(0,0,0,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    minHeight: 43,
    paddingHorizontal: 11,
  },
  pinInput: { letterSpacing: 5, textAlign: "center" },
  connectButton: {
    alignSelf: "flex-end",
    minHeight: 43,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  connectLabel: { color: "#f5f5f5", fontSize: 13, fontWeight: "700" },
  helperText: { color: "rgba(226,226,228,0.48)", fontSize: 12, lineHeight: 17 },
  sectionTitle: {
    color: "rgba(226,226,228,0.43)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 8,
    marginLeft: 4,
  },
  trackpad: {
    height: 235,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(30,32,33,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  trackpadGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.025)",
  },
  trackpadHint: { color: "rgba(226,226,228,0.42)", fontSize: 13 },
  disabledSurface: { opacity: 0.48 },
  pointerActions: { flexDirection: "row", gap: 8 },
  controlButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },
  compactButton: { minHeight: 40 },
  controlLabel: {
    color: "rgba(226,226,228,0.88)",
    fontSize: 13,
    fontWeight: "600",
  },
  compactLabel: { fontSize: 12 },
  mediaRow: { flexDirection: "row", gap: 9 },
  mediaPrimaryRow: { marginTop: 9 },
  playButton: {
    flex: 1.5,
    minHeight: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  playLabel: { color: "#fff", fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
});
