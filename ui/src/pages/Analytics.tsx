import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AnalyticsCard, {
  ChartContainer,
} from "../components/histograms/histograms";
import PageHeader from "../components/ui/Pageheader";
import CustomTooltip from "../components/histograms/Tooltip";
import { useEffect, useState } from "react";
import type { RawTimePoint, TimeRange } from "../types/analyzeModel";
import { useAnalytics } from "../hooks/useAnalytics";
import { Errorstate } from "../components/ui/Errorstate";
import { AnalyticsSkeleton } from "../components/ui/Skeletontable";
import { useUISettings } from "../hooks/useSettings";

// Raw data just for testing purpos
// const levelData = [
//   { level: "INFO", count: 11283, fill: "#3b82f6" },
//   { level: "WARN", count: 876, fill: "#eab308" },
//   { level: "ERROR", count: 324, fill: "#ef4444" },
// ];

// const timeSeriesMap = {
//   "24h": [
//     { time: "10:00", INFO: 80, WARN: 25, ERROR: 15, DEBUG: 10 },
//     { time: "11:00", INFO: 120, WARN: 40, ERROR: 20, DEBUG: 10 },
//     { time: "12:00", INFO: 95, WARN: 35, ERROR: 20, DEBUG: 10 },
//     { time: "13:00", INFO: 150, WARN: 50, ERROR: 20, DEBUG: 10 },
//     { time: "14:00", INFO: 130, WARN: 45, ERROR: 15, DEBUG: 10 },
//   ],
//   "7d": [
//     { time: "Mon", INFO: 800, WARN: 250, ERROR: 150, DEBUG: 100 },
//     { time: "Tue", INFO: 920, WARN: 300, ERROR: 180, DEBUG: 110 },
//     { time: "Wed", INFO: 880, WARN: 260, ERROR: 140, DEBUG: 95 },
//     { time: "Thu", INFO: 1050, WARN: 320, ERROR: 200, DEBUG: 120 },
//     { time: "Fri", INFO: 990, WARN: 280, ERROR: 170, DEBUG: 105 },
//   ],
//   "30d": [
//     { time: "Week 1", INFO: 5400, WARN: 1600, ERROR: 900, DEBUG: 600 },
//     { time: "Week 2", INFO: 5800, WARN: 1750, ERROR: 950, DEBUG: 650 },
//     { time: "Week 3", INFO: 6100, WARN: 1800, ERROR: 980, DEBUG: 700 },
//     { time: "Week 4", INFO: 5900, WARN: 1700, ERROR: 920, DEBUG: 680 },
//   ],
// } as const;

// const serviceData = [
//   { service: "auth-service", count: 4200 },
//   { service: "payment-service", count: 3100 },
//   { service: "notification-service", count: 2400 },
//   { service: "order-service", count: 1800 },
//   { service: "analytics-service", count: 1200 },
// ];
// const sortedServiceData = [...serviceData].sort((a, b) => b.count - a.count);
//

const level_colors: Record<string, string> = {
  info: "#3b82f6",
  warn: "#eab308",
  error: "#ef4444",
  debug: "#8b5cf6",
};

