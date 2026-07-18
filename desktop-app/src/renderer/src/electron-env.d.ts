export {};
declare global {
  interface Window {
    electron: {
      platform: string;
      window: {
        minimize: () => void;
        toggleMaximize: () => void;
        close: () => void;
      };
      dashboard: {
        getSnapshot: () => Promise<DashboardSnapshot>;
      };
      devices: { list: () => Promise<DashboardDevice[]>; remove: (id: string) => Promise<void> };
      settings: { get: () => Promise<ServerSettings>; update: (settings: Partial<ServerSettings>) => Promise<ServerSettings>; reset: () => Promise<ServerSettings> };
      security: { get: () => Promise<SecuritySettings & { pin: string }>; setRequirePin: (requirePin: boolean) => Promise<SecuritySettings>; setPin: (pin: string) => Promise<SecuritySettings> };
      logs: { list: () => Promise<ActivityLog[]>; clear: () => Promise<void> };
    };
  }

  type DashboardDevice = {
    id: string;
    name: string;
    platform: string;
    ip: string;
  };

  type DashboardSnapshot = {
    cpuUsagePercent: number;
    memoryUsedBytes: number;
    memoryTotalBytes: number;
    uptimeSeconds: number;
    devices: DashboardDevice[];
  };

  type ServerSettings = { appearance: "dark-glass"; startOnBoot: boolean; externalConnections: boolean; serverPort: number };
  type SecuritySettings = { requirePin: boolean; pinConfigured: boolean };
  type ActivityLog = { id: string; timestamp: string; level: "info" | "warning" | "error"; category: string; message: string };
}
