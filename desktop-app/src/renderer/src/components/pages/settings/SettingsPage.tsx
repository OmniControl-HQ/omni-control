import { useEffect, useState } from "react";
import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Switch } from "../../UI/Switch";
import SettingRow from "../../UI/SettingsRow";
import { Icon } from "../../UI/Icon";

const initialSettings: ServerSettings = { appearance: "dark-glass", startOnBoot: true, externalConnections: true, serverPort: 4321 };

export function SettingsPage() {
  const [settings, setSettings] = useState<ServerSettings>(initialSettings);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

  useEffect(() => { void window.electron.settings.get().then(setSettings); }, []);
  const save = async () => setSettings(await window.electron.settings.update(settings));
  const reset = async () => setSettings(await window.electron.settings.reset());

  return (
    <div className="flex-1 w-full max-w-5xl overflow-y-auto p-8 mx-auto">
      <div className="mb-10 flex items-center justify-between"><h1 className="text-[28px] font-light tracking-wide text-white">Settings</h1><div className="flex gap-3"><GlassButton onClick={reset} className="rounded-full border border-transparent bg-transparent px-5 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">Reset</GlassButton><GlassButton onClick={save} className="rounded-full border border-white/5 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20">Save Changes</GlassButton></div></div>
      <div className="space-y-8">
        <section><h2 className="mb-3 ml-2 text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">Preferences</h2><GlassPanel className="flex flex-col rounded-2xl border-white/5">
          <SettingRow icon="palette" label="Appearance" description="Select your preferred visual style"><div className="relative"><button type="button" aria-expanded={isAppearanceOpen} onClick={() => setIsAppearanceOpen((open) => !open)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">Dark Glass<Icon name="expand_more" className={`text-[18px] text-white/45 ${isAppearanceOpen ? "rotate-180" : ""}`} /></button>{isAppearanceOpen && <div className="absolute right-0 top-[calc(100%+0.5rem)] z-10 w-full min-w-36 rounded-lg border border-white/10 bg-[#202324]/95 p-1 shadow-xl"><button type="button" onClick={() => setIsAppearanceOpen(false)} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/10">Dark Glass<Icon name="check" className="text-[17px] text-white/60" /></button></div>}</div></SettingRow>
          <SettingRow icon="power_settings_new" label="Start on Boot" description="Launch server automatically" border={false}><Switch checked={settings.startOnBoot} onChange={(startOnBoot) => setSettings((current) => ({ ...current, startOnBoot }))} /></SettingRow>
        </GlassPanel></section>
        <section><h2 className="mb-3 ml-2 text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">Network</h2><GlassPanel className="flex flex-col rounded-2xl border-white/5">
          <SettingRow icon="hub" label="Server Port" description="Requires application restart"><input type="text" value={settings.serverPort} readOnly className="w-24 rounded-lg border border-white/10 bg-transparent px-4 py-2 text-center text-sm text-white/50 outline-none" /></SettingRow>
          <SettingRow icon="wifi_tethering" label="External Connections" description="Allow devices on local network" border={false}><Switch checked={settings.externalConnections} onChange={(externalConnections) => setSettings((current) => ({ ...current, externalConnections }))} /></SettingRow>
        </GlassPanel></section>
      </div>
    </div>
  );
}
