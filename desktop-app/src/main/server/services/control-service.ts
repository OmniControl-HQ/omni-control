import * as robot from "@hurdlegroup/robotjs";
import { MediaCommand, PointerClickCommand, PointerMoveCommand, PointerScrollCommand } from "../types";

const mediaKeyByAction = {
  "play-pause": "audio_play",
  next: "audio_next",
  previous: "audio_prev",
  "volume-up": "audio_vol_up",
  "volume-down": "audio_vol_down",
  mute: "audio_mute",
} as const;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export class ControlService {
  private mouseX = 0;
  private mouseY = 0;
  private moveQueue = { dx: 0, dy: 0 };
  private moveTimeout: NodeJS.Timeout | null = null;
  private lastSyncTime = 0;
  private readonly SYNC_INTERVAL = 5000; // Sync with real position every 5 seconds
  private readonly BATCH_INTERVAL = 8; // Process moves every 8ms (~120fps)

  constructor() {
    robot.setMouseDelay(0);
    robot.setKeyboardDelay(0);
    this.syncMousePosition();
  }

  private syncMousePosition(): void {
    try {
      const position = robot.getMousePos();
      this.mouseX = position.x;
      this.mouseY = position.y;
      this.lastSyncTime = Date.now();
    } catch (error) {
      // Ignore sync errors
    }
  }

  private processMoveQueue(): void {
    if (this.moveQueue.dx === 0 && this.moveQueue.dy === 0) {
      this.moveTimeout = null;
      return;
    }

    console.log("[ControlService] Processing move queue:", this.moveQueue);

    // Sync periodically to prevent drift
    if (Date.now() - this.lastSyncTime > this.SYNC_INTERVAL) {
      this.syncMousePosition();
    }

    // Update local position
    this.mouseX += this.moveQueue.dx;
    this.mouseY += this.moveQueue.dy;

    // Clamp to screen bounds (prevent going negative)
    this.mouseX = Math.max(0, Math.round(this.mouseX));
    this.mouseY = Math.max(0, Math.round(this.mouseY));

    console.log("[ControlService] Moving mouse to:", { x: this.mouseX, y: this.mouseY });

    // Execute move
    try {
      robot.moveMouse(this.mouseX, this.mouseY);
      console.log("[ControlService] Mouse moved successfully");
    } catch (error) {
      console.error("[ControlService] Move mouse error:", error);
      // On error, resync position
      this.syncMousePosition();
    }

    // Reset queue
    this.moveQueue = { dx: 0, dy: 0 };
    this.moveTimeout = null;
  }

  movePointer(command: PointerMoveCommand): void {
    this.validatePointerMove(command);

    // Accumulate movements
    this.moveQueue.dx += command.dx;
    this.moveQueue.dy += command.dy;

    console.log("[ControlService] Move queued:", { 
      command, 
      queue: this.moveQueue,
      hasTimeout: !!this.moveTimeout 
    });

    // Schedule batch processing if not already scheduled
    if (!this.moveTimeout) {
      this.moveTimeout = setTimeout(() => this.processMoveQueue(), this.BATCH_INTERVAL);
    }
  }

  validatePointerMove(command: PointerMoveCommand): void {
    if (!isFiniteNumber(command?.dx) || !isFiniteNumber(command?.dy)) {
      throw new Error("Pointer movement must use finite coordinates.");
    }
    if (Math.abs(command.dx) > 250 || Math.abs(command.dy) > 250) {
      throw new Error("Pointer movement exceeds the allowed range.");
    }
  }

  clickPointer(command: PointerClickCommand): void {
    if (!command || !["left", "right", "middle"].includes(command.button)) {
      throw new Error("Unsupported mouse button.");
    }
    if (command.double !== undefined && typeof command.double !== "boolean") {
      throw new Error("Invalid click request.");
    }
    robot.mouseClick(command.button, command.double ?? false);
  }

  scrollPointer(command: PointerScrollCommand): void {
    if (!isFiniteNumber(command.dx) || !isFiniteNumber(command.dy)) {
      throw new Error("Scroll values must be finite.");
    }
    if (Math.abs(command.dx) > 100 || Math.abs(command.dy) > 100) {
      throw new Error("Scroll value exceeds the allowed range.");
    }
    robot.scrollMouse(Math.round(command.dx), Math.round(command.dy));
  }

  media(command: MediaCommand): void {
    if (!command || !(command.action in mediaKeyByAction)) {
      throw new Error("Unsupported media action.");
    }
    robot.keyTap(mediaKeyByAction[command.action]);
  }
}
