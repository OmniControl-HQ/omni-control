import { useEffect, useState } from "react";
import { GlassButton } from "../../UI/GlassButton";
import { GlassPanel } from "../../UI/GlassPanel";
import { Icon } from "../../UI/Icon";
import SettingRow from "../../UI/SettingsRow";
import { Switch } from "../../UI/Switch";

export function SecurityPage() {
  const [pin, setPin] = useState("4812");
  const [showPin, setShowPin] = useState(false);
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [requirePin, setRequirePin] = useState(true);

  useEffect(() => {
    void window.electron.security.get().then((security) => {
      setPin(security.pin);
      setRequirePin(security.requirePin);
    });
  }, []);

  const savePin = async () => {
    if (newPin.length !== 4) return;
    await window.electron.security.setPin(newPin);
    setPin(newPin);
    setNewPin("");
    setShowPin(false);
    setIsChangePinOpen(false);
  };

  return (
    <div className="flex-1 w-full max-w-5xl overflow-y-auto p-8 mx-auto">
      <div className="mb-10">
        <h1 className="text-[28px] font-light tracking-wide text-white">
          Security
        </h1>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="mb-3 ml-2 text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">
            Access Control
          </h2>
          <GlassPanel className="flex flex-col rounded-2xl border-white/5">
            <SettingRow
              icon="pin"
              label="Require PIN Code"
              description="Prompt for PIN on new connection"
            >
              <Switch
                checked={requirePin}
                onChange={async (enabled) => {
                  setRequirePin(enabled);
                  await window.electron.security.setRequirePin(enabled);
                }}
              />
            </SettingRow>
            <SettingRow
              icon="password"
              label="Connection PIN"
              description="Use this PIN to approve new connections"
              border={false}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 items-center gap-1 rounded-lg border border-white/10 bg-black/10 pl-3 pr-1 text-sm tracking-[0.18em] text-white/80">
                  <span>{showPin ? pin : "••••"}</span>
                  <button
                    type="button"
                    aria-label={showPin ? "Hide PIN" : "Show PIN"}
                    onClick={() => setShowPin((visible) => !visible)}
                    className="ml-1 flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon
                      name={showPin ? "visibility_off" : "visibility"}
                      className="text-[17px]"
                    />
                  </button>
                </div>
                <GlassButton
                  onClick={() => setIsChangePinOpen(true)}
                  className="rounded-md border border-white/10 px-4 py-1.5 text-xs text-white/80 hover:bg-white/5"
                >
                  Change PIN
                </GlassButton>
              </div>
            </SettingRow>
            {isChangePinOpen && (
              <div className="mx-5 mb-5 rounded-xl  p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      Set a new PIN
                    </p>
                    <p className="mt-1 text-[13px] text-white/45">
                      Use four digits to approve incoming connections.
                    </p>
                  </div>
                </div>
                <input
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={newPin}
                  onChange={(event) =>
                    setNewPin(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="0000"
                  aria-label="New 4 digit PIN"
                  className="my-4 w-full rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-center text-xl tracking-[0.55em] text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/30"
                />
                <div className="flex justify-end gap-3">
                  <GlassButton
                    onClick={() => {
                      setIsChangePinOpen(false);
                      setNewPin("");
                    }}
                    className="rounded-lg px-4 py-2 text-sm text-white/65 hover:bg-white/10"
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    onClick={savePin}
                    disabled={newPin.length !== 4}
                    className="rounded-lg border-white/15 bg-white/10 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/20"
                  >
                    Save PIN
                  </GlassButton>
                </div>
              </div>
            )}
          </GlassPanel>
        </section>
        <section>
          <h2 className="mb-3 ml-2 text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">
            Network Security
          </h2>
          <GlassPanel className="flex flex-col rounded-2xl border-white/5">
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
              <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[13px] text-white/60">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                Active
              </div>
            </SettingRow>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}
