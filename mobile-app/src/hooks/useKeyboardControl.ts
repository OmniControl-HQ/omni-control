import { useCallback } from "react";
import { useConnection } from "../contexts/ConnectionContext";
import { socketService } from "../lib/socket";

type ShortcutType = "copy" | "paste" | "cut" | "selectAll" | "undo" | "redo" | "save" | "find" | "refresh" | "enter" | "backspace" | "delete" | "escape" | "tab" | "space";

export function useKeyboardControl() {
  const { isConnected, isAuthenticated } = useConnection();

  const sendText = useCallback(async (text: string) => {
    if (!isAuthenticated || !socketService.isAuthenticated()) {
      console.log("[Keyboard] Not authenticated, skipping text input");
      return { ok: false, error: "Not authenticated" };
    }

    if (!text || text.length === 0) {
      return { ok: false, error: "Text cannot be empty" };
    }

    console.log("[Keyboard] Sending text input:", text.substring(0, 50));
    return await socketService.sendKeyboardText(text);
  }, [isAuthenticated]);

  const sendShortcut = useCallback(async (shortcut: ShortcutType) => {
    if (!isAuthenticated || !socketService.isAuthenticated()) {
      console.log("[Keyboard] Not authenticated, skipping shortcut");
      return { ok: false, error: "Not authenticated" };
    }

    console.log("[Keyboard] Sending shortcut:", shortcut);
    return await socketService.sendKeyboardShortcut(shortcut);
  }, [isAuthenticated]);

  const sendKey = useCallback(async (key: string, modifiers?: string[]) => {
    if (!isAuthenticated || !socketService.isAuthenticated()) {
      console.log("[Keyboard] Not authenticated, skipping key press");
      return { ok: false, error: "Not authenticated" };
    }

    console.log("[Keyboard] Sending key press:", key, modifiers);
    return await socketService.sendKeyPress(key, modifiers);
  }, [isAuthenticated]);

  return {
    sendText,
    sendShortcut,
    sendKey,
    isConnected: isConnected && isAuthenticated,
  };
}
