import React from "react";
import { GlassPanel } from "./components/UI/GlassPanel";
import { SideNav } from "./components/sections/SideNav";
import { TopAppBar } from "./components/sections/AppTopBar";
import { MetricBar } from "./components/UI/MetricBar";
import { DeviceItem } from "./components/UI/DeviceItem";
import { devices } from "./data/devices";
import { navItems } from "./data/navItems";

export function OverviewScreen() {
  const [activeKey, setActiveKey] = React.useState("overview");

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
          </div>
        </main>
      </div>
    </div>
  );
}
