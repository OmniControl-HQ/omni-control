import { useState } from "react";
import { PanResponder } from "react-native";
import { socketService } from "../lib/socket";

interface UseMouseControlOptions {
  sensitivity?: number;
  scrollSensitivity?: number;
}

export function useMouseControl(options: UseMouseControlOptions = {}) {
  const { sensitivity = 1.5, scrollSensitivity = 5 } = options;

  // Mouse move with delta tracking
  const sendMouseMove = (dx: number, dy: number) => {
    // Use socketService authentication status directly to avoid stale closure
    if (!socketService.isAuthenticated()) return;
    
    const scaledDx = Math.round(dx * sensitivity);
    const scaledDy = Math.round(dy * sensitivity);
    socketService.sendPointerMove(scaledDx, scaledDy);
  };

  // Mouse click
  const sendMouseClick = async (
    button: "left" | "right" | "middle" = "left",
    double = false
  ) => {
    if (!socketService.isAuthenticated()) return;
    await socketService.sendPointerClick(button, double);
  };

  // Scroll
  const sendScroll = (direction: "up" | "down") => {
    if (!socketService.isAuthenticated()) return;
    const dy = direction === "up" ? scrollSensitivity : -scrollSensitivity;
    socketService.sendPointerScroll(0, dy);
  };

  // Create pan responder for trackpad
  const createTrackpadResponder = () => {
    let lastX = 0;
    let lastY = 0;
    let accumulatedDx = 0;
    let accumulatedDy = 0;
    let sendInterval: NodeJS.Timeout | null = null;

    const sendAccumulated = () => {
      if (accumulatedDx !== 0 || accumulatedDy !== 0) {
        sendMouseMove(accumulatedDx, accumulatedDy);
        accumulatedDx = 0;
        accumulatedDy = 0;
      }
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        lastX = evt.nativeEvent.pageX;
        lastY = evt.nativeEvent.pageY;
        accumulatedDx = 0;
        accumulatedDy = 0;
        
        // Start continuous sending at 120fps
        if (sendInterval) clearInterval(sendInterval);
        sendInterval = setInterval(sendAccumulated, 8); // 120fps
      },
      onPanResponderMove: (evt) => {
        const currentX = evt.nativeEvent.pageX;
        const currentY = evt.nativeEvent.pageY;
        const dx = currentX - lastX;
        const dy = currentY - lastY;

        // Accumulate all movements
        if (dx !== 0 || dy !== 0) {
          accumulatedDx += dx;
          accumulatedDy += dy;
          lastX = currentX;
          lastY = currentY;
        }
      },
      onPanResponderRelease: () => {
        // Send any remaining movement
        if (sendInterval) {
          clearInterval(sendInterval);
          sendInterval = null;
        }
        sendAccumulated();
        lastX = 0;
        lastY = 0;
        accumulatedDx = 0;
        accumulatedDy = 0;
      },
    });
  };

  return {
    sendMouseMove,
    sendMouseClick,
    sendScroll,
    createTrackpadResponder,
  };
}
