import { useState, useEffect, useCallback } from "react";
import { socketService } from "../lib/socket";
import type { DashboardSnapshot, DeviceMetrics, Device } from "../types";

export function useSocket(serverUrl: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (url: string) => {
    try {
      setError(null);
      await socketService.connect(url);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    socketService.disconnect();
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (serverUrl) {
      connect(serverUrl);
    }

    return () => {
      disconnect();
    };
  }, [serverUrl, connect, disconnect]);

  return { isConnected, error, connect, disconnect };
}

export function useDashboard() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);

  useEffect(() => {
    socketService.onDashboardSnapshot((data) => {
      setSnapshot(data);
    });
  }, []);

  return snapshot;
}

export function useDeviceMetrics() {
  const [metrics, setMetrics] = useState<DeviceMetrics | null>(null);

  useEffect(() => {
    socketService.onDeviceMetrics((data) => {
      setMetrics(data.metrics);
    });
  }, []);

  return metrics;
}

export function useDeviceStatus() {
  const [status, setStatus] = useState<Device["status"]>("offline");

  useEffect(() => {
    socketService.onDeviceStatus((data) => {
      setStatus(data.status);
    });
  }, []);

  return status;
}
