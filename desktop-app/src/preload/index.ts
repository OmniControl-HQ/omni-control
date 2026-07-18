import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electron", {
  platform: process.platform,
  window: {
    minimize: () => ipcRenderer.send("window-minimize"),
    toggleMaximize: () => ipcRenderer.send("window-toggle-maximize"),
    close: () => ipcRenderer.send("window-close"),
  },
  dashboard: {
    getSnapshot: () => ipcRenderer.invoke("dashboard:get-snapshot"),
  },
});
