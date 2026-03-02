import { fetchlogs } from "../api/logs";
import type { LogsResponse } from "../types/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Logrange, UiRange } from "../types/log";

interface useLogparams {
  page: number;
  limit: number;
  level?: string;
  search?: string;
  service?: string;
  range?: UiRange;
  start?: string;
  end?: string;
}

export const useLogs = (
  { page, limit, level, service, search, range, start, end }: useLogparams,
  options?: Omit<
    UseQueryOptions<
      LogsResponse, // TQueryFnData
      Error, // TError
      LogsResponse, // TData
      readonly unknown[] // TQueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const apiRange: Logrange | undefined = range === "all" ? undefined : range;

  let apiStart: string | undefined;
  let apiEnd: string | undefined;

  if (start) {
    const parsed = new Date(start);
    if (!isNaN(parsed.getTime())) {
      apiStart = parsed.toISOString();
    }
  }

  if (end) {
    const parsed = new Date(end);
    if (!isNaN(parsed.getTime())) {
      apiEnd = parsed.toISOString();
    }
  }
  return useQuery<LogsResponse>({
    queryKey: ["logs", page, limit, level, service, search, range, start, end],
    queryFn: ({ signal }) =>
      fetchlogs(
        {
          page,
          limit,
          level,
          service,
          search,
          range: apiRange,
          start: apiStart,
          end: apiEnd,
        },
        signal,
      ),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30, // 30 seconds
    ...options, //this enables enabled
  });
};
