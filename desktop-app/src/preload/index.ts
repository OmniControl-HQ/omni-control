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
  devices: {
    list: () => ipcRenderer.invoke("devices:list"),
    remove: (id: string) => ipcRenderer.invoke("devices:remove", id),
  },
  settings: {
    get: () => ipcRenderer.invoke("settings:get"),
    update: (settings: unknown) => ipcRenderer.invoke("settings:update", settings),
    reset: () => ipcRenderer.invoke("settings:reset"),
  },
  security: {
    get: () => ipcRenderer.invoke("security:get"),
    setRequirePin: (requirePin: boolean) => ipcRenderer.invoke("security:set-require-pin", requirePin),
    setPin: (pin: string) => ipcRenderer.invoke("security:set-pin", pin),
  },
  logs: {
    list: () => ipcRenderer.invoke("logs:list"),
    clear: () => ipcRenderer.invoke("logs:clear"),
  },
});
