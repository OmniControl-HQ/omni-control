import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideNav } from "../../sections/SideNav";
import { TopAppBar } from "../../sections/AppTopBar";
import { navItems } from "../../../data/navItems";
import { PanelFadeOutlet } from "./PanelFadeOutlet";
import { getActiveKeyFromPathname, keyToPath } from "./nav";
import { useGlowTexture } from "./useGlowTexture";

export function DashboardLayout() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const glowRef = React.useRef<HTMLCanvasElement | null>(null);
  const [shadowOffset, setShadowOffset] = React.useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = getActiveKeyFromPathname(location.pathname);

  useGlowTexture(glowRef);

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
          onSelect={(key) => {
            const path = keyToPath[key] ?? "/";
            navigate(path);
          }}
        />

        <main className="flex-1 flex flex-col relative z-0 h-full overflow-hidden bg-transparent">
          <TopAppBar online ip="192.168.1.145" />
          <PanelFadeOutlet />
        </main>
      </div>
    </div>
  );
}

