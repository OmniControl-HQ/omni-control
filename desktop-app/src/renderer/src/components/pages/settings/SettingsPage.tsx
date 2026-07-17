import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

function SettingRow({
  icon,
  label,
  description,
  children,
  border = true,
}: any) {
  return (
    <div
      className={`flex items-center justify-between p-5 ${border ? "border-b border-white/5" : ""}`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
            <Icon name={icon} className="text-[20px]" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[15px] text-white/90 tracking-wide">
            {label}
          </span>
          {description && (
            <span className="text-[13px] text-white/40 mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-[28px] font-light text-white tracking-wide">
          Settings
        </h1>
        <div className="flex gap-3">
          <GlassButton className="px-5 py-2 rounded-full text-white/60 hover:text-white text-sm bg-transparent border border-transparent hover:bg-white/5">
            Reset
          </GlassButton>
          <GlassButton className="px-5 py-2 rounded-full text-white bg-white/10 hover:bg-white/20 text-sm transition-all border border-white/5">
            Save Changes
          </GlassButton>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">
            Preferences
          </h2>
          <GlassPanel className="rounded-2xl flex flex-col border-white/5">
            <SettingRow
              icon="palette"
              label="Appearance"
              description="Select your preferred visual style"
            >
              <select className="bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none text-right">
                <option>Dark Glass</option>
                <option>Light Solid</option>
              </select>
            </SettingRow>
            <SettingRow
              icon="power_settings_new"
              label="Start on Boot"
              description="Launch server automatically"
              border={false}
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/70 peer-checked:after:bg-white after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </SettingRow>
          </GlassPanel>
        </section>

        <section>
          <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">
            Network
          </h2>
          <GlassPanel className="rounded-2xl flex flex-col border-white/5">
            <SettingRow
              icon="hub"
              label="Server Port"
              description="Requires application restart"
            >
              <input
                type="text"
                defaultValue="4321"
                className="bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 outline-none focus:border-white/30 transition-colors w-24 text-center"
              />
            </SettingRow>
            <SettingRow
              icon="wifi_tethering"
              label="External Connections"
              description="Allow devices on local network"
              border={false}
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/70 peer-checked:after:bg-white after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </SettingRow>
          </GlassPanel>
        </section>

        <section>
          <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">
            About
          </h2>
          <GlassPanel className="rounded-2xl flex flex-col border-white/5">
            <SettingRow
              icon="info"
              label="OmniControl Enterprise"
              description="Version 1.0.0"
              border={false}
            >
              <GlassButton className="px-4 py-1.5 rounded-full text-xs text-white/80 border border-white/10 hover:bg-white/5">
                Check for Updates
              </GlassButton>
            </SettingRow>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}
