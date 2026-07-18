import os from "node:os";
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
    };
  }
}
