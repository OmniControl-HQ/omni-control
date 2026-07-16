export const keyToPath: Record<string, string> = {
  overview: "/",
  devices: "/devices",
  security: "/security",
  logs: "/logs",
  settings: "/settings",
};

export function getActiveKeyFromPathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized === "/") return "overview";
  if (normalized === "/devices") return "devices";
  if (normalized === "/security") return "security";
  if (normalized === "/logs") return "logs";
  if (normalized === "/settings") return "settings";

  return "overview";
}
