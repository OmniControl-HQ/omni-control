import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

const dummyLogs = [
  {
    time: "10:45:22 AM",
    level: "INFO",
    message: "OmniControl server started on port 4321",
  },
  {
    time: "10:45:25 AM",
    level: "INFO",
    message: "mDNS broadcasting initialized",
  },
  {
    time: "10:46:01 AM",
    level: "WARN",
    message: "Unrecognized connection attempt from 192.168.1.100",
  },
  {
    time: "10:46:05 AM",
    level: "INFO",
    message: "Device 'iPhone 15 Pro' connected successfully",
  },
  { time: "10:48:12 AM", level: "INFO", message: "User settings updated" },
  {
    time: "10:50:00 AM",
    level: "ERROR",
    message: "Failed to sync clipboard: Connection timeout",
  },
  {
    time: "10:51:30 AM",
    level: "INFO",
    message: "Device 'MacBook Pro M3' connected successfully",
  },
];

export function LogsPage() {
  return (
    <div className="flex-1 p-6 overflow-hidden flex flex-col gap-5 h-full">
      <div className="flex items-start justify-between shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] leading-8 font-semibold text-white">
            System Logs
          </h1>
          <p className="text-[14px] text-[#c4c7c7] mt-1">
            View and export application activity and error logs.
          </p>
        </div>
        <div className="flex gap-3">
          <GlassButton className="px-4 py-2 rounded-lg text-white/80 hover:text-white flex items-center gap-2">
            <Icon name="delete" className="text-[18px]" />
            Clear Logs
          </GlassButton>
          <GlassButton className="px-4 py-2 rounded-lg text-white bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 flex items-center gap-2">
            <Icon name="download" className="text-[18px]" />
            Export
          </GlassButton>
        </div>
      </div>

      <GlassPanel className="rounded-xl p-0 flex flex-col flex-1 min-h-0 overflow-hidden border-white/5">
        <div className="flex items-center justify-between border-b border-white/5 p-4 shrink-0 bg-black/20">
          <div className="flex gap-2">
            <select className="bg-[#1e2021]/50 border border-white/10 rounded-lg px-3 py-1.5 text-[13px] text-[#e2e2e4] outline-none appearance-none">
              <option>All Levels</option>
              <option>INFO</option>
              <option>WARN</option>
              <option>ERROR</option>
            </select>
          </div>
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c7c7] text-[16px]"
            />
            <input
              type="text"
              placeholder="Search logs..."
              className="bg-[#1e2021]/50 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-[13px] text-[#e2e2e4] outline-none focus:border-white/30 transition-colors w-48"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] space-y-2 bg-[#0a0a0a]/50">
          {dummyLogs.map((log, i) => (
            <div
              key={i}
              className="flex gap-4 hover:bg-white/5 px-2 py-1 rounded transition-colors"
            >
              <span className="text-[#8b8e8f] shrink-0 w-24">{log.time}</span>
              <span
                className={`shrink-0 w-16 font-semibold ${
                  log.level === "INFO"
                    ? "text-blue-400"
                    : log.level === "WARN"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                [{log.level}]
              </span>
              <span className="text-[#e2e2e4] break-all">{log.message}</span>
            </div>
          ))}
          <div className="flex gap-4 hover:bg-white/5 px-2 py-1 rounded transition-colors opacity-50 animate-pulse">
            <span className="text-[#8b8e8f] shrink-0 w-24">10:52:00 AM</span>
            <span className="shrink-0 w-16 font-semibold text-blue-400">
              [INFO]
            </span>
            <span className="text-[#e2e2e4] break-all">
              Waiting for new events...
            </span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
