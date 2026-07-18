import { FastifyInstance } from "fastify";
import { DeviceRegistry } from "../services/device-registry";

export async function registerDeviceRoutes(
  server: FastifyInstance,
  deviceRegistry: DeviceRegistry,
) {
  server.get("/api/v1/devices", async () => ({
    devices: deviceRegistry.list(),
  }));
  server.delete("/api/v1/devices/:id", async (request) => {
    const { id } = request.params as { id: string };
    deviceRegistry.remove(id);
    return { ok: true };
  });
}
