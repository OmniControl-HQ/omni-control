import { Server, Socket } from "socket.io";
import { DeviceRegistry } from "../services/device-registry";
import { ActivityLogService } from "../services/activity-log-service";
import { ControlService } from "../services/control-service";
import { SecurityService } from "../services/security-service";
import { ControlResult, DeviceIdentification, MediaCommand, PointerClickCommand, PointerMoveCommand, PointerScrollCommand, SocketAcknowledgement } from "../types";

type IdentificationResponse =
  | { ok: true; device: ReturnType<DeviceRegistry["upsert"]> }
  | { ok: false; error: string };

function isDeviceIdentification(value: unknown): value is DeviceIdentification {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return ["id", "name", "platform", "pin"].every(
    (field) => typeof candidate[field] === "string" && candidate[field].trim(),
  );
}

export function registerSocketGateway(
  io: Server,
  deviceRegistry: DeviceRegistry,
  activityLogService: ActivityLogService,
  securityService: SecurityService,
  controlService: ControlService,
) {
  io.on("connection", (socket: Socket) => {
    const pointerEvents: number[] = [];
    socket.emit("server:ready", { protocol: "v1" });

    const respond = (acknowledge: SocketAcknowledgement<ControlResult> | undefined, execute: () => void) => {
      if (!socket.data.deviceId) {
        acknowledge?.({ ok: false, error: "Device is not authenticated." });
        return;
      }
      try {
        execute();
        acknowledge?.({ ok: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Control command failed.";
        activityLogService.record({ level: "warning", category: "control", message });
        acknowledge?.({ ok: false, error: message });
      }
    };

    const allowPointerEvent = () => {
      const now = Date.now();
      while (pointerEvents[0] && now - pointerEvents[0] >= 1000) pointerEvents.shift();
      if (pointerEvents.length >= 120) return false;
      pointerEvents.push(now);
      return true;
    };

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

        if (!securityService.verifyPin(payload.pin)) {
          activityLogService.record({ level: "warning", category: "security", message: `Rejected connection from ${socket.handshake.address}.` });
          acknowledge?.({ ok: false, error: "Invalid connection PIN." });
          return;
        }

        const { pin: _, ...identity } = payload;
        const device = deviceRegistry.upsert(identity, socket.handshake.address);
        socket.data.deviceId = device.id;
        activityLogService.record({ level: "info", category: "device", message: `${device.name} connected.` });
        acknowledge?.({ ok: true, device });
        io.emit("devices:changed", { devices: deviceRegistry.list() });
      },
    );

    socket.on("control:pointer:move", (payload: PointerMoveCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      if (!allowPointerEvent()) {
        acknowledge?.({ ok: false, error: "Pointer rate limit exceeded." });
        return;
      }
      respond(acknowledge, () => controlService.movePointer(payload));
    });

    socket.on("control:pointer:click", (payload: PointerClickCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.clickPointer(payload);
        activityLogService.record({ level: "info", category: "control", message: `Mouse ${payload.button} click received.` });
      });
    });

    socket.on("control:pointer:scroll", (payload: PointerScrollCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      if (!allowPointerEvent()) {
        acknowledge?.({ ok: false, error: "Pointer rate limit exceeded." });
        return;
      }
      respond(acknowledge, () => controlService.scrollPointer(payload));
    });

    socket.on("control:media", (payload: MediaCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.media(payload);
        activityLogService.record({ level: "info", category: "control", message: `Media action ${payload.action} received.` });
      });
    });

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
