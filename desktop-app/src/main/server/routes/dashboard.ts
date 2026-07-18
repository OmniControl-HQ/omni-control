import { FastifyInstance } from "fastify";
import { DashboardService } from "../services/dashboard-service";

export async function registerDashboardRoutes(
  server: FastifyInstance,
  dashboardService: DashboardService,
) {
  server.get("/api/v1/dashboard", async () => dashboardService.getSnapshot());
}
