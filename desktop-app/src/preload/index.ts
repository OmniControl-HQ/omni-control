import { contextBridge, ipcRenderer } from "electron";

// Expose a safe API to the renderer process via the context bridge
contextBridge.exposeInMainWorld("electron", {
  platform: process.platform,
  window: {
    minimize: () => ipcRenderer.send("window-minimize"),
    toggleMaximize: () => ipcRenderer.send("window-toggle-maximize"),
    close: () => ipcRenderer.send("window-close"),
  },
});
