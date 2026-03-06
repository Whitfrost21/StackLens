import type { Loglevel } from "./logs.models.js";

export type TimeBucket = "hour" | "day" | "month";
export type TimeRange = "24h" | "7d" | "30d" | "1y";

export interface AnalyticsMeta {
  range: TimeRange;
  from: string;
  to: string;
  bucket: TimeBucket;
}

export interface AnalyticsSummary {
  totalLogs: number;
  errorCount: number;
  warnCount: number;
  infoCount: number;
  debugCount: number;
  uniqueServices: number;
  errorRate: number;
}

export interface LevelCount {
  level: Loglevel;
  count: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  info: number;
  warn: number;
  error: number;
  debug: number;
}

export interface ServiceCount {
  service: string;
  count: number;
}

export interface AnalyticsResponse {
  meta: AnalyticsMeta;
  summary: AnalyticsSummary;
  levels: LevelCount[];
  timeseries: TimeSeriesPoint[];
  services: ServiceCount[];
}
