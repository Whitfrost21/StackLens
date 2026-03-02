export type Loglevel = "info" | "warn" | "error" | "debug";

export type Logrange = "1h" | "24h" | "7d" | "30d";
export type UiRange = Logrange | "all";
export interface Log {
  id: string;
  service: string;
  level: Loglevel;
  message: string;
  metadata: unknown | null;
  timestamp: string;
  created_at: string;
}
