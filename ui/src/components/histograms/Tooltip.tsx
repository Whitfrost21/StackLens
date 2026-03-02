type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    name?: string;
    value?: number;
  }[];
  label?: string;
};

export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const levelColors: Record<string, string> = {
    info: "#3b82f6",
    warn: "#eab308",
    error: "#ef4444",
    debug: "#8989ff",
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 shadow-lg">
      <p className="mb-2 text-xs text-neutral-400">{label}</p>

      {payload.map((entry) => {
        const level = entry.name ?? "";
        const color = levelColors[level] ?? "#ffffff";

        return (
          <div key={level} className="flex justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span style={{ color }}>{level}</span>
            </div>

            <span style={{ color }}>{entry.value}</span>
          </div>
        );
      })}
    </div>
  );
}
