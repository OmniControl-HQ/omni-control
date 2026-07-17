import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Switch } from "../../UI/Switch";
import SettingRow from "../../UI/SettingsRow";

export function SecurityPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-[28px] font-light text-white tracking-wide">
          Security
        </h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">
            Access Control
          </h2>
          <GlassPanel className="rounded-2xl flex flex-col border-white/5">
            <SettingRow
              icon="pin"
              label="Require PIN Code"
              description="Prompt for PIN on new connection"
            >
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow
              icon="password"
              label="Connection PIN"
              description="Current: ****"
              border={false}
            >
              <GlassButton className="px-4 py-1.5 rounded-md text-xs text-white/80 border border-white/10 hover:bg-white/5">
                Change PIN
              </GlassButton>
            </SettingRow>
          </GlassPanel>
        </section>

        <section>
          <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">
            Network Security
          </h2>
          <GlassPanel className="rounded-2xl flex flex-col border-white/5">
            <SettingRow
              icon="vpn_lock"
              label="IP Whitelisting"
              description="Restrict to specific IP addresses"
            >
              <Switch />
            </SettingRow>
            <SettingRow
              icon="enhanced_encryption"
              label="End-to-End Encryption"
              description="All network data is TLS encrypted"
              border={false}
            >
              <div className="flex items-center gap-2 text-white/60 text-[13px] px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-400 "></div>
                Active
              </div>
            </SettingRow>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}
