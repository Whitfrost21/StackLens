import type { AnalyticsResponse, TimeRange } from "../types/analyzeModel";

export async function fetchAnalytics(
  range: TimeRange,
): Promise<AnalyticsResponse> {
  const res = await fetch(`api/v1/logs/analytics?range=${range}`);
  if (!res.ok) {
    throw Error("failed to fetch logs");
  }
  return res.json();
}
