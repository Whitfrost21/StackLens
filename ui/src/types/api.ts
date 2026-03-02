import type { Log } from "./log";

export interface Pagination {
  page: number;
  limit: number;
  offset: number;
  total: number;
  totalpages: number;
}

export interface LogsResponse {
  filters: Record<string, unknown>;
  pagination: Pagination;
  data: Log[];
}
