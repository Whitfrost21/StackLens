import { useQuery } from "@tanstack/react-query";
import type { TimeRange } from "../types/analyzeModel";
import { fetchAnalytics } from "../api/analytics";

export function useAnalytics(range: TimeRange) {
  return useQuery({
    queryKey: ["analytics", range],
    queryFn: () => fetchAnalytics(range),
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
