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
}
