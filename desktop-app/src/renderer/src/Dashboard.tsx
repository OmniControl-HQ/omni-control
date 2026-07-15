import React from "react";

type ClassValue = string | undefined | null | false;

function cx(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

export function Icon({
  name,
  filled,
  className,
}: {
  name: string;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx("material-symbols-outlined select-none", className)}
      style={
        filled
          ? ({ fontVariationSettings: "'FILL' 1" } as React.CSSProperties)
          : undefined
      }
    >
      {name}
    </span>
  );
}

export function GlassPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cx("glass-panel", className)}>{children}</div>;
}

export function GlassButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx("glass-button", className)}
    >
      {children}
    </button>
  );
}

export type NavItem = {
  key: string;
  label: string;
  icon: string;
};

export function SideNav({
  items,
  activeKey,
  onSelect,
}: {
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <aside className="w-64 h-full bg-[#1e2021]/30 backdrop-blur-[40px] border-r border-white/10 flex flex-col p-[24px] z-10 relative">
      <div className="flex items-center gap-3 mb-8">
        <img
          alt="OmniRemote Logo"
          className="w-8 h-8 rounded-full object-cover"
          src="https://lh3.googleusercontent.com/aida/AP1WRLvpzFuhqUU2oT58KrampxsQJvnjARLrr9y3S67oYA4j1FnnMmQlEThkwj7IfO5Zr49gjceIEKjQj_kXhZiF_AJ6m2JGw0feZsH64UvDPcwU3YxFUWPLN1w42QstJhiycfCIiVDVx-YuZFJ90DR2i8X42Qd8S1FJCt2LQK2P24ZUfDU-Vqi5IK3EAXdL90nP7CiVvsIe9TnaFZCnBaBtv3gGcIO4dh3Iwc2AnGsW41tCG2dXiHREQ0yJOg"
        />
        <div>
          <h1 className="text-[20px] leading-[28px] font-bold text-[#e2e2e4]">
            OmniRemote
          </h1>
          <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
            Enterprise Server
          </p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <a
              key={item.key}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelect(item.key);
              }}
              className={cx(
                "flex items-center gap-[16px] px-4 py-3 rounded-[1rem] group transition-colors active:scale-95 duration-150",
                active
                  ? "bg-[#454749]/50 text-[#b4b5b7] border border-white/5 hover:bg-[#333537]"
                  : "text-[#c4c7c7] hover:bg-[#333537]/50",
              )}
            >
              <Icon name={item.icon} filled={active} className="text-[24px]" />
              <span className="text-[14px] leading-[20px] tracking-[0.01em] font-medium">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      <button className="mt-auto flex items-center justify-center gap-2 bg-[#c9c6c5]/20 backdrop-blur-md text-[#e2e2e4] border border-white/10 py-3 px-4 rounded-[1rem] text-[14px] leading-[20px] tracking-[0.01em] font-bold glass-button w-full">
        <Icon name="add" className="text-[20px]" />
        New Session
      </button>
    </aside>
  );
}

export function TopAppBar({ online, ip }: { online: boolean; ip: string }) {
  return (
    <header className="h-16 flex justify-between items-center px-[24px] bg-[#1e2021]/20 border-b shadow-sm z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div
          className={cx(
            "w-2 h-2 rounded-full status-dot",
            online ? "bg-emerald-400" : "bg-[#8e9192]",
          )}
        />
        <span className="text-[14px] leading-[20px] tracking-[0.01em] font-medium text-[#e2e2e4]">
          {online ? "Server Online" : "Server Offline"}
        </span>
        <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7] ml-2 bg-[#1e2021]/50 border border-white/5 px-2 py-1 rounded-md">
          IP: {ip}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-[#c4c7c7] hover:text-[#e2e2e4] transition-opacity active:opacity-70 cursor-pointer"
        >
          <Icon name="notifications" className="text-[24px]" />
        </button>
        <button
          type="button"
          className="text-[#c4c7c7] hover:text-[#e2e2e4] transition-opacity active:opacity-70 cursor-pointer"
        >
          <Icon name="account_circle" className="text-[24px]" />
        </button>
      </div>
    </header>
  );
}

export function MetricBar({
  label,
  valueLabel,
  percent,
  barClassName,
}: {
  label: string;
  valueLabel: string;
  percent: number;
  barClassName: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
        <span className="text-[#c4c7c7]">{label}</span>
        <span className="text-[#e2e2e4] font-bold">{valueLabel}</span>
      </div>
      <div className="h-1.5 w-full bg-[#1e2021]/50 border border-white/5 rounded-full overflow-hidden">
        <div
          className={cx("h-full rounded-full", barClassName)}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}

export type Device = {
  id: string;
  name: string;
  role: string;
  ip: string;
  icon: string;
  latencyMs: number;
  latencyTone: "good" | "warn" | "bad";
};

function latencyClass(tone: Device["latencyTone"]) {
  if (tone === "good") return "text-emerald-400";
  if (tone === "warn") return "text-amber-400";
  return "text-[#ffb4ab]";
}

export function DeviceItem({ device }: { device: Device }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#1e2021]/30 backdrop-blur-md rounded-lg border border-white/5 hover:bg-[#1e2021]/50 transition-colors cursor-default">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#111415]/50 flex items-center justify-center border border-white/10 shadow-inner">
          <Icon
            name={device.icon}
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] text-[24px]"
          />
        </div>
        <div>
          <h3 className="text-[14px] leading-[20px] tracking-[0.01em] font-medium text-[#e2e2e4]">
            {device.name}
          </h3>
          <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
            {device.role} • {device.ip}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <span
          className={cx(
            "text-[12px] leading-[16px] tracking-[0.05em] font-semibold",
            latencyClass(device.latencyTone),
          )}
        >
          {device.latencyMs}ms
        </span>
        <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
          Latency
        </span>
      </div>
    </div>
  );
}

