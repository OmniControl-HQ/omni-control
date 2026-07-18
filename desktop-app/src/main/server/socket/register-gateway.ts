import { Server, Socket } from "socket.io";
import { DeviceRegistry } from "../services/device-registry";
import { DeviceIdentification, SocketAcknowledgement } from "../types";

type IdentificationResponse =
  | { ok: true; device: ReturnType<DeviceRegistry["upsert"]> }
  | { ok: false; error: string };

function isDeviceIdentification(value: unknown): value is DeviceIdentification {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return ["id", "name", "platform"].every(
    (field) => typeof candidate[field] === "string" && candidate[field].trim(),
  );
}

export function registerSocketGateway(io: Server, deviceRegistry: DeviceRegistry) {
  io.on("connection", (socket: Socket) => {
    socket.emit("server:ready", { protocol: "v1" });

    socket.on(
      "device:identify",
      (
        payload: unknown,
        acknowledge?: SocketAcknowledgement<IdentificationResponse>,
      ) => {
        if (!isDeviceIdentification(payload)) {
          acknowledge?.({ ok: false, error: "Invalid device identity." });
          return;
        }

        const device = deviceRegistry.upsert(payload);
        socket.data.deviceId = device.id;
        acknowledge?.({ ok: true, device });
        io.emit("devices:changed", { devices: deviceRegistry.list() });
      },
    );

    socket.on("disconnect", () => {
      const deviceId = socket.data.deviceId as string | undefined;
      if (!deviceId) return;
      deviceRegistry.remove(deviceId);
      io.emit("devices:changed", { devices: deviceRegistry.list() });
    });
  });
}
