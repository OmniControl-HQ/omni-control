import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SERVER_IP: '@omnicontrol:server_ip',
  SERVER_PORT: '@omnicontrol:server_port',
  SERVER_PIN: '@omnicontrol:server_pin',
  AUTO_CONNECT: '@omnicontrol:auto_connect',
};

export interface ServerConfig {
  ip: string;
  port: number;
  pin: string;
  autoConnect: boolean;
}

export class StorageService {
  
  /**
   * Save server configuration
   */
  static async saveServerConfig(config: ServerConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SERVER_IP, config.ip);
      await AsyncStorage.setItem(KEYS.SERVER_PORT, config.port.toString());
      await AsyncStorage.setItem(KEYS.SERVER_PIN, config.pin);
      await AsyncStorage.setItem(KEYS.AUTO_CONNECT, config.autoConnect.toString());
      console.log('[Storage] Server config saved:', config);
    } catch (error) {
      console.error('[Storage] Failed to save config:', error);
    }
  }

  /**
   * Load server configuration
   */
  static async loadServerConfig(): Promise<ServerConfig | null> {
    try {
      const ip = await AsyncStorage.getItem(KEYS.SERVER_IP);
      const port = await AsyncStorage.getItem(KEYS.SERVER_PORT);
      const pin = await AsyncStorage.getItem(KEYS.SERVER_PIN);
      const autoConnect = await AsyncStorage.getItem(KEYS.AUTO_CONNECT);

      if (ip && port && pin) {
        const config = {
          ip,
          port: parseInt(port, 10),
          pin,
          autoConnect: autoConnect === 'true',
        };
        console.log('[Storage] Server config loaded:', config);
        return config;
      }

      return null;
    } catch (error) {
      console.error('[Storage] Failed to load config:', error);
      return null;
    }
  }

  /**
   * Clear server configuration
   */
  static async clearServerConfig(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.SERVER_IP);
      await AsyncStorage.removeItem(KEYS.SERVER_PORT);
      await AsyncStorage.removeItem(KEYS.SERVER_PIN);
      await AsyncStorage.removeItem(KEYS.AUTO_CONNECT);
      console.log('[Storage] Server config cleared');
    } catch (error) {
      console.error('[Storage] Failed to clear config:', error);
    }
  }
}
