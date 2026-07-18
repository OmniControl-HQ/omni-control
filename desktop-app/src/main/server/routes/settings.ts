import { FastifyInstance } from "fastify";
import { SettingsService } from "../services/settings-service";

export async function registerSettingsRoutes(server: FastifyInstance, settingsService: SettingsService) {
  server.get("/api/v1/settings", async () => settingsService.get());
  server.put("/api/v1/settings", async (request) => settingsService.update(request.body as object));
  server.post("/api/v1/settings/reset", async () => settingsService.reset());
}
