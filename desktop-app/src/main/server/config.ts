const portFromEnvironment = Number(process.env.OMNICONTROL_PORT);

export const serverConfig = {
  host: process.env.OMNICONTROL_HOST ?? "0.0.0.0",
  port:
    Number.isInteger(portFromEnvironment) && portFromEnvironment > 0
      ? portFromEnvironment
      : 4321,
  protocolVersion: "v1",
} as const;
