import { ConnectedDevice, DeviceIdentification } from "../types";

export class DeviceRegistry {
  private readonly devices = new Map<string, ConnectedDevice>();

  upsert(device: Omit<DeviceIdentification, "pin">, ip: string): ConnectedDevice {
    const existingDevice = this.devices.get(device.id);
    const now = new Date().toISOString();
    const connectedDevice: ConnectedDevice = {
      ...device,
      ip,
      connectedAt: existingDevice?.connectedAt ?? now,
      lastSeenAt: now,
    };

    this.devices.set(device.id, connectedDevice);
    return connectedDevice;
  }

  remove(id: string): void {
    this.devices.delete(id);
  }

  list(): ConnectedDevice[] {
    return [...this.devices.values()];
  }

  count(): number {
    return this.devices.size;
  }
}
