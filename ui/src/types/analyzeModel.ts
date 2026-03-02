export type TimeRange = "24h" | "7d" | "30d";

export interface AnalyticsResponse {
  meta: {
    range: TimeRange;
    from: string;
    to: string;
    bucket: "hour" | "day";
  };
  summary: {
    totalLogs: number;
    errorCount: number;
    warnCount: number;
    infoCount: number;
    debugCount: number;
    uniqueServices: number;
    errorRate: number;
  };
  levels: {
    level: "info" | "warn" | "error" | "debug";
    count: number;
  }[];
  timeseries: {
    timestamp: string;
    info: number;
    warn: number;
    error: number;
    debug: number;
  }[];
  services: {
    service: string;
    count: number;
  }[];
}
