import { ActivityLog } from "../types";

export class ActivityLogService {
  private readonly entries: ActivityLog[] = [];

  record(entry: Omit<ActivityLog, "id" | "timestamp">): ActivityLog {
    const activity: ActivityLog = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    this.entries.unshift(activity);
    if (this.entries.length > 250) this.entries.pop();
    return activity;
  }

  list(): ActivityLog[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries.length = 0;
  }
}
