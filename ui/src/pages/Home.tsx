import { useNavigate } from "react-router-dom";
import AnalyticsCard from "../components/histograms/histograms";
import { Errorstate } from "../components/ui/Errorstate";
import LevelBadge from "../components/ui/Levelbadge";
import PageHeader from "../components/ui/Pageheader";
import { useDashboard } from "../hooks/useDashboard";
import { useEffect, useRef } from "react";
import { DashboardSkeleton } from "../components/ui/Skeletontable";
import { useUISettings } from "../hooks/useSettings";
import type { Log } from "../types/log";

export default function Dashboard() {
  const { autoRefresh, setAutoRefresh } = useUISettings();

  const { data, isLoading, isError, refetch } = useDashboard(autoRefresh);
  const navigate = useNavigate();
  const previous = useRef<number | null>(null);

  useEffect(() => {
    if (data) {
      previous.current = data.summary.errorRate24h;
    }
  }, [data]);

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <Errorstate onretry={refetch} />;
  if (!data) return null;

  const { summary, topService, recentLogs } = data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="System overview and recent activity"
      />
      <div className=" flex w-xs items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3">
        <span className="text-sm text-neutral-400">Auto refresh (30s)</span>
        <span className="text-xs text-neutral-500">
          {autoRefresh ? "On" : "Off"}
        </span>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            autoRefresh ? "bg-blue-600" : "bg-neutral-700"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              autoRefresh ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard title="Logs (24h)" value={summary.totalLogs24h} />
        <AnalyticsCard
          title="Error Rate (24h)"
          value={summary.errorRate24h}
          accent="red"
        />
        <AnalyticsCard
          title="Warnings (24h)"
          value={summary.warnCount24h}
          accent="yellow"
        />
        <AnalyticsCard
          title="Active Services (24h)"
          value={summary.activeServices24h}
        />
      </div>

      {/* Top Service */}
      <div className="rounded-xl border border-blue-500/30 bg-neutral-900 p-6 ">
        <h3 className="text-sm font-semibold text-neutral-400">
          Top Service (24h)
        </h3>

        {topService ? (
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-2xl font-semibold text-white">
                {topService.service}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {topService.count} {topService.count === 1 ? "log" : "logs"}
              </p>
            </div>

            <div className="text-xs uppercase tracking-wide text-blue-400">
              Most Active
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-500">No logs in last 24h</p>
        )}
      </div>

      {/* Recent Logs */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900">
        <div className="border-b border-neutral-800 p-4">
          <h3 className="text-sm font-semibold text-neutral-400">
            Recent Logs
          </h3>
        </div>
        <div className="divide-y-2 p-4">
          {recentLogs.map((log: Log) => (
            <div
              key={log.id}
              onClick={() => navigate(`/logs?selected=${log.id}`)}
              className="
                flex items-center justify-between
                rounded-lg
                border border-transparent
                px-4 py-3
                cursor-pointer
                transition-all
                hover:border-neutral-500
                hover:bg-neutral-800
              "
            >
              <div className="flex items-center gap-4 min-w-0">
                <LevelBadge level={log.level} />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-white">{log.service}</span>
                  <span className="text-neutral-400 truncate max-w-xl">
                    {log.message}
                  </span>
                </div>
              </div>

              <span className="text-sm text-neutral-500 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
