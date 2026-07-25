import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socketService } from "../lib/socket";
import { DiscoveryService } from "../services/discovery-service";
import { StorageService } from "../services/storage-service";
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
  isDiscovering: boolean;
  error: string | null;
  pcInfo: PcInfo | null;
  serverIp: string;
  serverPin: string;
  showConnectionModal: boolean;
  connect: (ip: string, pin: string) => Promise<void>;
  disconnect: () => void;
  retryConnection: () => Promise<void>;
  closeConnectionModal: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pcInfo, setPcInfo] = useState<PcInfo | null>(null);
  const [serverIp, setServerIp] = useState("192.168.0.103");
  const [serverPin, setServerPin] = useState("4812");
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  // Auto-discover and connect on mount
  useEffect(() => {
    autoConnectFlow();

    return () => {
      disconnect();
    };
  }, []);

  const autoConnectFlow = async () => {
    try {
      // 1. Try to load saved config
      const savedConfig = await StorageService.loadServerConfig();
      
      if (savedConfig && savedConfig.autoConnect) {
        console.log('[Connection] Using saved config');
        setServerIp(savedConfig.ip);
        setServerPin(savedConfig.pin);
        
        // Verify saved server is still available
        const isAvailable = await DiscoveryService.verifyServer(savedConfig.ip, savedConfig.port);
        if (isAvailable) {
          await connect(savedConfig.ip, savedConfig.pin);
          return;
        } else {
          console.log('[Connection] Saved server not available, discovering...');
        }
      }

      // 2. No saved config or server not available - discover
      setIsDiscovering(true);
      const discovered = await DiscoveryService.discover();
      setIsDiscovering(false);

      if (discovered) {
        console.log('[Connection] Server discovered:', discovered.ip);
        setServerIp(discovered.ip);
        await connect(discovered.ip, serverPin);
      } else {
        // 3. Discovery failed - show modal
        console.log('[Connection] Discovery failed, showing modal');
        setShowConnectionModal(true);
      }
    } catch (err) {
      setIsDiscovering(false);
      console.error('[Connection] Auto-connect flow error:', err);
      setShowConnectionModal(true);
    }
  };

  const fetchPcInfo = async (url: string) => {
    try {
      const response = await fetch(`${url}/api/v1/pc-info`);
      if (response.ok) {
        const data = await response.json();
        setPcInfo(data);
        console.log('[Connection] PC info fetched:', data);
      }
    } catch (err) {
      console.error('[Connection] Failed to fetch PC info:', err);
    }
  };

  const connect = async (ip: string, pin: string) => {
    try {
      console.log('[Connection] Connecting to:', ip);
      setError(null);
      
      const url = `http://${ip}:4321`;
      await socketService.connect(url);
      setIsConnected(true);
      console.log('[Connection] Connected successfully');

      // Identify device
      const deviceId = Constants.sessionId || `mobile-${Date.now()}`;
      const result = await socketService.identify({
        id: deviceId,
        name: Constants.deviceName || "Mobile Device",
        platform: "mobile",
        pin,
      });

      console.log('[Connection] Identification result:', result);
      if (result.ok) {
        setIsAuthenticated(true);
        console.log('[Connection] Authenticated successfully');
        
        // Save successful config
        await StorageService.saveServerConfig({
          ip,
          port: 4321,
          pin,
          autoConnect: true,
        });

        // Fetch PC info
        await fetchPcInfo(url);

        // Close modal if open
        setShowConnectionModal(false);
      } else {
        setError(result.error || "Authentication failed");
        socketService.disconnect();
        setIsConnected(false);
        setShowConnectionModal(true);
      }
    } catch (err) {
      console.error('[Connection] Connection error:', err);
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
      setShowConnectionModal(true);
    }
  };

  const retryConnection = async () => {
    await connect(serverIp, serverPin);
  };

  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
    setIsAuthenticated(false);
    setPcInfo(null);
  };

  const closeConnectionModal = () => {
    setShowConnectionModal(false);
  };

  return (
    <ConnectionContext.Provider
      value={{
        isConnected,
        isAuthenticated,
        isDiscovering,
        error,
        pcInfo,
        serverIp,
        serverPin,
        showConnectionModal,
        connect,
        disconnect,
        retryConnection,
        closeConnectionModal,
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
