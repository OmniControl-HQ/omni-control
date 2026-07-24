import { useState } from "react";
import { PanResponder } from "react-native";
import { socketService } from "../lib/socket";
import Constants from "expo-constants";

interface UseMouseControlOptions {
  sensitivity?: number;
  scrollSensitivity?: number;
}

export function useMouseControl(options: UseMouseControlOptions = {}) {
  const { sensitivity = 1.5, scrollSensitivity = 5 } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect to server
  const connect = async (serverUrl: string, pin: string) => {
    try {
      console.log("[Mouse] Connecting to:", serverUrl);
      setError(null);
      await socketService.connect(serverUrl);
      setIsConnected(true);
      console.log("[Mouse] Connected successfully");

      // Identify device
      const deviceId = Constants.sessionId || `mobile-${Date.now()}`;
      console.log("[Mouse] Identifying device:", deviceId);
      const result = await socketService.identify({
        id: deviceId,
        name: Constants.deviceName || "Mobile Device",
        platform: "mobile",
        pin,
      });

      console.log("[Mouse] Identification result:", result);
      if (result.ok) {
        console.log("[Mouse] Setting authenticated to TRUE");
        setIsAuthenticated(true);
        console.log("[Mouse] Authenticated state updated");
        
        // Verify the socketService also knows we're authenticated
        const isAuthInService = socketService.isAuthenticated();
        console.log("[Mouse] SocketService authenticated?", isAuthInService);
      } else {
        console.error("[Mouse] Authentication failed:", result.error);
        setError(result.error || "Authentication failed");
        socketService.disconnect();
        setIsConnected(false);
      }
    } catch (err) {
      console.error("[Mouse] Connection error:", err);
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
    }
  };

  // Disconnect
  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
    setIsAuthenticated(false);
  };

  // Mouse move with delta tracking
  const sendMouseMove = (dx: number, dy: number) => {
    // Use socketService authentication status directly to avoid stale closure
    const isAuth = socketService.isAuthenticated();
    console.log("[Mouse] sendMouseMove called, socketService.isAuthenticated():", isAuth);
    
    if (!isAuth) {
      console.log("[Mouse] Not authenticated, skipping move");
      return;
    }
    const scaledDx = Math.round(dx * sensitivity);
    const scaledDy = Math.round(dy * sensitivity);
    console.log("[Mouse] Sending move:", { dx: scaledDx, dy: scaledDy });
    socketService.sendPointerMove(scaledDx, scaledDy);
  };

  // Mouse click
  const sendMouseClick = async (
    button: "left" | "right" | "middle" = "left",
    double = false
  ) => {
    if (!socketService.isAuthenticated()) return;
    await socketService.sendPointerClick(button, double);
  };

  // Scroll
  const sendScroll = (direction: "up" | "down") => {
    if (!socketService.isAuthenticated()) return;
    const dy = direction === "up" ? scrollSensitivity : -scrollSensitivity;
    socketService.sendPointerScroll(0, dy);
  };

  // Create pan responder for trackpad
  const createTrackpadResponder = () => {
    let lastX = 0;
    let lastY = 0;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        lastX = evt.nativeEvent.pageX;
        lastY = evt.nativeEvent.pageY;
        console.log("[Trackpad] Touch started at:", { x: lastX, y: lastY });
      },
      onPanResponderMove: (evt) => {
        const currentX = evt.nativeEvent.pageX;
        const currentY = evt.nativeEvent.pageY;
        const dx = currentX - lastX;
        const dy = currentY - lastY;

        if (dx !== 0 || dy !== 0) {
          console.log("[Trackpad] Movement detected:", { dx, dy });
          sendMouseMove(dx, dy);
          lastX = currentX;
          lastY = currentY;
        }
      },
      onPanResponderRelease: () => {
        console.log("[Trackpad] Touch released");
        lastX = 0;
        lastY = 0;
      },
    });
  };

  return {
    isConnected,
    isAuthenticated,
    error,
    connect,
    disconnect,
    sendMouseMove,
    sendMouseClick,
    sendScroll,
    createTrackpadResponder,
  };
}
