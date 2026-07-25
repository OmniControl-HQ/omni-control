import { FastifyInstance } from "fastify";
import os from "node:os";

export async function registerPcInfoRoutes(server: FastifyInstance) {
  server.get("/api/v1/pc-info", async () => {
    return {
      name: os.hostname(),
      platform: os.platform(),
      type: os.type(),
      arch: os.arch(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpuCount: os.cpus().length,
      uptime: os.uptime(),
    };
  });
}
