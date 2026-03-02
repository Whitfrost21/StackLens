import type { Logrange, UiRange } from "../types/log";

interface Props {
  search: string;
  level: string;
  service: string;
  range: UiRange;
  start: string;
  end: string;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onRangechange: (value: Logrange) => void;
  onStartchange: (value: string) => void;
  onEndchange: (value: string) => void;
  israngeInvalid: boolean;
}
const LogFilters = ({
  search,
  level,
  service,
  range,
  start,
  end,
  onSearchChange,
  onLevelChange,
  onServiceChange,
  onRangechange,
  onStartchange,
  onEndchange,
  israngeInvalid,
}: Props) => {
  return (
    <div className="mb-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search logs..."
        className="w-full bg-zinc-800 px-4 py-2 rounded"
      />
      <select
        value={level}
        onChange={(e) => onLevelChange(e.target.value)}
        className="bg-zinc-800 px-4 py-2 mt-2 m-2 rounded"
      >
        <option value="">All Levels</option>
        <option value="debug">Debug</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>

      <input
        type="text"
        value={service}
        onChange={(e) => onServiceChange(e.target.value)}
        placeholder="Service..."
        className="bg-zinc-800 px-4 py-2 mt-2 rounded"
      />
      <select
        value={range}
        onChange={(e) => {
          onRangechange(e.target.value as Logrange);
        }}
        className="bg-zinc-800 border border-zinc-700 rounded px-3 m-2 py-2 text-sm"
      >
        <option value="all">All Time</option>
        <option value="1h">Last 1 Hour</option>
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
      </select>
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-xs text-zinc-400 mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => {
              onStartchange((e.target as HTMLInputElement).value);
            }}
            className="bg-zinc-800 px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-zinc-400 mb-1">End Time</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => {
              onEndchange((e.target as HTMLInputElement).value);
            }}
            className="bg-zinc-800 px-3 py-2 rounded"
          />
        </div>
        {israngeInvalid && (
          <p className="text-red-400 text-sm mt-2">
            Start time must be before end time
          </p>
        )}
      </div>
    </div>
  );
};

export default LogFilters;
