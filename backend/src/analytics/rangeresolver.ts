import type { TimeBucket, TimeRange } from "../models/analytics.js";

export function Resolverange(range: TimeRange): {
  from: Date;
  to: Date;
  bucket: TimeBucket;
} {
  const now = new Date();
  switch (range) {
    case "24h":
      return {
        from: new Date(now.getTime() - 7 * 60 * 60 * 1000),
        to: now,
        bucket: "hour",
      };

    case "7d":
      return {
        from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        to: now,
        bucket: "day",
      };

    case "30d":
      return {
        from: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        to: now,
        bucket: "day",
      };

    default:
      throw new Error("invalid range");
  }
}
