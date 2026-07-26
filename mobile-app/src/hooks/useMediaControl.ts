import { useConnection } from "../contexts/ConnectionContext";
import { socketService } from "../lib/socket";

type MediaAction = "play-pause" | "next" | "previous" | "volume-up" | "volume-down" | "mute";

export function useMediaControl() {
  const { isConnected, isAuthenticated } = useConnection();

  const sendMediaCommand = (action: MediaAction) => {
    if (!isAuthenticated || !socketService.isAuthenticated()) {
      console.log("[Media] Not authenticated, skipping command");
      return;
    }

    console.log("[Media] Sending command:", action);
    socketService.sendMediaCommand(action);
  };

  return {
    sendMediaCommand,
    isConnected: isConnected && isAuthenticated,
  };
}
