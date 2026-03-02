import type { Log } from "./log";

export interface DashboardResponse {
  summary: {
    totalLogs24h: number;
    errorRate24h: number;
    warnCount24h: number;
    activeServices24h: number;
  };
  topService: {
    service: string;
    count: number;
  } | null;
  recentLogs: Log[];
}
