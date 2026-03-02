type LogLevel = "info" | "warn" | "error" | "debug";

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: "bg-blue-500/20 text-blue-400",
  warn: "bg-yellow-500/20 text-yellow-400",
  error: "bg-red-500/20 text-red-400",
  debug: "bg-violet-500/20 text-violet-400",
};

export default function LevelBadge({ level }: { level: LogLevel }) {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium uppercase ${LEVEL_STYLES[level]}`}
    >
      {level}
    </span>
  );
}
