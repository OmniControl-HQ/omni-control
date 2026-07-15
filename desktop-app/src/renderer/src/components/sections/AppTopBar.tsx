import { cx } from "../../utils/cx";

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
      </div>
    </header>
  );
}
