import { io, Socket } from "socket.io-client";
import type { SocketEvents, DashboardSnapshot, DeviceMetrics, Device } from "../types";

class SocketService {
  private socket: Socket | null = null;
  private connected = false;

  connect(serverUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on("connect", () => {
        this.connected = true;
        console.log("[Socket] Connected to server");
        resolve();
      });

      this.socket.on("connect_error", (error) => {
        this.connected = false;
        console.error("[Socket] Connection error:", error);
        reject(error);
      });

      this.socket.on("disconnect", () => {
        this.connected = false;
        console.log("[Socket] Disconnected from server");
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  // Dashboard
  onDashboardSnapshot(callback: (data: DashboardSnapshot) => void): void {
    this.socket?.on("dashboard:snapshot", callback);
  }

  // Device Status
  onDeviceStatus(callback: (data: { deviceId: string; status: Device["status"] }) => void): void {
    this.socket?.on("device:status", callback);
  }

  onDeviceMetrics(callback: (data: { deviceId: string; metrics: DeviceMetrics }) => void): void {
    this.socket?.on("device:metrics", callback);
  }

  // Control Actions
  sendKeyboardAction(key: string, modifiers?: ("ctrl" | "alt" | "shift" | "meta")[]): void {
    this.socket?.emit("control:keyboard", { key, modifiers, type: "keyboard" });
  }

  sendMouseMove(x: number, y: number): void {
    this.socket?.emit("control:mouse", { type: "mouse", action: "move", x, y });
  }

  sendMouseClick(button: "left" | "right" | "middle" = "left"): void {
    this.socket?.emit("control:mouse", { type: "mouse", action: "click", button });
  }

  sendMouseScroll(delta: number): void {
    this.socket?.emit("control:mouse", { type: "mouse", action: "scroll", delta });
  }

  sendMediaAction(action: "play" | "pause" | "next" | "previous"): void {
    this.socket?.emit("control:media", { action });
  }

  sendSystemAction(action: "sleep" | "shutdown" | "restart" | "lock"): void {
    this.socket?.emit("control:system", { action });
  }

  // Error handling
  onError(callback: (data: { message: string; code?: string }) => void): void {
    this.socket?.on("error", callback);
  }

  // Cleanup listeners
  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }
}

export const socketService = new SocketService();
