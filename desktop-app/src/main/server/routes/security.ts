import { FastifyInstance } from "fastify";
import { SecurityService } from "../services/security-service";

export async function registerSecurityRoutes(
  server: FastifyInstance,
  securityService: SecurityService,
) {
  server.get("/api/v1/security", async () => securityService.getSettings());
  server.put("/api/v1/security", async (request) => {
    const body = request.body as { requirePin?: unknown };
    if (typeof body.requirePin !== "boolean")
      return securityService.getSettings();
    return securityService.updateRequirePin(body.requirePin);
  });
  server.put("/api/v1/security/pin", async (request, reply) => {
    const body = request.body as { pin?: unknown };
    if (typeof body.pin !== "string")
      return reply
        .code(400)
        .send({ error: "PIN must contain exactly four digits." });
    try {
      return securityService.updatePin(body.pin);
    } catch (error) {
      return reply
        .code(400)
        .send({
          error: error instanceof Error ? error.message : "Invalid PIN.",
        });
    }
  });
}
