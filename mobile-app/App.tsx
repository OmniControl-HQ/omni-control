import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import io, { Socket } from "socket.io-client";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

const statusStyles = {
  disconnected: {
    badge: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(239, 68, 68, 0.2)",
    },
    dot: {
      backgroundColor: "#ef4444",
    },
    text: {
      color: "#ef4444",
    },
  },
  connecting: {
    badge: {
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(245, 158, 11, 0.2)",
    },
    dot: {
      backgroundColor: "#f55e0b",
    },
    text: {
      color: "#f59e0b",
    },
  },
  connected: {
    badge: {
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(16, 185, 129, 0.2)",
    },
    dot: {
      backgroundColor: "#10b981",
    },
    text: {
      color: "#10b981",
    },
  },
};

export default function App() {
  const [serverIp, setServerIp] = useState<string>("192.168.0.103");

  const [port, setPort] = useState<string>("5000");
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [logs, setLogs] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) =>
      [`[${timestamp}] ${message}`, ...prevLogs].slice(0, 10),
    );
  };

  const connectToServer = () => {
    // disconnect existing socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const serverUrl = `http://${serverIp}:${port}`;
    setStatus("connecting");
    addLog(`Connecting to ${serverUrl}...`);

    // initialize socket connection
    const socket = io(serverUrl, {
      transports: ["websocket"],
      timeout: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("connected");
      addLog("Connected to Server");
      console.log("Connected to Server");
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
      addLog("Disconnected from server");
    });

    socket.on("connect_error", (error: Error) => {
      setStatus("disconnected");
      addLog(`Connection error: ${error.message}`);
    });
  };

  useEffect(() => {
    connectToServer();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Ω</Text>
          </View>
          <Text style={styles.title}>OmniControl</Text>
          <Text style={styles.subtitle}>Mobile Client</Text>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <Text style={styles.cardTitle}>Connection Status</Text>
            <View style={[styles.statusBadge, statusStyles[status].badge]}>
              <View style={[styles.statusDot, statusStyles[status].dot]} />
              <Text style={[styles.statusText, statusStyles[status].text]}>
                {status.toUpperCase()}
              </Text>
            </View>
          </View>

          {status === "connecting" && (
            <ActivityIndicator color="#6366f1" style={{ marginVertical: 10 }} />
          )}

          {/* IP and Port settings */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Server IP Address</Text>
              <TextInput
                style={styles.input}
                value={serverIp}
                onChangeText={setServerIp}
                placeholder="192.168.1.100"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputWrapper, { flex: 0.4, marginLeft: 12 }]}>
              <Text style={styles.inputLabel}>Port</Text>
              <TextInput
                style={styles.input}
                value={port}
                onChangeText={setPort}
                placeholder="5000"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={connectToServer}>
            <Text style={styles.buttonText}>Reconnect</Text>
          </TouchableOpacity>
        </View>

        {/* Logs Card */}
        <View style={[styles.card, { flex: 1, marginTop: 16 }]}>
          <Text style={styles.cardTitle}>Activity Logs</Text>
          <View style={styles.logContainer}>
            {logs.length === 0 ? (
              <Text style={styles.emptyLogs}>No activity logs yet.</Text>
            ) : (
              logs.map((log, index) => (
                <Text key={index} style={styles.logTextItem}>
                  {log}
                </Text>
              ))
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f19",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#6366f1",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f3f4f6",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "rgba(17, 24, 39, 0.7)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f3f4f6",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f3f4f6",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  logContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  emptyLogs: {
    color: "#6b7280",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  logTextItem: {
    color: "#9ca3af",
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 6,
  },
});
