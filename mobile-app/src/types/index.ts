// Device Types
export interface Device {
  id: string;
  name: string;
  platform: "windows" | "macos" | "linux";
  status: "online" | "offline" | "sleeping";
  lastSeen: Date;
  ipAddress: string;
  port: number;
}

export interface DeviceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    upload: number;
    download: number;
  };
}

// Dashboard Types
export interface DashboardSnapshot {
  device: Device;
  metrics: DeviceMetrics;
  uptime: number;
  connectedAt: Date;
}

// Control Types
export interface ControlAction {
  type: "keyboard" | "mouse" | "media" | "system";
  action: string;
  data?: Record<string, unknown>;
}

export interface KeyboardAction extends ControlAction {
  type: "keyboard";
  key: string;
  modifiers?: ("ctrl" | "alt" | "shift" | "meta")[];
}

export interface MouseAction extends ControlAction {
  type: "mouse";
  action: "move" | "click" | "scroll";
  x?: number;
  y?: number;
  button?: "left" | "right" | "middle";
  delta?: number;
}

// Socket Event Types
export interface SocketEvents {
  // Client -> Server
  "device:connect": (data: { deviceId: string }) => void;
  "device:disconnect": () => void;
  "control:keyboard": (data: KeyboardAction) => void;
  "control:mouse": (data: MouseAction) => void;
  "control:media": (data: { action: "play" | "pause" | "next" | "previous" }) => void;
  "control:system": (data: { action: "sleep" | "shutdown" | "restart" | "lock" }) => void;

  // Server -> Client
  "dashboard:snapshot": (data: DashboardSnapshot) => void;
  "device:status": (data: { deviceId: string; status: Device["status"] }) => void;
  "device:metrics": (data: { deviceId: string; metrics: DeviceMetrics }) => void;
  "error": (data: { message: string; code?: string }) => void;
}

// Settings Types
export interface AppSettings {
  serverAddress: string;
  serverPort: number;
  autoConnect: boolean;
  theme: "dark" | "light" | "system";
  hapticFeedback: boolean;
}

// Security Types
export interface SecuritySettings {
  requirePin: boolean;
  pin?: string;
  biometricEnabled: boolean;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: "info" | "warning" | "error" | "success";
  message: string;
  deviceId?: string;
}
