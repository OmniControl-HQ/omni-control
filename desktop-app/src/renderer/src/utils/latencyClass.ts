import { Device } from "../types/global";

function latencyClass(tone: Device["latencyTone"]) {
  if (tone === "good") return "text-emerald-400";
  if (tone === "warn") return "text-amber-400";
  return "text-[#ffb4ab]";
}

export { latencyClass };
