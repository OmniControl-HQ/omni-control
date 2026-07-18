import { SecuritySettings } from "../types";

export class SecurityService {
  private pin = "4812";
  private requirePin = true;

  getSettings(): SecuritySettings {
    return { requirePin: this.requirePin, pinConfigured: this.pin.length === 4 };
  }

  getPin(): string {
    return this.pin;
  }

  updateRequirePin(requirePin: boolean): SecuritySettings {
    this.requirePin = requirePin;
    return this.getSettings();
  }

  updatePin(pin: string): SecuritySettings {
    if (!/^\d{4}$/.test(pin)) throw new Error("PIN must contain exactly four digits.");
    this.pin = pin;
    return this.getSettings();
  }
}
