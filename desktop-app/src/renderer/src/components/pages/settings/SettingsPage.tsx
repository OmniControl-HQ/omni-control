import { useState } from "react";
import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Switch } from "../../UI/Switch";
import SettingRow from "../../UI/SettingsRow";
import { Icon } from "../../UI/Icon";

export function SettingsPage() {
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

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
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isAppearanceOpen}
                  aria-haspopup="listbox"
                  onClick={() => setIsAppearanceOpen((open) => !open)}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
                >
                  Dark Glass
                  <Icon name="expand_more" className={`text-[18px] text-white/45 transition-transform ${isAppearanceOpen ? "rotate-180" : ""}`} />
                </button>
                {isAppearanceOpen && (
                  <div role="listbox" aria-label="Appearance" className="absolute right-0 top-[calc(100%+0.5rem)] z-10 w-full min-w-36 rounded-lg border border-white/10 bg-[#202324]/95 p-1 shadow-xl shadow-black/30 backdrop-blur-xl">
                    <button type="button" role="option" aria-selected="true" onClick={() => setIsAppearanceOpen(false)} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/10">
                      Dark Glass
                      <Icon name="check" className="text-[17px] text-white/60" />
                    </button>
                  </div>
                )}
              </div>
            </SettingRow>
            <SettingRow
              icon="power_settings_new"
              label="Start on Boot"
              description="Launch server automatically"
              border={false}
            >
              <Switch defaultChecked />
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
              <Switch defaultChecked />
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
