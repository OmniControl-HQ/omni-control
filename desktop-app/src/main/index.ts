import { app, BrowserWindow, ipcMain, shell } from "electron";
import { join } from "path";
import icon from "./assets/icon.png?asset";
import { createControlServer } from "./server/create-control-server";

const controlServer = createControlServer();

ipcMain.handle("dashboard:get-snapshot", () => controlServer.getDashboardSnapshot());
ipcMain.handle("devices:list", () => controlServer.getDevices());
ipcMain.handle("devices:remove", (_, id: string) => controlServer.removeDevice(id));
ipcMain.handle("settings:get", () => controlServer.getSettings());
ipcMain.handle("settings:update", (_, settings) => controlServer.updateSettings(settings));
ipcMain.handle("settings:reset", () => controlServer.resetSettings());
ipcMain.handle("security:get", () => controlServer.getSecurity());
ipcMain.handle("security:set-require-pin", (_, requirePin: boolean) => controlServer.updateRequirePin(requirePin));
ipcMain.handle("security:set-pin", (_, pin: string) => controlServer.updatePin(pin));
ipcMain.handle("logs:list", () => controlServer.getLogs());
ipcMain.handle("logs:clear", () => controlServer.clearLogs());

function createWindow(): void {
  const win = new BrowserWindow({
    width: 820,
    height: 580,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    icon,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
    resizable: false,
  });

  win.on("ready-to-show", () => win.show());
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  ipcMain.on("window-minimize", () => win.minimize());
  ipcMain.on("window-close", () => win.close());

  if (process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(async () => {
  await controlServer.start();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("before-quit", async () => {
  await controlServer.stop();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
