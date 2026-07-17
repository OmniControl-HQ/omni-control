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
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/70 peer-checked:after:bg-white after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </SettingRow>
            <SettingRow
              icon="password"
              label="Connection PIN"
              description="Current: ****"
              border={false}
            >
              <GlassButton className="px-4 py-1.5 rounded-full text-xs text-white/80 border border-white/10 hover:bg-white/5">
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
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/70 peer-checked:after:bg-white after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/20"></div>
              </label>
            </SettingRow>
            <SettingRow
              icon="enhanced_encryption"
              label="End-to-End Encryption"
              description="All network data is TLS encrypted"
              border={false}
            >
              <div className="flex items-center gap-2 text-white/60 text-[13px] px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                Active
              </div>
            </SettingRow>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}
