import { useConnection } from "../contexts/ConnectionContext";
import { socketService } from "../lib/socket";

type MediaAction = "play-pause" | "next" | "previous" | "volume-up" | "volume-down" | "mute";

export function useMediaControl() {
  const { isConnected, isAuthenticated } = useConnection();

  const sendMediaCommand = (action: MediaAction) => {
    if (!isAuthenticated || !socketService.isAuthenticated()) {
      return;
    }

    socketService.sendMediaCommand(action);
  };

  return {
    sendMediaCommand,
    isConnected: isConnected && isAuthenticated,
  };
}
