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
