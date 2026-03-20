import type { AnalyticsResponse, TimeRange } from "../types/analyzeModel";
import API from "./logs";

export async function fetchAnalytics(
  range: TimeRange,
): Promise<AnalyticsResponse> {
  const res = await API.get("/logs/analytics", {
    params: { range },
  });
  return res.data;
}
