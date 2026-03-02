export interface DashboardSummary {
  totalLogs24h: number;
  errorRate24h: number;
  warnCount24h: number;
  activeServices24h: number;
}

export interface DashboardTopService {
  service: string;
  count: number;
}

export interface DashboardRecentLog {
  id: string;
  service: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  topService: DashboardTopService | null;
  recentLogs: DashboardRecentLog[];
}
