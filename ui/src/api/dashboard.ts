import type { DashboardResponse } from "../types/dashboardtypes";

export async function Fetchdashboard(): Promise<DashboardResponse> {
  const res = await fetch("/api/v1/dashboard");

  if (!res.ok) {
    throw Error("failed to fetch dashboard data");
  }
  return res.json();
}
