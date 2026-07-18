export type ConnectedDevice = {
  id: string;
  name: string;
  platform: string;
  ip: string;
  connectedAt: string;
  lastSeenAt: string;
};

export type DeviceIdentification = {
  id: string;
  name: string;
  platform: string;
};

export type SocketAcknowledgement<T> = (response: T) => void;

export type DashboardSnapshot = {
  cpuUsagePercent: number;
  memoryUsedBytes: number;
  memoryTotalBytes: number;
  uptimeSeconds: number;
  devices: ConnectedDevice[];
};

export type ServerSettings = {
  appearance: "dark-glass";
  startOnBoot: boolean;
  externalConnections: boolean;
  serverPort: number;
};

export type SecuritySettings = {
  requirePin: boolean;
  pinConfigured: boolean;
};

export type ActivityLog = {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  category: "server" | "device" | "security" | "control";
  message: string;
};
