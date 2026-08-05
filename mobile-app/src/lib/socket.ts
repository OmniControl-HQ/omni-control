import { io, Socket } from "socket.io-client";

interface PointerMoveCommand {
  dx: number;
  dy: number;
}

interface PointerClickCommand {
  button: "left" | "right" | "middle";
  double?: boolean;
}

interface PointerScrollCommand {
  dx: number;
  dy: number;
}

interface MediaCommand {
  action: "play-pause" | "next" | "previous" | "volume-up" | "volume-down" | "mute";
}

interface KeyboardTextCommand {
  text: string;
}

interface KeyboardKeyCommand {
  key: string;
  modifiers?: string[];
}

interface KeyboardShortcutCommand {
  shortcut: "copy" | "paste" | "cut" | "selectAll" | "undo" | "redo" | "save" | "find" | "refresh" | "enter" | "backspace" | "delete" | "escape" | "tab" | "space";
}

interface DeviceIdentification {
  id: string;
  name: string;
  platform: string;
  pin: string;
}

interface ControlResult {
  ok: boolean;
  error?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private connected = false;
  private authenticated = false;

  connect(serverUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      this.socket.on("connect", () => {
        this.connected = true;
      });

      this.socket.on("server:ready", (data: { protocol: string }) => {
        resolve();
      });

      this.socket.on("connect_error", (error) => {
        this.connected = false;
        reject(error);
      });

      this.socket.on("disconnect", (reason) => {
        this.connected = false;
        this.authenticated = false;
      });

      this.socket.on("error", (error) => {
        console.error("[Socket] Socket error:", error);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.authenticated = false;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  identify(deviceInfo: DeviceIdentification): Promise<any> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve({ ok: false, error: "Not connected" });
        return;
      }

      const timeout = setTimeout(() => {
        if (!this.authenticated) {
          resolve({ ok: false, error: "Authentication timeout" });
        }
      }, 5000);

      this.socket.emit("device:identify", deviceInfo, (response: any) => {
        clearTimeout(timeout);
        if (response && response.ok) {
          this.authenticated = true;
        }
        resolve(response);
      });
    });
  }

  sendPointerMove(dx: number, dy: number): void {
    if (!this.authenticated || !this.socket) return;
    this.socket.emit("control:pointer:move", { dx, dy } as PointerMoveCommand);
  }

  sendPointerClick(button: "left" | "right" | "middle" = "left", double = false): Promise<ControlResult> {
    return new Promise((resolve) => {
      if (!this.authenticated || !this.socket) {
        resolve({ ok: false, error: "Not authenticated" });
        return;
      }

      this.socket.emit(
        "control:pointer:click",
        { button, double } as PointerClickCommand,
        (response: ControlResult) => {
          resolve(response);
        }
      );
    });
  }

  sendPointerScroll(dx: number, dy: number): void {
    if (!this.authenticated || !this.socket) return;
    this.socket.emit("control:pointer:scroll", { dx, dy } as PointerScrollCommand);
  }

  sendMediaCommand(action: MediaCommand["action"]): Promise<ControlResult> {
    return new Promise((resolve) => {
      if (!this.authenticated || !this.socket) {
        resolve({ ok: false, error: "Not authenticated" });
        return;
      }

      this.socket.emit(
        "control:media",
        { action } as MediaCommand,
        (response: ControlResult) => {
          resolve(response);
        }
      );
    });
  }

  sendKeyboardText(text: string): Promise<ControlResult> {
    return new Promise((resolve) => {
      if (!this.authenticated || !this.socket) {
        resolve({ ok: false, error: "Not authenticated" });
        return;
      }

      this.socket.emit(
        "control:keyboard:text",
        { text } as KeyboardTextCommand,
        (response: ControlResult) => {
          resolve(response);
        }
      );
    });
  }

  sendKeyPress(key: string, modifiers?: string[]): Promise<ControlResult> {
    return new Promise((resolve) => {
      if (!this.authenticated || !this.socket) {
        resolve({ ok: false, error: "Not authenticated" });
        return;
      }

      this.socket.emit(
        "control:keyboard:key",
        { key, modifiers } as KeyboardKeyCommand,
        (response: ControlResult) => {
          resolve(response);
        }
      );
    });
  }

  sendKeyboardShortcut(shortcut: KeyboardShortcutCommand["shortcut"]): Promise<ControlResult> {
    return new Promise((resolve) => {
      if (!this.authenticated || !this.socket) {
        resolve({ ok: false, error: "Not authenticated" });
        return;
      }

      this.socket.emit(
        "control:keyboard:shortcut",
        { shortcut } as KeyboardShortcutCommand,
        (response: ControlResult) => {
          resolve(response);
        }
      );
    });
  }

  onDevicesChanged(callback: (data: { devices: any[] }) => void): void {
    this.socket?.on("devices:changed", callback);
  }

  onError(callback: (data: { message: string; code?: string }) => void): void {
    this.socket?.on("error", callback);
  }

  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }
}

export const socketService = new SocketService();
