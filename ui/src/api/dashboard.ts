import type { DashboardResponse } from "../types/dashboardtypes";

export async function Fetchdashboard(): Promise<DashboardResponse> {
  //api/v1/dashboard
  const res = await fetch(import.meta.env.VITE_API_URL + "/dashboard");

  if (!res.ok) {
    throw Error("failed to fetch dashboard data");
  }
  return res.json();
}
