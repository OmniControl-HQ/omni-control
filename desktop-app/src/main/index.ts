import { app, BrowserWindow, shell, ipcMain } from "electron";
import { join } from "path";
import Fastify from "fastify";
import { Server } from "socket.io";

// create frameless window for electron
function createWindow(): void {
  const win = new BrowserWindow({
    width: 820,
    height: 580,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
    resizable: false,
  });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  ipcMain.on("window-minimize", () => win.minimize());
  ipcMain.on("window-toggle-maximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("window-close", () => win.close());

  // HMR for renderer — electron-vite handles this automatically in dev mode
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// http server
const fastify = Fastify({
  logger: true,
});

// socket I.O server
const io = new Server(fastify.server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

let connectedClients = 0;

io.on("connection", (socket) => {
  connectedClients++;
  console.log(`[OmniControl] Mobile connected  (total: ${connectedClients})`);
  io.emit("status-update", { clients: connectedClients });

  socket.on("disconnect", () => {
    connectedClients--;
    console.log(
      `[OmniControl] Mobile disconnected (total: ${connectedClients})`,
    );
    io.emit("status-update", { clients: connectedClients });
  });
});

const PORT = 4321;
fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`HTTP Server running in PORT : ${PORT}`);
});

// app lifecycle , will close after closing the app
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
