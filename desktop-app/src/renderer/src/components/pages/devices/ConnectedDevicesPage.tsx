import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";
import { DeviceItem } from "../../UI/DeviceItem";
import { devices } from "../../../data/devices";

export function ConnectedDevicesPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
      <div className="flex items-start justify-between shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] leading-8 font-semibold text-white">
            Connected Devices
          </h1>
          <p className="text-[14px] text-[#c4c7c7] mt-1">
            Monitor and manage devices currently connected to your server.
          </p>
        </div>
        <GlassButton className="px-4 py-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 border-red-500/20 flex items-center gap-2">
          <Icon name="block" className="text-[18px]" />
          Disconnect All
        </GlassButton>
      </div>

      <GlassPanel className="rounded-xl p-5 flex flex-col flex-1 min-h-0 gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2 shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="devices" className="text-[#c4c7c7]" />
            <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
              Active Connections ({devices.length})
            </h2>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c7c7] text-[18px]"
              />
              <input
                type="text"
                placeholder="Search devices..."
                className="bg-[#1e2021]/50 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-[14px] text-[#e2e2e4] outline-none focus:border-white/30 transition-colors w-64"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {devices.map((d, i) => (
            <div key={`${d.id}-${i}`} className="relative group">
              <DeviceItem device={d} />
            </div>
          ))}
          {devices.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-[#8b8e8f] gap-2">
              <Icon name="phonelink_off" className="text-[48px] opacity-50" />
              <p>No devices connected</p>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
