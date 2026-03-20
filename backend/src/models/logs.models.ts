export type Loglevel = "info" | "error" | "warn" | "debug";

export interface CreateLogDTO {
  service: string;
  level: Loglevel;
  message: string;
  metadata?: Record<string, any>;
  timestamp: string;
  userid: string;
}

export type GetLogsDTO = {
  level?: "info" | "warn" | "error" | "debug";
  service?: string;
  search?: string;
  page: number;
  limit: number;
  start?: Date;
  end?: Date;
  range?: "1h" | "24h" | "7d" | "30d";
  userid: string;
};
