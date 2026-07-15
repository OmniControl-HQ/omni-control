import { ClassValue } from "../types/ui";

function cx(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

export { cx };
