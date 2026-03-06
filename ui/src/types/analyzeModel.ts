export type TimeRange = "24h" | "7d" | "30d" | "1y";

export type RawTimePoint = {
  timestamp?: string;
  info?: number | string | null;
  warn?: number | string | null;
  error?: number | string | null;
  debug?: number | string | null;
};
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
