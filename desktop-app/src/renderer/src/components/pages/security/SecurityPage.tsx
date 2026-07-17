import { GlassPanel } from "../../UI/GlassPanel";
import { GlassButton } from "../../UI/GlassButton";
import { Icon } from "../../UI/Icon";

export function SecurityPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
      <div className="mb-2 shrink-0">
        <h1 className="text-[24px] leading-8 font-semibold text-white">
          Security
        </h1>
        <p className="text-[14px] text-[#c4c7c7] mt-1">
          Manage access control, authentication, and security policies.
        </p>
      </div>

      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
          <Icon name="lock" className="text-[#c4c7c7]" />
          <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
            Access Control
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">Require PIN Code</span>
            <span className="text-[12px] text-[#c4c7c7]">
              Prompt for a PIN code when a new device connects
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c4c7c7] peer-checked:after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/60 border border-white/10"></div>
          </label>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">Connection PIN</span>
            <span className="text-[12px] text-[#c4c7c7]">
              Current PIN: ****
            </span>
          </div>
          <GlassButton className="px-4 py-1.5 rounded-lg text-[13px] text-white">
            Change PIN
          </GlassButton>
        </div>
      </GlassPanel>

      <GlassPanel className="rounded-xl p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
          <Icon name="shield" className="text-[#c4c7c7]" />
          <h2 className="text-[18px] leading-6 font-medium text-[#e2e2e4]">
            Network Security
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">IP Whitelisting</span>
            <span className="text-[12px] text-[#c4c7c7]">
              Only allow connections from specific IP addresses
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c4c7c7] peer-checked:after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500/60 border border-white/10"></div>
          </label>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#e2e2e4]">
              End-to-End Encryption
            </span>
            <span className="text-[12px] text-[#c4c7c7]">
              All data transmitted over the network is encrypted via TLS
            </span>
          </div>
          <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-[12px] border border-green-400/20">
            <Icon name="check_circle" className="text-[14px]" />
            Active
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
