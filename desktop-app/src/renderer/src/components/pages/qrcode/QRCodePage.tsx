import { useEffect, useState } from "react";
import { GlassPanel } from "../../UI/GlassPanel";
import { Icon } from "../../UI/Icon";

export function QRCodePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
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

      // Generate QR code with connection data
      const connectionData = {
        ip,
        port: serverPort,
        pin: currentPin,
      };
      
      const dataString = JSON.stringify(connectionData);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(dataString)}`;
      setQrCodeUrl(qrUrl);
      setLoading(false);
      
      console.log("[QRCode] Generated connection data:", connectionData);
    } catch (error) {
      console.error("[QRCode] Failed to load server info:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl overflow-y-auto p-8 mx-auto">
      <div className="mb-10">
        <h1 className="text-[28px] font-light tracking-wide text-white mb-2">
          Quick Connect
        </h1>
        <p className="text-sm text-white/50">
          Scan this QR code from your mobile app to connect instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <GlassPanel className="flex flex-col items-center justify-center p-12 rounded-2xl border-white/5">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin">
                <Icon name="refresh" className="text-[48px] text-white/40" />
              </div>
              <p className="text-sm text-white/40">Generating QR code...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <img
                  src={qrCodeUrl}
                  alt="QR Code for connection"
                  className="w-[300px] h-[300px]"
                />
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Icon name="qr_code_scanner" className="text-[20px]" />
                <span className="text-sm">Scan with OmniControl mobile app</span>
              </div>
            </div>
          )}
        </GlassPanel>

        {/* Connection Details */}
        <div className="flex flex-col gap-6">
          <GlassPanel className="flex flex-col gap-4 p-6 rounded-2xl border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="info" className="text-[24px] text-blue-400" />
              <h2 className="text-lg font-medium text-white">Connection Info</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                  Server IP Address
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <Icon name="router" className="text-[20px] text-white/40" />
                  <span className="font-mono text-sm text-white/80">{serverIp}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                  Port
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <Icon name="settings_ethernet" className="text-[20px] text-white/40" />
                  <span className="font-mono text-sm text-white/80">{serverPort}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                  PIN
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <Icon name="lock" className="text-[20px] text-white/40" />
                  <span className="font-mono text-lg text-white/80 tracking-widest">{pin}</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="flex flex-col gap-3 p-6 rounded-2xl border-white/5 bg-blue-500/5">
            <div className="flex items-start gap-3">
              <Icon name="lightbulb" className="text-[24px] text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white mb-2">How to use</h3>
                <ol className="text-xs text-white/60 space-y-2 list-decimal list-inside">
                  <li>Open OmniControl app on your mobile device</li>
                  <li>When connection fails, tap "Scan QR Code"</li>
                  <li>Point camera at the QR code above</li>
                  <li>App will connect automatically</li>
                </ol>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
