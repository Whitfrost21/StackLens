import type { TimeSeriesPoint } from "../models/analytics.js";

export function fillMissingBuckets(
  from: Date,
  to: Date,
  bucket: "hour" | "day" | "month",
  rows: any[],
): TimeSeriesPoint[] {
  const result: TimeSeriesPoint[] = [];
  const map = new Map<number, any>();

  for (const row of rows) {
    map.set(new Date(row.bucket).getTime(), row);
  }

  const current = new Date(from);

  if (bucket === "hour") {
    current.setMinutes(0, 0, 0);
  } else if (bucket === "day") {
    current.setHours(0, 0, 0, 0);
  } else if (bucket === "month") {
    // For month use the first day of the month at midnight
    current.setHours(0, 0, 0, 0);
    current.setDate(1);
  }

  while (current <= to) {
    const key = current.getTime();
    const found = map.get(key);

    result.push({
      timestamp: new Date(key).toISOString(),
      info: found ? found.info : 0,
      warn: found ? found.warn : 0,
      error: found ? found.error : 0,
      debug: found ? found.debug : 0,
    });

    if (bucket === "hour") {
      current.setHours(current.getHours() + 1);
    } else if (bucket === "month") {
      // next month (keeps day=1)
      const nextMonth = current.getMonth() + 1;
      current.setMonth(nextMonth);
      current.setDate(1); // ensure start of month
    } else {
      // default to day increment
      current.setDate(current.getDate() + 1);
    }
  }

  return result;
}
