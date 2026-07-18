import { Server, Socket } from "socket.io";
import { DeviceRegistry } from "../services/device-registry";
import { ActivityLogService } from "../services/activity-log-service";
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

export function registerSocketGateway(
  io: Server,
  deviceRegistry: DeviceRegistry,
  activityLogService: ActivityLogService,
) {
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

        const device = deviceRegistry.upsert(payload, socket.handshake.address);
        socket.data.deviceId = device.id;
        activityLogService.record({ level: "info", category: "device", message: `${device.name} connected.` });
        acknowledge?.({ ok: true, device });
        io.emit("devices:changed", { devices: deviceRegistry.list() });
      },
    );

    socket.on("disconnect", () => {
      const deviceId = socket.data.deviceId as string | undefined;
      if (!deviceId) return;
      const device = deviceRegistry.list().find((item) => item.id === deviceId);
      deviceRegistry.remove(deviceId);
      activityLogService.record({ level: "info", category: "device", message: `${device?.name ?? "Device"} disconnected.` });
      io.emit("devices:changed", { devices: deviceRegistry.list() });
    });
  });
}
