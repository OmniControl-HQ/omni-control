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
  pin: string;
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

export type PointerMoveCommand = { dx: number; dy: number };
export type PointerClickCommand = { button: "left" | "right" | "middle"; double?: boolean };
export type PointerScrollCommand = { dx: number; dy: number };
export type MediaCommand = { action: "play-pause" | "next" | "previous" | "volume-up" | "volume-down" | "mute" };
export type ControlResult = { ok: true } | { ok: false; error: string };
