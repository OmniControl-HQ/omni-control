import * as robot from "@hurdlegroup/robotjs";
import {
  MediaCommand,
  PointerClickCommand,
  PointerMoveCommand,
  PointerScrollCommand,
  KeyboardTextCommand,
  KeyboardKeyCommand,
  KeyboardShortcutCommand,
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

  // Keyboard Control Methods
  typeText(command: KeyboardTextCommand): void {
    if (!command || typeof command.text !== "string") {
      throw new Error("Invalid text input command.");
    }
    if (command.text.length > 5000) {
      throw new Error("Text input exceeds maximum length of 5000 characters.");
    }
    if (command.text.length === 0) {
      return; // Nothing to type
    }
    
    try {
      robot.typeString(command.text);
    } catch (error) {
      throw new Error("Failed to type text. Some characters may not be supported.");
    }
  }

  pressKey(command: KeyboardKeyCommand): void {
    if (!command || typeof command.key !== "string" || !command.key.trim()) {
      throw new Error("Invalid key press command.");
    }

    const modifiers = Array.isArray(command.modifiers) ? command.modifiers : [];
    
    // Validate modifiers
    const validModifiers = ["shift", "control", "alt", "command"];
    for (const mod of modifiers) {
      if (!validModifiers.includes(mod.toLowerCase())) {
        throw new Error(`Invalid modifier key: ${mod}`);
      }
    }

    try {
      robot.keyTap(command.key, modifiers);
    } catch (error) {
      throw new Error(`Failed to press key: ${command.key}`);
    }
  }

  executeShortcut(command: KeyboardShortcutCommand): void {
    if (!command || !command.shortcut) {
      throw new Error("Invalid shortcut command.");
    }

    const platform = process.platform;
    const ctrl = platform === "darwin" ? "command" : "control";

    try {
      switch (command.shortcut) {
        case "copy":
          robot.keyTap("c", [ctrl]);
          break;
        case "paste":
          robot.keyTap("v", [ctrl]);
          break;
        case "cut":
          robot.keyTap("x", [ctrl]);
          break;
        case "selectAll":
          robot.keyTap("a", [ctrl]);
          break;
        case "undo":
          robot.keyTap("z", [ctrl]);
          break;
        case "redo":
          robot.keyTap("y", [ctrl]);
          break;
        case "save":
          robot.keyTap("s", [ctrl]);
          break;
        case "find":
          robot.keyTap("f", [ctrl]);
          break;
        case "refresh":
          robot.keyTap("r", [ctrl]);
          break;
        case "enter":
          robot.keyTap("enter");
          break;
        case "backspace":
          robot.keyTap("backspace");
          break;
        case "delete":
          robot.keyTap("delete");
          break;
        case "escape":
          robot.keyTap("escape");
          break;
        case "tab":
          robot.keyTap("tab");
          break;
        case "space":
          robot.keyTap("space");
          break;
        default:
          throw new Error(`Unsupported shortcut: ${command.shortcut}`);
      }
    } catch (error) {
      throw new Error(`Failed to execute shortcut: ${command.shortcut}`);
    }
  }
}
