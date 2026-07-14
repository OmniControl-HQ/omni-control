import { app, BrowserWindow, shell } from "electron";
import { join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

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
  });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer — electron-vite handles this automatically in dev mode
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// ─── Socket.io Server ───────────────────────────────────────────────────────
const httpServer = createServer();
const io = new Server(httpServer, {
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

const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`[OmniControl] Socket.io server listening on port ${PORT}`);
});

// ─── App lifecycle ───────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
