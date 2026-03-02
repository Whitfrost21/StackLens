import { useUISettings } from "../hooks/useSettings";

export default function Settings() {
  const { defaultRange, setDefaultRange, autoRefresh, setAutoRefresh } =
    useUISettings();

  return (
    <div className="space-y-6">
      {/* Header */}

      <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="text-sm font-semibold text-neutral-400">General</h2>

        <div className="mt-6 space-y-6">
          {/* Default Time Range */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Default Dashboard Time Range
              </p>
              <p className="text-xs text-neutral-500">
                Set the default time range when opening logs or analytics
              </p>
            </div>

            <select
              value={defaultRange}
              onChange={(e) =>
                setDefaultRange(e.target.value as "24h" | "7d" | "30d")
              }
              className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
          </div>

          {/* Default Auto Refresh */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Enable Auto Refresh by Default
              </p>
              <p className="text-xs text-neutral-500">
                Automatically refresh dashboard on load
              </p>
            </div>

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
        </div>
      </section>
    </div>
  );
}
