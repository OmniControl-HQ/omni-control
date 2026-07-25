import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socketService } from "../lib/socket";
import Constants from "expo-constants";

interface PcInfo {
  name: string;
  platform: string;
  type: string;
  arch: string;
  totalMemory: number;
  freeMemory: number;
  cpuCount: number;
  uptime: number;
}

interface ConnectionContextType {
  isConnected: boolean;
  isAuthenticated: boolean;
  error: string | null;
  pcInfo: PcInfo | null;
  connect: (serverUrl: string, pin: string) => Promise<void>;
  disconnect: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pcInfo, setPcInfo] = useState<PcInfo | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  // Auto-connect on mount
  useEffect(() => {
    const url = "http://192.168.0.103:4321"; // TODO: Make this configurable
    const pin = "4812";

    console.log("[ConnectionProvider] Auto-connecting to server...");
    connect(url, pin);

    return () => {
      console.log("[ConnectionProvider] Cleaning up, disconnecting...");
      disconnect();
    };
  }, []);

  // Fetch PC info after authentication
  const fetchPcInfo = async (url: string) => {
    try {
      const response = await fetch(`${url}/api/v1/pc-info`);
      if (response.ok) {
        const data = await response.json();
        setPcInfo(data);
        console.log("[ConnectionProvider] PC info fetched:", data);
      }
    } catch (err) {
      console.error("[ConnectionProvider] Failed to fetch PC info:", err);
    }
  };

  const connect = async (url: string, pin: string) => {
    try {
      console.log("[ConnectionProvider] Connecting to:", url);
      setError(null);
      setServerUrl(url);
      
      await socketService.connect(url);
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
        console.log("[ConnectionProvider] Authenticated successfully");
        
        // Fetch PC info after successful authentication
        await fetchPcInfo(url);
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
    setPcInfo(null);
    setServerUrl(null);
  };

  return (
    <ConnectionContext.Provider
      value={{
        isConnected,
        isAuthenticated,
        error,
        pcInfo,
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
