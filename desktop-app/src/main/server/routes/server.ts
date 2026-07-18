import { FastifyInstance } from "fastify";
import { serverConfig } from "../config";
import { DeviceRegistry } from "../services/device-registry";

export async function registerServerRoutes(
  server: FastifyInstance,
  deviceRegistry: DeviceRegistry,
) {
  server.get("/api/v1/server", async () => ({
    name: "OmniControl",
    protocol: serverConfig.protocolVersion,
    connectedDevices: deviceRegistry.count(),
  }));
}
