import type { TimeSeriesPoint } from "../models/analytics.js";

export function fillMissingBuckets(
  from: Date,
  to: Date,
  bucket: "hour" | "day",
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
  }

  if (bucket === "day") {
    current.setHours(0, 0, 0, 0);
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
    } else {
      current.setDate(current.getDate() + 1);
    }
  }

  return result;
}
