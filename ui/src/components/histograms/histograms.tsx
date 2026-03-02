type Props = {
  title: string;
  value: number;
  accent?: "red" | "yellow";
};

export default function AnalyticsCard({ title, value, accent }: Props) {
  const accentClass =
    accent === "red"
      ? "text-red-400"
      : accent === "yellow"
        ? "text-yellow-400"
        : "text-white";

  return (
    <div
      className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 transition-all
    hover:border-neutral-500
    hover:bg-neutral-800"
    >
      <p className="text-sm text-neutral-400">{title}</p>
      <h3 className={`mt-2 text-2xl font-semibold ${accentClass}`}>
        {value.toLocaleString()}
      </h3>
    </div>
  );
}

export function ChartContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function ChartPlaceholder() {
  return (
    <div className="h-75 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-500">
      Chart Coming Soon
    </div>
  );
}
