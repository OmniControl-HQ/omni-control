import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  Tray,
  Menu,
  nativeImage,
} from "electron";
import { join } from "path";
import icon from "./assets/icon.png?asset";
import { createControlServer } from "./server/create-control-server";

const controlServer = createControlServer();
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

ipcMain.handle("dashboard:get-snapshot", () =>
  controlServer.getDashboardSnapshot(),
);
ipcMain.handle("devices:list", () => controlServer.getDevices());
ipcMain.handle("devices:remove", (_, id: string) =>
  controlServer.removeDevice(id),
);
ipcMain.handle("settings:get", () => controlServer.getSettings());
ipcMain.handle("settings:update", (_, settings) =>
  controlServer.updateSettings(settings),
);
ipcMain.handle("settings:reset", () => controlServer.resetSettings());
ipcMain.handle("security:get", () => controlServer.getSecurity());
ipcMain.handle("security:set-require-pin", (_, requirePin: boolean) =>
  controlServer.updateRequirePin(requirePin),
);
ipcMain.handle("security:set-pin", (_, pin: string) =>
  controlServer.updatePin(pin),
);
ipcMain.handle("logs:list", () => controlServer.getLogs());
ipcMain.handle("logs:clear", () => controlServer.clearLogs());

function createTray(): void {
  const trayIcon = nativeImage.createFromPath(icon);
  tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "OmniControl",
      enabled: false,
      icon: trayIcon.resize({ width: 16, height: 16 }),
    },
    { type: "separator" },
    {
      label: "Open Dashboard",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          createWindow();
        }
      },
    },
    {
      label: "Server Running",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Start on Boot",
      type: "checkbox",
      checked: app.getLoginItemSettings().openAtLogin,
      click: (menuItem) => {
        app.setLoginItemSettings({
          openAtLogin: menuItem.checked,
          openAsHidden: true,
        });
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("OmniControl - Server Running");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    } else {
      createWindow();
    }
  });
}

function createWindow(): void {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
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

  mainWindow.on("ready-to-show", () => {
    if (mainWindow && !app.getLoginItemSettings().wasOpenedAsHidden) {
      mainWindow.show();
    }
  });

  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();

      if (process.platform === "win32") {
        mainWindow?.setSkipTaskbar(true);
      }
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  ipcMain.on("window-minimize", () => mainWindow?.minimize());
  ipcMain.on("window-close", () => {
    mainWindow?.hide();
    if (process.platform === "win32") {
      mainWindow?.setSkipTaskbar(true);
    }
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(async () => {
  await controlServer.start();

  createTray();

  const { wasOpenedAsHidden } = app.getLoginItemSettings();
  if (!wasOpenedAsHidden) {
    createWindow();
  }

  app.on("activate", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    } else {
      createWindow();
    }
  });
});

app.on("before-quit", async () => {
  isQuitting = true;
  await controlServer.stop();
});

app.on("window-all-closed", () => {});
