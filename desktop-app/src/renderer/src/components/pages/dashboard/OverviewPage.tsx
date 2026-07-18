import { useEffect, useState } from "react";
import { GlassPanel } from "../../UI/GlassPanel";
import { MetricBar } from "../../UI/MetricBar";
import { DeviceItem } from "../../UI/DeviceItem";
import { Device } from "../../../types/global";

const emptySnapshot: DashboardSnapshot = {
  cpuUsagePercent: 0,
  memoryUsedBytes: 0,
  memoryTotalBytes: 0,
  uptimeSeconds: 0,
  devices: [],
};

function formatBytes(bytes: number) {
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
}

function iconForPlatform(platform: string) {
  const normalized = platform.toLowerCase();
  if (normalized.includes("android")) return "phone_android";
  if (normalized.includes("ios") || normalized.includes("iphone")) return "phone_iphone";
  if (normalized.includes("ipad") || normalized.includes("tablet")) return "tablet_mac";
  return "devices";
}

export function OverviewPage() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot>(emptySnapshot);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const nextSnapshot = await window.electron.dashboard.getSnapshot();
      if (active) setSnapshot(nextSnapshot);
    };

    void refresh();
    const interval = window.setInterval(() => void refresh(), 2000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const memoryUsagePercent = snapshot.memoryTotalBytes
    ? Math.round((snapshot.memoryUsedBytes / snapshot.memoryTotalBytes) * 100)
    : 0;
  const activeDevices: Device[] = snapshot.devices.map((device) => ({
    id: device.id,
    name: device.name,
    role: device.platform,
    ip: device.ip,
    icon: iconForPlatform(device.platform),
    latencyTone: "good",
  }));

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden p-6">
      <GlassPanel className="flex flex-col gap-4 rounded-xl p-5">
        <div className="mb-2 flex items-end justify-between">
          <h2 className="text-[20px] font-medium leading-7 text-[#e2e2e4]">System Performance</h2>
          <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#c4c7c7]">Uptime: {formatUptime(snapshot.uptimeSeconds)}</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <MetricBar icon="mode_fan" label="CPU Load" valueLabel={`${snapshot.cpuUsagePercent}%`} percent={snapshot.cpuUsagePercent} barClassName="bg-gray-400" />
          <MetricBar icon="memory" label="RAM Usage" valueLabel={`${formatBytes(snapshot.memoryUsedBytes)} / ${formatBytes(snapshot.memoryTotalBytes)}`} percent={memoryUsagePercent} barClassName="bg-gray-400" />
        </div>
      </GlassPanel>

      <GlassPanel className="flex min-h-0 flex-1 flex-col rounded-xl p-5">
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <h2 className="text-[20px] font-medium leading-7 text-[#e2e2e4]">Active Connections</h2>
          <span className="rounded-full border border-white/5 bg-[#1e2021]/50 px-2 py-0.5 text-[12px] font-semibold leading-4 tracking-wider text-[#c4c7c7]">{activeDevices.length} Devices</span>
        </div>
        {activeDevices.length > 0 ? (
          <div className="flex-1 space-y-2 overflow-y-auto pr-2">
            {activeDevices.map((device) => <DeviceItem key={device.id} device={device} />)}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-white/30">No active connections</div>
        )}
      </GlassPanel>
    </div>
  );
}
