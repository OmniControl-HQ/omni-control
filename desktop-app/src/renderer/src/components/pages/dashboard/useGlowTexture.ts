import React from "react";

export function useGlowTexture(glowRef: React.RefObject<HTMLCanvasElement | null>) {
  React.useEffect(() => {
    const canvas = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 600;
    canvas.width = size;
    canvas.height = size;

    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );

    gradient.addColorStop(0, "rgba(46, 91, 255, 0.12)");
    gradient.addColorStop(0.2, "rgba(46, 91, 255, 0.07)");
    gradient.addColorStop(0.5, "rgba(46, 91, 255, 0.03)");
    gradient.addColorStop(1, "rgba(46, 91, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        const noise = (Math.random() - 0.5) * 4;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [glowRef]);
}

