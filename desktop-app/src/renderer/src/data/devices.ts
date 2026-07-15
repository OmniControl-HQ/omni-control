import { Device } from "../types/global";

const devices: Device[] = [
  {
    id: "1",
    name: "MacBook Pro M3",
    role: "Admin",
    ip: "192.168.1.5",
    icon: "laptop_mac",
    latencyMs: 12,
    latencyTone: "good",
  },
  {
    id: "2",
    name: "iPad Pro",
    role: "Viewer",
    ip: "192.168.1.12",
    icon: "tablet_mac",
    latencyMs: 28,
    latencyTone: "good",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    role: "Viewer",
    ip: "192.168.1.44",
    icon: "phone_iphone",
    latencyMs: 45,
    latencyTone: "warn",
  },
];

export { devices };
