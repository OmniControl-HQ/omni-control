import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GlassPanel } from "../../UI/GlassPanel";
import { Icon } from "../../UI/Icon";
import Logo from "../../../public/img/logo.png";

export function QRCodePage() {
  const [qrData, setQrData] = useState<string>("");
  const [serverIp, setServerIp] = useState<string>("Loading...");
  const [serverPort] = useState<number>(4321);
  const [pin, setPin] = useState<string>("****");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServerInfo();
  }, []);

  const loadServerInfo = async () => {
    try {
      // Get dashboard data (includes server IP)
      const dashboard = await window.electron.dashboard.getSnapshot();
      const ip = dashboard.serverIp || "192.168.0.103";
      setServerIp(ip);

      // Get security settings (includes PIN)
      const security = await window.electron.security.get();
      const currentPin = security.pin || "4812";
      setPin(currentPin);

      // Generate QR code data
      const connectionData = {
        ip,
        port: serverPort,
        pin: currentPin,
      };

      setQrData(JSON.stringify(connectionData));
      setLoading(false);

      console.log("[QRCode] Generated connection data:", connectionData);
    } catch (error) {
      console.error("[QRCode] Failed to load server info:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl overflow-hidden p-6 mx-auto flex flex-col">
      <div className="mb-6">
        <h1 className="text-[24px] font-light tracking-wide text-white mb-0.5">
          Quick Connect
        </h1>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left: QR Code */}
        <GlassPanel className="shrink-0 flex items-center justify-center p-6 rounded-xl border-white/5">
          {loading ? (
            <div className="w-50 h-50 flex flex-col items-center justify-center gap-2">
              <div className="animate-spin">
                <Icon name="refresh" className="text-[32px] text-white/30" />
              </div>
              <p className="text-[10px] text-white/30">Generating...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <QRCodeSVG
                value={qrData}
                size={200}
                level="H"
                bgColor="transparent"
                fgColor="#e2e2e4"
                imageSettings={{
                  src: Logo,
                  height: 36,
                  width: 36,
                  excavate: true,
                }}
              />
              <div className="flex items-center gap-1.5 text-white/30">
                <Icon name="qr_code_scanner" className="text-[14px]" />
                <span className="text-[10px]">Scan with mobile</span>
              </div>
            </div>
          )}
        </GlassPanel>

        {/* Right: Connection Info */}
        <div className="flex-1 flex flex-col gap-3">
          <GlassPanel className="p-4 rounded-xl border-white/5">
            <h2 className="text-[11px] font-medium text-white/50 uppercase tracking-wider mb-3">
              Connection Details
            </h2>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Icon
                  name="router"
                  className="text-[14px] text-white/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="text-[9px] text-white/25 uppercase tracking-wider block mb-0.5">
                    IP Address
                  </label>
                  <span className="font-mono text-xs text-white/70 block">
                    {serverIp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Icon
                  name="settings_ethernet"
                  className="text-[14px] text-white/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="text-[9px] text-white/25 uppercase tracking-wider block mb-0.5">
                    Port
                  </label>
                  <span className="font-mono text-xs text-white/70 block">
                    {serverPort}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Icon
                  name="lock"
                  className="text-[14px] text-white/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="text-[9px] text-white/25 uppercase tracking-wider block mb-0.5">
                    PIN
                  </label>
                  <span className="font-mono text-sm text-white/70 tracking-widest block">
                    {pin}
                  </span>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-3 rounded-xl border-white/5 bg-blue-500/5">
            <div className="flex items-start gap-2">
              <Icon
                name="info"
                className="text-[14px] text-blue-400/50 mt-0.5 shrink-0"
              />
              <p className="text-[10px] text-white/40 leading-relaxed">
                Open mobile app, tap{" "}
                <span className="text-white/60">"Scan QR Code"</span> when
                connection fails
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
