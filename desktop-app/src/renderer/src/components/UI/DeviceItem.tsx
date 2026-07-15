import { Device } from "../../types/global";
import { cx } from "../../utils/cx";
import { latencyClass } from "../../utils/latencyClass";
import { Icon } from "./Icon";

export function DeviceItem({ device }: { device: Device }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1e2021]/30 backdrop-blur-md rounded-lg border border-white/5 hover:bg-[#1e2021]/50 transition-colors cursor-default">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#111415]/50 flex items-center justify-center border border-white/10 shadow-inner">
          <Icon name={device.icon} className="" />
        </div>
        <div>
          <h3 className="text-[14px] leading-5 tracking-[0.01em] font-medium text-[#e2e2e4]">
            {device.name}
          </h3>
          <p className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
            {device.role} • {device.ip}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <span
          className={cx(
            "text-[12px] leading-4 tracking-wider font-semibold",
            latencyClass(device.latencyTone),
          )}
        >
          {device.latencyMs}ms
        </span>
        <span className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
          Latency
        </span>
      </div>
    </div>
  );
}
