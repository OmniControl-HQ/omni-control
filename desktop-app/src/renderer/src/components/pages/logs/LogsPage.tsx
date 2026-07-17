import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

const dummyLogs = [
  { time: "10:45:22", level: "INFO", message: "Server started on port 4321" },
  { time: "10:45:25", level: "INFO", message: "mDNS broadcasting initialized" },
  {
    time: "10:46:01",
    level: "WARN",
    message: "Unrecognized connection attempt from 192.168.1.100",
  },
  {
    time: "10:46:05",
    level: "INFO",
    message: "Device 'iPhone 15 Pro' connected",
  },
  { time: "10:48:12", level: "INFO", message: "User settings updated" },
  {
    time: "10:50:00",
    level: "ERROR",
    message: "Connection timeout during sync",
  },
  {
    time: "10:51:30",
    level: "INFO",
    message: "Device 'MacBook Pro M3' connected",
  },
];

export function LogsPage() {
  return (
    <div className="flex-1 p-8 overflow-hidden max-w-5xl mx-auto w-full flex flex-col h-full">
      <div className="mb-8 flex items-center justify-between shrink-0">
        <h1 className="text-[28px] font-light text-white tracking-wide">
          Logs
        </h1>
        <div className="flex gap-3">
          <select className="bg-transparent border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-all text-center">
            <option>All Events</option>
            <option>Errors Only</option>
          </select>
          <GlassButton className="w-9 h-9 rounded-full text-white/60 hover:text-white bg-transparent border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center">
            <Icon name="download" className="text-[18px]" />
          </GlassButton>
          <GlassButton className="w-9 h-9 rounded-full text-white/60 hover:text-white bg-transparent border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center">
            <Icon name="delete_sweep" className="text-[18px]" />
          </GlassButton>
        </div>
      </div>

      <GlassPanel className="rounded-2xl flex flex-col flex-1 min-h-0 border-white/5 bg-black/20">
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[13px] leading-relaxed space-y-1">
          {dummyLogs.map((log, i) => (
            <div
              key={i}
              className="flex gap-6 group text-white/60 hover:text-white/90 transition-colors py-0.5"
            >
              <span className="text-white/30 w-16 shrink-0">{log.time}</span>
              <span
                className={`w-12 shrink-0 ${
                  log.level === "ERROR"
                    ? "text-red-400/80"
                    : log.level === "WARN"
                      ? "text-yellow-400/80"
                      : "text-blue-400/80"
                }`}
              >
                {log.level}
              </span>
              <span className="break-all">{log.message}</span>
            </div>
          ))}
          <div className="flex gap-6 text-white/30 animate-pulse mt-4 py-0.5">
            <span className="w-16 shrink-0">10:52:00</span>
            <span className="w-12 shrink-0">WAIT</span>
            <span>Listening for events...</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
