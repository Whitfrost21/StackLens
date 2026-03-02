export function SkeletonTable() {
  return (
    <div className="bg-zinc-800 rounded-xl border shadow-sm p-4">
      <div className="max-h-150 overflow-y-auto">
        <table className="w-full text-left table-fixed">
          <thead className="sticky top-0 bg-zinc-800 border-b border-zinc-700">
            <tr>
              <th className=" w-35 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Service
              </th>
              <th className="w-32 py-3 text-sm  font-semibold uppercase tracking-wide text-zinc-400">
                Level
              </th>
              <th className=" w-[45%] py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Message
              </th>
              <th className="w-50 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Timestamp
              </th>
            </tr>
          </thead>

          <tbody className="animate-pulse ">
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index} className="border-b border-zinc-700">
                <td className="py-2.5">
                  <div className="h-4 w-24 bg-zinc-700 rounded"></div>
                </td>
                <td className="py-2.5">
                  <div className="h-4 w-16 bg-zinc-700 rounded"></div>
                </td>
                <td className="py-2.5">
                  <div className="h-4 w-[80%]  bg-zinc-700 rounded"></div>
                </td>
                <td className="py-2.5">
                  <div className="h-4 w-32 bg-zinc-700 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-neutral-800 bg-neutral-900"
          />
        ))}
      </div>

      {/* Top Service */}
      <div className="h-28 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse" />

      {/* Recent Logs */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 ">
      {/* KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse"
          />
        ))}
      </div>

      {/* Line Chart */}
      <div className="h-80 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse" />

      {/* Bottom Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-72 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse" />
        <div className="h-72 rounded-xl border border-neutral-800 bg-neutral-900 animate-pulse" />
      </div>
    </div>
  );
}
