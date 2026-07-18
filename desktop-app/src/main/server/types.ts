export type ConnectedDevice = {
  id: string;
  name: string;
  platform: string;
  connectedAt: string;
  lastSeenAt: string;
};

export type DeviceIdentification = {
  id: string;
  name: string;
  platform: string;
};

export type SocketAcknowledgement<T> = (response: T) => void;