export function OverviewScreen() {
  const [activeKey, setActiveKey] = React.useState("overview");

  const navItems: NavItem[] = [
    { key: "overview", label: "Overview", icon: "dashboard" },
    { key: "devices", label: "Connected Devices", icon: "devices" },
    { key: "security", label: "Security", icon: "security" },
    { key: "logs", label: "Logs", icon: "description" },
    { key: "settings", label: "Settings", icon: "settings" },
  ];

  const devices: Device[] = [
    {
      id: "1",
      name: "MacBook Pro M3",
      role: "Admin",
      ip: "192.168.1.5",
      icon: "laptop_mac",
      latencyMs: 12,
      latencyTone: "good",
    },
    {
      id: "2",
      name: "iPad Pro",
      role: "Viewer",
      ip: "192.168.1.12",
      icon: "tablet_mac",
      latencyMs: 28,
      latencyTone: "good",
    },
    {
      id: "3",
      name: "iPhone 15 Pro",
      role: "Viewer",
      ip: "192.168.1.44",
      icon: "phone_iphone",
      latencyMs: 45,
      latencyTone: "warn",
    },
  ];

  return (
    <div className="text-[#e2e2e4] text-[16px] leading-[24px] font-normal h-full w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full bg-[#111415]/50 backdrop-blur-2xl border-0 overflow-hidden shadow-2xl flex  z-0">
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-[#2E5BFF]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        <SideNav
          items={navItems}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />

        <main className="flex-1 flex flex-col relative z-0 h-full overflow-hidden bg-transparent">
          <TopAppBar online ip="192.168.1.145" />

          <div className="flex-1 p-[24px] overflow-y-auto overflow-x-hidden flex flex-col gap-[12px] relative">
            <div className="grid grid-cols-2 gap-[12px]">
              <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 col-span-2">
                <div className="flex justify-between items-end mb-2">
                  <h2 className="text-[20px] leading-[28px] font-medium text-[#e2e2e4]">
                    System Performance
                  </h2>
                  <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
                    Uptime: 14d 08h 22m
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <MetricBar
                    label="CPU Load"
                    valueLabel="24%"
                    percent={24}
                    barClassName="bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  />
                  <MetricBar
                    label="RAM Usage"
                    valueLabel="16 / 64 GB"
                    percent={25}
                    barClassName="bg-[#2E5BFF] shadow-[0_0_12px_rgba(46,91,255,0.8)]"
                  />
                </div>
              </GlassPanel>

              <GlassPanel className="rounded-xl p-5 flex flex-col h-64 col-span-2">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h2 className="text-[20px] leading-[28px] font-medium text-[#e2e2e4]">
                    Active Connections
                  </h2>
                  <span className="bg-[#1e2021]/50 border border-white/5 px-2 py-0.5 rounded-full text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#c4c7c7]">
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

            <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/10">
              <button className="glass-button h-12 rounded-lg flex items-center justify-center gap-2 text-[#e2e2e4] text-[14px] leading-[20px] tracking-[0.01em] font-medium backdrop-blur-lg">
                <Icon name="restart_alt" className="text-[24px]" />
                Restart Server
              </button>
              <button className="glass-button h-12 rounded-lg flex items-center justify-center gap-2 text-[#ffb4ab] text-[14px] leading-[20px] tracking-[0.01em] font-medium backdrop-blur-lg">
                <Icon name="lock" className="text-[24px]" />
                Lock System
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
