import { Device } from "../../types/global";
import { cx } from "../../utils/cx";
import { latencyClass } from "../../utils/latencyClass";
import { Icon } from "./Icon";

export function DeviceItem({ device, onClick }: { device: Device; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-[#1e2021]/30 p-3 text-left backdrop-blur-md transition-colors hover:bg-[#1e2021]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111415]/50 shadow-inner">
          <Icon name={device.icon} />
        </div>
        <div>
          <h3 className="text-[14px] font-medium leading-5 tracking-[0.01em] text-[#e2e2e4]">{device.name}</h3>
          <p className="text-[12px] font-semibold leading-4 tracking-wider text-[#c4c7c7]">{device.role} · {device.ip}</p>
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <span className={cx("text-[12px] font-semibold leading-4 tracking-wider", latencyClass(device.latencyTone))}>{device.latencyMs}ms</span>
        <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#c4c7c7]">Latency</span>
      </div>
    </button>
  );
}
