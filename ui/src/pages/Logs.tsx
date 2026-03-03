import { useState } from "react";
import LogFilters from "../components/Logstructure/LogFilters";
import LogTable from "../components/Logstructure/LogTables";
import Pagination from "../components/Logstructure/Pagination";
import { useLogs } from "../hooks/useLogs";
import { useDebounce } from "../hooks/useDebounce";
import type { Logrange, UiRange } from "../types/log";
import PageHeader from "../components/ui/Pageheader";
import { Errorstate } from "../components/ui/Errorstate";
import { SkeletonTable } from "../components/ui/Skeletontable";

const Logs = () => {
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const [level, setlevel] = useState("");
  const [service, setservice] = useState("");
  const [range, setrange] = useState<UiRange>("all");
  const debouncedsearch = useDebounce(search, 400);
  const finalsearch =
    debouncedsearch.trim().length >= 2 ? debouncedsearch.trim() : undefined;
  const limit = 8;
  const apiRange = range === "all" ? undefined : range;
  const [start, setstart] = useState<string>("");
  const [end, setend] = useState<string>("");

  const parsedStart = start ? new Date(start) : undefined;
  const parsedEnd = end ? new Date(end) : undefined;

  const isStartValid = parsedStart && !isNaN(parsedStart.getTime());

  const isEndValid = parsedEnd && !isNaN(parsedEnd.getTime());

  const isRangeValid =
    isStartValid &&
    isEndValid &&
    parsedStart!.getTime() <= parsedEnd!.getTime();

  const shouldFetch = !start || !end ? true : new Date(start) <= new Date(end);
  const { data, isLoading, isFetching, error, refetch } = useLogs(
    {
      page,
      limit,
      search: finalsearch,
      level: level || undefined,
      service: service || undefined,
      range: apiRange,
      start: start,
      end: end,
    },
    { enabled: shouldFetch },
  );
  if (error) {
    <Errorstate onretry={refetch} />;
  }
  return (
    <div className="w-full">
      <PageHeader
        title="Logs"
        description="Search,filter and inspect service logs"
      />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <LogFilters
          search={search}
          level={level}
          service={service}
          range={range}
          start={start}
          end={end}
          onLevelChange={(value) => {
            setlevel(value);
            setpage(1);
          }}
          onSearchChange={(value) => {
            setsearch(value);
            setpage(1);
          }}
          onServiceChange={(value) => {
            setservice(value);
            setpage(1);
          }}
          onRangechange={(value) => {
            setrange(value as Logrange);
            setpage(1);
          }}
          onStartchange={(value) => {
            setstart(value);
            setrange("all");
            setpage(1);
          }}
          onEndchange={(value) => {
            setend(value);
            setrange("all");
            setpage(1);
          }}
          israngeInvalid={start != "" && end != "" && !isRangeValid}
        />
        {isLoading && <SkeletonTable />}
        {error && <p className="text-red-400">Failed to fetch logs</p>}

        {data && (
          <div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 shadow-sm min-w-0">
              <div className="overflow-x-auto">
                <LogTable logs={data.data} />
              </div>
            </div>
            <div className="flex justify-end">
              <Pagination
                currentPage={data.pagination.page}
                totalPages={data.pagination.totalpages}
                onPageChange={setpage}
              />
            </div>
          </div>
        )}
        {isFetching && !isLoading && (
          <p className="text-zinc-500 text-sm mt-2">Updating...</p>
        )}
      </div>
    </div>
  );
};

export default Logs;
