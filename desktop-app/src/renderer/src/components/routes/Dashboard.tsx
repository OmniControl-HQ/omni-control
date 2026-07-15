import React, { useEffect } from "react";
import { GlassPanel } from "../UI/GlassPanel";
import { SideNav } from "../sections/SideNav";
import { TopAppBar } from "../sections/AppTopBar";
import { MetricBar } from "../UI/MetricBar";
import { DeviceItem } from "../UI/DeviceItem";
import { devices } from "../../data/devices";
import { navItems } from "../../data/navItems";

export function OverviewScreen() {
  const [activeKey, setActiveKey] = React.useState("overview");
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const glowRef = React.useRef<HTMLCanvasElement | null>(null);
  const [shadowOffset, setShadowOffset] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 600;
    canvas.width = size;
    canvas.height = size;

    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );

    gradient.addColorStop(0, "rgba(46, 91, 255, 0.12)");
    gradient.addColorStop(0.2, "rgba(46, 91, 255, 0.07)");
    gradient.addColorStop(0.5, "rgba(46, 91, 255, 0.03)");
    gradient.addColorStop(1, "rgba(46, 91, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        const noise = (Math.random() - 0.5) * 4;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  return (
    <div className="text-[#e2e2e4] text-[16px] leading-6 font-normal h-full w-full overflow-hidden flex items-center justify-center">
      <div
        ref={containerRef}
        onMouseMove={(e) => {
          const el = containerRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const glowEl = glowRef.current;

          const glowW = glowEl?.offsetWidth ?? 600;
          const glowH = glowEl?.offsetHeight ?? 600;
          const cursorX = e.clientX - rect.left;
          const cursorY = e.clientY - rect.top;
          const dx = cursorX - rect.width / 4 - glowW / 2;
          const dy = cursorY - rect.height / 4 - glowH / 2;
          setShadowOffset({ x: dx, y: dy });
        }}
        className="relative w-full h-full bg-[#111415]/50 overflow-hidden flex z-0"
      >
        <canvas
          ref={glowRef}
          className="absolute top-1/4 left-1/4 w-150 h-150 pointer-events-none -z-10 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${shadowOffset.x}px, ${shadowOffset.y}px, 0)`,
          }}
        />

        <SideNav
          items={navItems}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />

        <main className="flex-1 flex flex-col relative z-0 h-full overflow-hidden bg-transparent">
          <TopAppBar online ip="192.168.1.145" />

          <div className="flex-1 p-6 overflow-hidden flex flex-col gap-3">
            <GlassPanel className="rounded-xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-[20px] leading-7 font-medium text-[#e2e2e4]">
                  System Performance
                </h2>
                <span className="text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
                  Uptime: 14d 08h 22m
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <MetricBar
                  icon="developer_board"
                  label="CPU Load"
                  valueLabel="24%"
                  percent={24}
                  barClassName="bg-gray-400"
                />
                <MetricBar
                  icon="memory"
                  label="RAM Usage"
                  valueLabel="16 / 64 GB"
                  percent={25}
                  barClassName="bg-gray-400"
                />
              </div>
            </GlassPanel>

            <GlassPanel className="rounded-xl p-5 flex flex-col flex-1 min-h-0">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h2 className="text-[20px] leading-7 font-medium text-[#e2e2e4]">
                  Active Connections
                </h2>
                <span className="bg-[#1e2021]/50 border border-white/5 px-2 py-0.5 rounded-full text-[12px] leading-4 tracking-wider font-semibold text-[#c4c7c7]">
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
        </main>
      </div>
    </div>
  );
}
