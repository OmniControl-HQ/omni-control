import os from "node:os";
import { networkInterfaces } from "node:os";
import { DashboardSnapshot } from "../types";
import { DeviceRegistry } from "./device-registry";

type CpuSample = { idle: number; total: number };

function readCpuSample(): CpuSample {
  return os.cpus().reduce(
    (sample, cpu) => ({
      idle: sample.idle + cpu.times.idle,
      total: sample.total + Object.values(cpu.times).reduce((sum, value) => sum + value, 0),
    }),
    { idle: 0, total: 0 },
  );
}

function getLocalIp(): string {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    const netInterfaces = nets[name];
    if (!netInterfaces) continue;
    for (const net of netInterfaces) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

export class DashboardService {
  private previousCpuSample = readCpuSample();

  constructor(private readonly deviceRegistry: DeviceRegistry) {}

  getSnapshot(): DashboardSnapshot {
    const currentCpuSample = readCpuSample();
    const totalDelta = currentCpuSample.total - this.previousCpuSample.total;
    const idleDelta = currentCpuSample.idle - this.previousCpuSample.idle;
    this.previousCpuSample = currentCpuSample;

    return {
      cpuUsagePercent:
        totalDelta > 0 ? Math.round(((totalDelta - idleDelta) / totalDelta) * 100) : 0,
      memoryUsedBytes: os.totalmem() - os.freemem(),
      memoryTotalBytes: os.totalmem(),
      uptimeSeconds: Math.floor(os.uptime()),
      devices: this.deviceRegistry.list(),
      serverIp: getLocalIp(),
    };
  }
}
