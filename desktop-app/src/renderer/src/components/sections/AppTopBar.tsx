import { cx } from "../../utils/cx";
import { Icon } from "../UI/Icon";

export function TopAppBar({ online, ip }: { online: boolean; ip: string }) {
  return (
    <header className="h-16 flex justify-between items-center px-6  z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div
          className={cx(
            "w-2 h-2 rounded-full",
            online ? "bg-emerald-400" : "bg-[#8e9192]",
          )}
        />
        <span className="text-[14px] leading-5 tracking-[0.01em] font-medium text-[#e2e2e4]">
          {online ? "Server Online" : "Server Offline"}
        </span>
        <span className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7] ml-2 bg-[#1e2021]/50 border border-white/5 px-2 py-1 rounded-md">
          IP: {ip}
        </span>
        <a
          href="https://github.com/OmniControl-HQ/omni-control"
          target="_blank"
          rel="noreferrer"
          className="text-[12px]  leading-4 tracking-wide font-semibold text-[#c4c7c7] hover:text-white bg-[#1e2021]/50 border border-white/5  rounded-md inline-flex items-center gap-2 transition-all duration-300 group px-2 py-1 "
        >
          <Icon
            name="star"
            className="text-[12px]! transition-all duration-300 group-hover:text-amber-400 group-hover:scale-125 group-hover:rotate-12"
          />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
