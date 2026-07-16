import { GlassPanel } from "../../UI/GlassPanel";
import { MetricBar } from "../../UI/MetricBar";
import { DeviceItem } from "../../UI/DeviceItem";
import { devices } from "../../../data/devices";

export function OverviewPage() {
  return (
    <div className="flex-1 p-6 overflow-hidden flex flex-col gap-3">
      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-[20px] leading-7 font-medium text-[#e2e2e4]">
            System Performance
          </h2>
          <span className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
            Uptime: 14d 08h 22m
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <MetricBar
            icon="mode_fan"
            label="CPU Load"
            isSpin
            valueLabel="24%"
            percent={24}
            barClassName="bg-gray-400"
          />
          <MetricBar
            icon="memory"
            label="RAM Usage"
            valueLabel="16 / 64 GB"
            percent={25}
            barClassName="bg-gray-400"
          />
        </div>
      </GlassPanel>

      <GlassPanel className="rounded-xl p-5 flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="text-[20px] leading-7 font-medium text-[#e2e2e4]">
            Active Connections
          </h2>
          <span className="bg-[#1e2021]/50 border border-white/5 px-2 py-0.5 rounded-full text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
            {devices.length} Devices
          </span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {devices.map((d) => (
            <DeviceItem key={d.id} device={d} />
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

