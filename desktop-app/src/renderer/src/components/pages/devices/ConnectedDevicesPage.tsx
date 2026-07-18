import { useEffect, useState } from "react";
import { Device } from "../../../types/global";
import { DeviceItem } from "../../UI/DeviceItem";
import { GlassButton } from "../../UI/GlassButton";
import { GlassPanel } from "../../UI/GlassPanel";
import { Icon } from "../../UI/Icon";

export function ConnectedDevicesPage() {
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const loadDevices = async () => {
    const devices = await window.electron.devices.list();
    setConnectedDevices(devices.map((device) => ({ id: device.id, name: device.name, role: device.platform, ip: device.ip, icon: device.platform.toLowerCase().includes("android") ? "phone_android" : "devices", latencyTone: "good" })));
  };

  useEffect(() => {
    void loadDevices();
    const interval = window.setInterval(() => void loadDevices(), 2000);
    return () => window.clearInterval(interval);
  }, []);

  const removeDevice = async () => {
    if (!selectedDevice) return;
    await window.electron.devices.remove(selectedDevice.id);
    setConnectedDevices((current) => current.filter((device) => device.id !== selectedDevice.id));
    setSelectedDevice(null);
  };

  return (
    <div className="flex h-full w-full max-w-5xl flex-1 flex-col overflow-y-auto p-8 mx-auto">
      <div className="mb-8 flex shrink-0 items-center justify-between">
        <h1 className="text-[28px] font-light tracking-wide text-white">
          Devices
        </h1>
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-white/40"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-full border border-transparent bg-white/5 py-2 pr-4 pl-10 text-sm text-white/90 outline-none transition-all placeholder:text-white/30 focus:border-white/10 focus:bg-white/10"
          />
        </div>
      </div>

      <GlassPanel className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-white/5">
        <div className="flex-1 overflow-y-auto p-3">
          {connectedDevices.length > 0 ? (
            <div className="grid grid-cols-1 gap-1">
              {connectedDevices.map((device) => (
                <div
                  key={device.id}
                  className="rounded-xl p-2 transition-colors hover:bg-white/5"
                >
                  <DeviceItem
                    device={device}
                    onClick={() => setSelectedDevice(device)}
                    expandedContent={
                      selectedDevice?.id === device.id ? (
                    <div className="bg-black/10 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white/90">
                          Device details
                        </p>
                      </div>
                      <div className="my-4 grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                            IP address
                          </p>
                          <p className="mt-1 text-sm text-white/80">
                            {device.ip}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                            Latency
                          </p>
                          <p className="mt-1 text-sm text-white/80">
                            {device.latencyMs} ms
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <GlassButton
                          className="rounded-lg px-4 py-2 text-sm text-white/65 hover:bg-white/10"
                          onClick={() => setSelectedDevice(null)}
                        >
                          Close
                        </GlassButton>
                        <GlassButton
                          className="rounded-lg border-red-300/20 bg-red-400/10 px-4 py-2 text-sm text-red-100 hover:bg-red-400/20"
                          onClick={removeDevice}
                        >
                          Remove device
                        </GlassButton>
                      </div>
                    </div>
                      ) : undefined
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-white/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <Icon name="phonelink_off" className="text-[28px]" />
              </div>
              <p className="text-sm tracking-wide">No active connections</p>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
