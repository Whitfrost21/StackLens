import { useQuery } from "@tanstack/react-query";
import { Fetchdashboard } from "../api/dashboard";

export function useDashboard(autorefresh: boolean) {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: Fetchdashboard,
    staleTime: 60_000,
    refetchInterval: autorefresh ? 30_000 : false,
  });
}
