import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socketService } from "../lib/socket";
import Constants from "expo-constants";

interface ConnectionContextType {
  isConnected: boolean;
  isAuthenticated: boolean;
  error: string | null;
  serverInfo: any | null;
  connect: (serverUrl: string, pin: string) => Promise<void>;
  disconnect: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverInfo, setServerInfo] = useState<any | null>(null);

  // Auto-connect on mount
  useEffect(() => {
    const serverUrl = "http://192.168.0.103:4321"; // TODO: Make this configurable
    const pin = "4812";

    console.log("[ConnectionProvider] Auto-connecting to server...");
    connect(serverUrl, pin);

    return () => {
      console.log("[ConnectionProvider] Cleaning up, disconnecting...");
      disconnect();
    };
  }, []);

  const connect = async (serverUrl: string, pin: string) => {
    try {
      console.log("[ConnectionProvider] Connecting to:", serverUrl);
      setError(null);
      
      await socketService.connect(serverUrl);
      setIsConnected(true);
      console.log("[ConnectionProvider] Connected successfully");

      // Identify device
      const deviceId = Constants.sessionId || `mobile-${Date.now()}`;
      const result = await socketService.identify({
        id: deviceId,
        name: Constants.deviceName || "Mobile Device",
        platform: "mobile",
        pin,
      });

      console.log("[ConnectionProvider] Identification result:", result);
      if (result.ok) {
        setIsAuthenticated(true);
        setServerInfo(result.device);
        console.log("[ConnectionProvider] Authenticated successfully");
      } else {
        setError(result.error || "Authentication failed");
        socketService.disconnect();
        setIsConnected(false);
      }
    } catch (err) {
      console.error("[ConnectionProvider] Connection error:", err);
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
    setIsAuthenticated(false);
    setServerInfo(null);
  };

  return (
    <ConnectionContext.Provider
      value={{
        isConnected,
        isAuthenticated,
        error,
        serverInfo,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within ConnectionProvider");
  }
  return context;
}
