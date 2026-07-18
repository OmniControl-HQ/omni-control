import { useEffect, useState } from "react";
import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

export function LogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const loadLogs = async () => setLogs(await window.electron.logs.list());

  useEffect(() => {
    void loadLogs();
    const interval = window.setInterval(() => void loadLogs(), 2000);
    return () => window.clearInterval(interval);
  }, []);

  const clear = async () => {
    await window.electron.logs.clear();
    setLogs([]);
  };

  return (
    <div className="flex h-full w-full max-w-5xl flex-1 flex-col overflow-hidden p-8 mx-auto">
      <div className="mb-8 flex shrink-0 items-center justify-between"><h1 className="text-[28px] font-light tracking-wide text-white">Logs</h1><GlassButton onClick={clear} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-transparent text-white/60 hover:bg-white/5 hover:text-white"><Icon name="delete_sweep" className="text-[18px]" /></GlassButton></div>
      <GlassPanel className="flex min-h-0 flex-1 flex-col rounded-2xl border-white/5 bg-black/20">
        <div className="flex-1 space-y-1 overflow-y-auto p-6 font-mono text-[13px] leading-relaxed">
          {logs.map((log) => <div key={log.id} className="flex gap-6 py-0.5 text-white/60 transition-colors hover:text-white/90"><span className="w-16 shrink-0 text-white/30">{new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span><span className={`w-12 shrink-0 ${log.level === "error" ? "text-red-400/80" : log.level === "warning" ? "text-yellow-400/80" : "text-blue-400/80"}`}>{log.level.toUpperCase()}</span><span className="break-all">{log.message}</span></div>)}
          {logs.length === 0 && <div className="pt-4 text-white/30">Listening for events...</div>}
        </div>
      </GlassPanel>
    </div>
  );
}