function formatXAxis(timestamp: string, range: TimeRange) {
  const date = new Date(timestamp);

  if (range === "24h") {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export default function Analytics() {
  const { defaultRange } = useUISettings();

  const [range, setRange] = useState<TimeRange>(defaultRange);
  const { data, isLoading, isError, refetch } = useAnalytics(range);
  const [visibleLevels, setVisibleLevels] = useState({
    info: true,
    warn: true,
    error: true,
    debug: true,
  });
  // const timeSeriesData = timeSeriesMap[timeRange];
  const toggleLevel = (level: keyof typeof visibleLevels) => {
    setVisibleLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  useEffect(() => {
    setRange(defaultRange);
  }, [defaultRange]);

  if (isLoading) return <AnalyticsSkeleton />;
  if (isError) return <Errorstate onretry={refetch} />;
  if (!data) return null;
  const summary = data?.summary;
  const levels = data?.levels ?? [];
  const rawTimeseries = data?.timeseries ?? [];

  const normalizedTimeseries = (rawTimeseries ?? []).map(
    (pt: RawTimePoint) => ({
      timestamp: pt.timestamp,
      info: Number(pt.info ?? 0),
      warn: Number(pt.warn ?? 0),
      error: Number(pt.error ?? 0),
      debug: Number(pt.debug ?? 0),
    }),
  );
  const services = data?.services ?? [];

  //for debugging safe to remove later
  console.log("raw timeseries:", rawTimeseries);
  console.log("normalized timeseries:", normalizedTimeseries);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Log metrics and trend analysis"
      />
      {/* Time Range Selector */}
      <div className="flex items-center gap-3">
        {(["24h", "7d", "30d", "1y"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
              r === range
                ? "border-blue-500 bg-blue-500/20 text-blue-400"
                : "border-neutral-800 bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard title="Total Logs" value={summary?.totalLogs} />
        <AnalyticsCard
          title="Error Rate"
          value={summary.errorRate}
          accent="red"
        />
        <AnalyticsCard
          title="Warnings"
          value={summary.warnCount}
          accent="yellow"
        />
        <AnalyticsCard title="Active Services" value={summary.uniqueServices} />
      </div>
      <div className="flex gap-4 mb-4">
        {(["info", "warn", "error", "debug"] as const).map((level) => {
          const colors = {
            info: "bg-blue-500",
            warn: "bg-yellow-500",
            error: "bg-red-500",
            debug: "bg-violet-400",
          };

          return (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={`flex items-center gap-2 text-sm cursor-pointer transition-opacity ${
                visibleLevels[level] ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className={`h-3 w-3 rounded-full ${colors[level]}`} />
              {level}
            </button>
          );
        })}
      </div>
      {/*//logs graph line*/}
      <ChartContainer title="Logs Over Time (By Level)">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedTimeseries}>
              <CartesianGrid
                stroke="#27272a"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="timestamp"
                stroke="#ffffff"
                tick={{ fill: "#ffffff", fontSize: 12 }}
                tickFormatter={(value) => formatXAxis(value, range)}
              />

              <YAxis
                stroke="#ffffff"
                tick={{ fill: "#ffffff", fontSize: 12 }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="info"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                strokeOpacity={visibleLevels.info ? 1 : 0.2}
                className="cursor-pointer"
              />

              <Line
                type="monotone"
                dataKey="warn"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                strokeOpacity={visibleLevels.warn ? 1 : 0.2}
                className="cursor-pointer"
              />

              <Line
                type="monotone"
                dataKey="error"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                strokeOpacity={visibleLevels.error ? 1 : 0.2}
                className="cursor-pointer"
              />
              {/* active count in future to hide unwanted lines */}
              <Line
                type="monotone"
                dataKey="debug"
                stroke="#8989ff"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                strokeOpacity={visibleLevels.debug ? 1 : 0.2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>
      {/*//logs levelwise*/}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer title="Log Level Distribution">
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levels}>
                <CartesianGrid strokeDasharray="3 3 " stroke="#27272a" />
                <XAxis
                  dataKey="level"
                  stroke="#a1a1aa"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#a1a1aa" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#a1a1aa" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {levels.map((entry, index) => (
                    // oh when am i going to find Cell repalcement
                    <Cell
                      key={`cell-${index}`}
                      fill={level_colors[entry.level]}
                    />
                  ))}
                </Bar>
                //fill="#3b82f6"
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
        {/*//top services*/}
        <ChartContainer title="Top Services">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={services} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  stroke="#ffffff"
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                />

                <YAxis
                  type="category"
                  dataKey="service"
                  stroke="#ffffff"
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                  width={150}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#a1a1aa" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />

                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
