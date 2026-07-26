import * as robot from "@hurdlegroup/robotjs";
import {
  MediaCommand,
  PointerClickCommand,
  PointerMoveCommand,
  PointerScrollCommand,
} from "../types";

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
  private targetDx = 0;
  private targetDy = 0;
  private remainderX = 0;
  private remainderY = 0;
  private loopTimer: NodeJS.Timeout | null = null;

  private readonly TICK_INTERVAL = 8;
  private readonly LERP_FACTOR = 0.4;

  constructor() {
    robot.setMouseDelay(0);
    robot.setKeyboardDelay(0);
  }

  private startLoop(): void {
    if (this.loopTimer) return;

    this.loopTimer = setInterval(() => {
      if (Math.abs(this.targetDx) < 0.01 && Math.abs(this.targetDy) < 0.01) {
        this.targetDx = 0;
        this.targetDy = 0;
        if (this.loopTimer) {
          clearInterval(this.loopTimer);
          this.loopTimer = null;
        }
        return;
      }

      const stepX = this.targetDx * this.LERP_FACTOR;
      const stepY = this.targetDy * this.LERP_FACTOR;

      this.targetDx -= stepX;
      this.targetDy -= stepY;

      const totalX = stepX + this.remainderX;
      const totalY = stepY + this.remainderY;

      const moveX = Math.trunc(totalX);
      const moveY = Math.trunc(totalY);

      this.remainderX = totalX - moveX;
      this.remainderY = totalY - moveY;

      if (moveX !== 0 || moveY !== 0) {
        try {
          const pos = robot.getMousePos();
          robot.moveMouse(pos.x + moveX, pos.y + moveY);
        } catch (error) {}
      }
    }, this.TICK_INTERVAL);
  }

  movePointer(command: PointerMoveCommand): void {
    this.validatePointerMove(command);

    this.targetDx += command.dx;
    this.targetDy += command.dy;

    this.startLoop();
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
