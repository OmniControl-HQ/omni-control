export type NavItem = {
  key: string;
  label: string;
  icon: string;
};

export type Device = {
  id: string;
  name: string;
  role: string;
  ip: string;
  icon: string;
  latencyMs?: number;
  latencyTone: "good" | "warn" | "bad";
};
