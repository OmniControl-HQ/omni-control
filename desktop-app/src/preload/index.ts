import { contextBridge } from 'electron'

// Expose a safe API to the renderer process via the context bridge
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform
})
