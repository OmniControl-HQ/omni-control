import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";
import { DeviceItem } from "../../UI/DeviceItem";
import { devices } from "../../../data/devices";

export function ConnectedDevicesPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full flex flex-col h-full">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <h1 className="text-[28px] font-light text-white tracking-wide">
          Devices
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[18px]"
            />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/5 border border-transparent rounded-full pl-10 pr-4 py-2 text-sm text-white/90 outline-none focus:border-white/10 focus:bg-white/10 transition-all w-64 placeholder:text-white/30"
            />
          </div>
          <GlassButton className="px-5 py-2 rounded-full text-red-400/80 bg-red-400/10 hover:bg-red-400/20 hover:text-red-400 text-sm transition-all border border-transparent">
            Disconnect All
          </GlassButton>
        </div>
      </div>

      <GlassPanel className="rounded-2xl flex flex-col flex-1 min-h-0 border-white/5 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-3">
          {devices.length > 0 ? (
            <div className="grid grid-cols-1 gap-1">
              {devices.map((d, i) => (
                <div
                  key={`${d.id}-${i}`}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <DeviceItem device={d} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/30 gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Icon name="phonelink_off" className="text-[28px]" />
              </div>
              <p className="text-sm tracking-wide">No active connections</p>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
