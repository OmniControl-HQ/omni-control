// PC Discovery Service - Scans local network for OmniControl server

const DEFAULT_PORT = 4321;
const SCAN_TIMEOUT = 2000; // 2 seconds per IP

interface DiscoveryResult {
  ip: string;
  port: number;
  serverName: string;
}

/**
 * Discovers OmniControl server on local network
 * Scans common local IP ranges (192.168.x.x, 10.0.x.x)
 */
export class DiscoveryService {
  
  /**
   * Check if a server is running at given IP
   */
  private static async checkServer(ip: string, port: number = DEFAULT_PORT): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), SCAN_TIMEOUT);
      
      const response = await fetch(`http://${ip}:${port}/health`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return data.protocol === "v1"; // Check if it's OmniControl server
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get device's local IP to determine subnet
   */
  private static async getLocalSubnet(): Promise<string | null> {
    try {
      // Try to get local IP by connecting to a dummy address
      // This is a workaround since React Native doesn't expose network interfaces
      const response = await fetch('https://api.ipify.org?format=json');
      // For local network, we'll scan 192.168.x.x as default
      return '192.168';
    } catch {
      return '192.168'; // Default to most common subnet
    }
  }

  /**
   * Discover OmniControl server on local network
   * Returns first found server
   */
  static async discover(): Promise<DiscoveryResult | null> {
    console.log('[Discovery] Starting server discovery...');
    
    const subnet = await this.getLocalSubnet();
    console.log('[Discovery] Scanning subnet:', subnet);

    // Scan 192.168.0.x and 192.168.1.x (most common)
    const subnetsToScan = [
      `${subnet}.0`,
      `${subnet}.1`,
    ];

    for (const base of subnetsToScan) {
      // Scan common host ranges (skip .0, .1, .255)
      const hostsToCheck = [
        100, 101, 102, 103, 104, 105, // Common DHCP range
        2, 3, 4, 5, 10, 11, 12, 20, 50, // Common static IPs
      ];

      for (const host of hostsToCheck) {
        const ip = `${base}.${host}`;
        console.log('[Discovery] Checking:', ip);
        
        const isServer = await this.checkServer(ip);
        if (isServer) {
          console.log('[Discovery] Server found at:', ip);
          return {
            ip,
            port: DEFAULT_PORT,
            serverName: 'OmniControl',
          };
        }
      }
    }

    console.log('[Discovery] No server found');
    return null;
  }

  /**
   * Verify if saved IP still has server
   */
  static async verifyServer(ip: string, port: number = DEFAULT_PORT): Promise<boolean> {
    console.log('[Discovery] Verifying server at:', ip);
    return this.checkServer(ip, port);
  }
}
