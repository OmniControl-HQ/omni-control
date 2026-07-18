import { FastifyInstance } from "fastify";
import { ActivityLogService } from "../services/activity-log-service";

export async function registerLogRoutes(server: FastifyInstance, activityLogService: ActivityLogService) {
  server.get("/api/v1/logs", async () => ({ logs: activityLogService.list() }));
  server.delete("/api/v1/logs", async () => {
    activityLogService.clear();
    return { ok: true };
  });
}
