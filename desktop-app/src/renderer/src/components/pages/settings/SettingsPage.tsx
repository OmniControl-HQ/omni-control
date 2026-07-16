import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

export function SettingsPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
      <div className="mb-2 shrink-0">
        <h1 className="text-[24px] leading-8 font-semibold text-white">
          Settings
        </h1>
        <p className="text-[14px] text-[#c4c7c7] mt-1">
          Manage your application preferences and server configurations.
        </p>
      </div>

      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
          <Icon name="tune" className="text-[#c4c7c7]" />
          <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
            General Preferences
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">
              Application Theme
            </span>
            <span className="text-[12px] text-[#c4c7c7]">
              Select your preferred visual style
            </span>
          </div>
          <select className="bg-[#1e2021]/50 border border-white/10 rounded-lg px-3 py-2 text-[#e2e2e4] outline-none min-w-[150px] appearance-none focus:border-white/30 transition-colors">
            <option>Dark Glass</option>
            <option>Light Solid</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">Start on Boot</span>
            <span className="text-[12px] text-[#c4c7c7]">
              Automatically start OmniControl server when system boots
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c4c7c7] peer-checked:after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/60 border border-white/10"></div>
          </label>
        </div>
      </GlassPanel>

      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
          <Icon name="router" className="text-[#c4c7c7]" />
          <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
            Network Configuration
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">Server Port</span>
            <span className="text-[12px] text-[#c4c7c7]">
              Port for Fastify/Socket.IO communication (Requires restart)
            </span>
          </div>
          <input
            type="number"
            defaultValue={4321}
            className="bg-[#1e2021]/50 border border-white/10 rounded-lg px-3 py-2 text-[#e2e2e4] outline-none w-28 text-center focus:border-white/30 transition-colors"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">
              Allow External Connections
            </span>
            <span className="text-[12px] text-[#c4c7c7]">
              Accept connections from other devices on the local network
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c4c7c7] peer-checked:after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/60 border border-white/10"></div>
          </label>
        </div>
      </GlassPanel>

      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
          <Icon name="info" className="text-[#c4c7c7]" />
          <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
            About
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">
              OmniControl Server
            </span>
            <span className="text-[12px] text-[#c4c7c7]">
              Version 1.0.0 (Enterprise Edition)
            </span>
          </div>
          <GlassButton className="px-4 py-1.5 rounded-lg text-[13px] text-white flex items-center gap-2">
            <Icon name="update" className="text-[16px]" />
            Check for Updates
          </GlassButton>
        </div>
      </GlassPanel>

      <div className="flex justify-end gap-3 mt-auto pt-4 shrink-0">
        <GlassButton className="px-6 py-2 rounded-lg text-white/80 hover:text-white">
          Reset Defaults
        </GlassButton>
        <GlassButton className="px-6 py-2 rounded-lg text-white bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          Save Changes
        </GlassButton>
      </div>
    </div>
  );
}
