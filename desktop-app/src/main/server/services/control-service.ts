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
  constructor() {
    robot.setMouseDelay(0);
    robot.setKeyboardDelay(0);
  }

  movePointer(command: PointerMoveCommand): void {
    this.validatePointerMove(command);
    const position = robot.getMousePos();
    robot.moveMouse(position.x + Math.round(command.dx), position.y + Math.round(command.dy));
  }

  validatePointerMove(command: PointerMoveCommand): void {
    if (!isFiniteNumber(command?.dx) || !isFiniteNumber(command?.dy)) throw new Error("Pointer movement must use finite coordinates.");
    if (Math.abs(command.dx) > 250 || Math.abs(command.dy) > 250) throw new Error("Pointer movement exceeds the allowed range.");
  }

  clickPointer(command: PointerClickCommand): void {
    if (!command || !["left", "right", "middle"].includes(command.button)) throw new Error("Unsupported mouse button.");
    if (command.double !== undefined && typeof command.double !== "boolean") throw new Error("Invalid click request.");
    robot.mouseClick(command.button, command.double ?? false);
  }

  scrollPointer(command: PointerScrollCommand): void {
    if (!isFiniteNumber(command.dx) || !isFiniteNumber(command.dy)) throw new Error("Scroll values must be finite.");
    if (Math.abs(command.dx) > 100 || Math.abs(command.dy) > 100) throw new Error("Scroll value exceeds the allowed range.");
    robot.scrollMouse(Math.round(command.dx), Math.round(command.dy));
  }

  media(command: MediaCommand): void {
    if (!command || !(command.action in mediaKeyByAction)) throw new Error("Unsupported media action.");
    robot.keyTap(mediaKeyByAction[command.action]);
  }
}
