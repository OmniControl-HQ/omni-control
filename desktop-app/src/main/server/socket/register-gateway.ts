import { Server, Socket } from "socket.io";
import { DeviceRegistry } from "../services/device-registry";
import { ActivityLogService } from "../services/activity-log-service";
import { ControlService } from "../services/control-service";
import { SecurityService } from "../services/security-service";
import { ControlResult, DeviceIdentification, MediaCommand, PointerClickCommand, PointerMoveCommand, PointerScrollCommand, KeyboardTextCommand, KeyboardKeyCommand, KeyboardShortcutCommand, SocketAcknowledgement } from "../types";

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
    const pointerEventBuffer = new Uint32Array(120);
    let pointerEventIndex = 0;
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
      const oldest = pointerEventBuffer[pointerEventIndex];
      if (oldest && now - oldest < 1000) return false;
      pointerEventBuffer[pointerEventIndex] = now;
      pointerEventIndex = (pointerEventIndex + 1) % 120;
      return true;
    };

    const queuePointerMove = (payload: PointerMoveCommand) => {
      if (!socket.data.deviceId) return;
      if (!allowPointerEvent()) return;
      
      try {
        controlService.validatePointerMove(payload);
        controlService.movePointer(payload);
      } catch (error) {
        
      }
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

    socket.on("control:pointer:move", queuePointerMove);

    socket.on("control:pointer:click", (payload: PointerClickCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.clickPointer(payload);
        activityLogService.record({ level: "info", category: "control", message: `Mouse ${payload.button} click received.` });
      });
    });

    socket.on("control:pointer:scroll", (payload: PointerScrollCommand) => {
      if (!socket.data.deviceId || !allowPointerEvent()) return;
      try {
        controlService.scrollPointer(payload);
      } catch (error) {
        
      }
    });

    socket.on("control:media", (payload: MediaCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.media(payload);
        activityLogService.record({ level: "info", category: "control", message: `Media action ${payload.action} received.` });
      });
    });

    socket.on("control:keyboard:text", (payload: KeyboardTextCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.typeText(payload);
        const preview = payload.text.length > 50 ? payload.text.substring(0, 50) + "..." : payload.text;
        activityLogService.record({ level: "info", category: "control", message: `Text input: "${preview}"` });
      });
    });

    socket.on("control:keyboard:key", (payload: KeyboardKeyCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.pressKey(payload);
        const modStr = payload.modifiers && payload.modifiers.length > 0 ? payload.modifiers.join("+") + "+" : "";
        activityLogService.record({ level: "info", category: "control", message: `Key press: ${modStr}${payload.key}` });
      });
    });

    socket.on("control:keyboard:shortcut", (payload: KeyboardShortcutCommand, acknowledge?: SocketAcknowledgement<ControlResult>) => {
      respond(acknowledge, () => {
        controlService.executeShortcut(payload);
        activityLogService.record({ level: "info", category: "control", message: `Shortcut: ${payload.shortcut}` });
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
