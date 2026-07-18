import { FastifyInstance } from "fastify";
import { serverConfig } from "../config";

export async function registerHealthRoutes(server: FastifyInstance) {
  server.get("/health", async () => ({
    status: "ok",
    protocol: serverConfig.protocolVersion,
  }));
}
