import { useRef, useCallback } from "react";
import { PanResponder } from "react-native";
import { socketService } from "../lib/socket";

interface UseMouseControlOptions {
  sensitivity?: number;
  scrollSensitivity?: number;
}

export function useMouseControl(options: UseMouseControlOptions = {}) {
  const { sensitivity = 1.5, scrollSensitivity = 5 } = options;

  const remainderX = useRef(0);
  const remainderY = useRef(0);

  const sendMouseMove = useCallback(
    (dx: number, dy: number) => {
      if (!socketService.isAuthenticated()) return;

      const totalDx = dx * sensitivity + remainderX.current;
      const totalDy = dy * sensitivity + remainderY.current;

      const sendDx = Math.trunc(totalDx);
      const sendDy = Math.trunc(totalDy);

      remainderX.current = totalDx - sendDx;
      remainderY.current = totalDy - sendDy;

      if (sendDx !== 0 || sendDy !== 0) {
        socketService.sendPointerMove(sendDx, sendDy);
      }
    },
    [sensitivity],
  );

  const sendMouseClick = useCallback(
    async (button: "left" | "right" | "middle" = "left", double = false) => {
      if (!socketService.isAuthenticated()) return;
      await socketService.sendPointerClick(button, double);
    },
    [],
  );

  const sendScroll = useCallback(
    (direction: "up" | "down") => {
      if (!socketService.isAuthenticated()) return;
      const dy = direction === "up" ? scrollSensitivity : -scrollSensitivity;
      socketService.sendPointerScroll(0, dy);
    },
    [scrollSensitivity],
  );

  const createTrackpadResponder = useCallback(
    (setIsTouching: (v: boolean) => void) => {
      let lastX = 0;
      let lastY = 0;
      let touchStartTime = 0;

      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: (evt) => {
          setIsTouching(true);
          lastX = evt.nativeEvent.pageX;
          lastY = evt.nativeEvent.pageY;
          touchStartTime = Date.now();
          remainderX.current = 0;
          remainderY.current = 0;
        },

        onPanResponderMove: (evt) => {
          const currentX = evt.nativeEvent.pageX;
          const currentY = evt.nativeEvent.pageY;
          const dx = currentX - lastX;
          const dy = currentY - lastY;

          lastX = currentX;
          lastY = currentY;

          sendMouseMove(dx, dy);
        },

        onPanResponderRelease: (_, gestureState) => {
          setIsTouching(false);

          const duration = Date.now() - touchStartTime;
          if (
            duration < 200 &&
            Math.abs(gestureState.dx) < 5 &&
            Math.abs(gestureState.dy) < 5
          ) {
            sendMouseClick("left", false);
          }
        },

        onPanResponderTerminate: () => {
          setIsTouching(false);
        },
      });
    },
    [sendMouseMove, sendMouseClick],
  );

  return {
    sendMouseMove,
    sendMouseClick,
    sendScroll,
    createTrackpadResponder,
  };
}
