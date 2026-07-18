import Fastify from "fastify";
import { Server } from "socket.io";
import { serverConfig } from "./config";
import { registerDashboardRoutes } from "./routes/dashboard";
import { registerDeviceRoutes } from "./routes/devices";
import { registerHealthRoutes } from "./routes/health";
import { registerLogRoutes } from "./routes/logs";
import { registerSecurityRoutes } from "./routes/security";
import { registerServerRoutes } from "./routes/server";
import { registerSettingsRoutes } from "./routes/settings";
import { ActivityLogService } from "./services/activity-log-service";
import { ControlService } from "./services/control-service";
import { DeviceRegistry } from "./services/device-registry";
import { DashboardService } from "./services/dashboard-service";
import { SecurityService } from "./services/security-service";
import { SettingsService } from "./services/settings-service";
import { registerSocketGateway } from "./socket/register-gateway";

export function createControlServer() {
  const server = Fastify({ logger: true });
  const io = new Server(server.server, {
    cors: { origin: false },
  });
  const deviceRegistry = new DeviceRegistry();
  const dashboardService = new DashboardService(deviceRegistry);
  const settingsService = new SettingsService();
  const securityService = new SecurityService();
  const activityLogService = new ActivityLogService();
  const controlService = new ControlService();

  server.register(registerHealthRoutes);
  server.register(registerServerRoutes, deviceRegistry);
  server.register(registerDeviceRoutes, deviceRegistry);
  server.register(registerDashboardRoutes, dashboardService);
  server.register(registerSettingsRoutes, settingsService);
  server.register(registerSecurityRoutes, securityService);
  server.register(registerLogRoutes, activityLogService);
  registerSocketGateway(io, deviceRegistry, activityLogService, securityService, controlService);

  return {
    async start() {
      await server.listen({ host: serverConfig.host, port: serverConfig.port });
      activityLogService.record({ level: "info", category: "server", message: "Server started." });
      server.log.info(`OmniControl server listening on ${serverConfig.host}:${serverConfig.port}`);
    },
    async stop() {
      await io.close();
      await server.close();
    },
    getDashboardSnapshot() {
      return dashboardService.getSnapshot();
    },
    getDevices() {
      return deviceRegistry.list();
    },
    removeDevice(id: string) {
      deviceRegistry.remove(id);
    },
    getSettings() {
      return settingsService.get();
    },
    updateSettings(settings: Parameters<SettingsService["update"]>[0]) {
      return settingsService.update(settings);
    },
    resetSettings() {
      return settingsService.reset();
    },
    getSecurity() {
      return { ...securityService.getSettings(), pin: securityService.getPin() };
    },
    updateRequirePin(requirePin: boolean) {
      return securityService.updateRequirePin(requirePin);
    },
    updatePin(pin: string) {
      return securityService.updatePin(pin);
    },
    getLogs() {
      return activityLogService.list();
    },
    clearLogs() {
      activityLogService.clear();
    },
  };
}
