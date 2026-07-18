import Fastify from "fastify";
import { Server } from "socket.io";
import { serverConfig } from "./config";
import { registerDeviceRoutes } from "./routes/devices";
import { registerHealthRoutes } from "./routes/health";
import { registerServerRoutes } from "./routes/server";
import { DeviceRegistry } from "./services/device-registry";
import { registerSocketGateway } from "./socket/register-gateway";

export function createControlServer() {
  const server = Fastify({ logger: true });
  const io = new Server(server.server, {
    cors: { origin: false },
  });
  const deviceRegistry = new DeviceRegistry();

  server.register(registerHealthRoutes);
  server.register(registerServerRoutes, deviceRegistry);
  server.register(registerDeviceRoutes, deviceRegistry);
  registerSocketGateway(io, deviceRegistry);

  return {
    async start() {
      await server.listen({ host: serverConfig.host, port: serverConfig.port });
      server.log.info(`OmniControl server listening on ${serverConfig.host}:${serverConfig.port}`);
    },
    async stop() {
      await io.close();
      await server.close();
    },
  };
}
