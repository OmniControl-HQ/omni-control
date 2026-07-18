import { ServerSettings } from "../types";
import { serverConfig } from "../config";

const defaults: ServerSettings = {
  appearance: "dark-glass",
  startOnBoot: true,
  externalConnections: true,
  serverPort: serverConfig.port,
};

export class SettingsService {
  private settings: ServerSettings = { ...defaults };

  get(): ServerSettings {
    return this.settings;
  }

  update(input: Partial<ServerSettings>): ServerSettings {
    this.settings = {
      ...this.settings,
      appearance: "dark-glass",
      startOnBoot: typeof input.startOnBoot === "boolean" ? input.startOnBoot : this.settings.startOnBoot,
      externalConnections: typeof input.externalConnections === "boolean" ? input.externalConnections : this.settings.externalConnections,
    };
    return this.settings;
  }

  reset(): ServerSettings {
    this.settings = { ...defaults };
    return this.settings;
  }
}
