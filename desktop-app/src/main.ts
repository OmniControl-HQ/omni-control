import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as http from "http";
import { Server } from "socket.io";

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Since main.js compiles to dist/main.js, index.html is located at ../index.html relative to dist/main.js
  win.loadFile(path.join(__dirname, "../index.html"));
}

// Socket.io Server Setup
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Mobile connected");

  socket.on("disconnect", () => {
    console.log("Mobile disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
