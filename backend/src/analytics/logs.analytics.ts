import { Pool } from "pg";
import type {
  AnalyticsResponse,
  LevelCount,
  TimeRange,
} from "../models/analytics.js";
import { Resolverange } from "./rangeresolver.js";
import { fillMissingBuckets } from "./fillmissingbuckets.js";
import type { Loglevel } from "../models/logs.models.js";

export async function getAnalytics(
  pool: Pool,
  range: TimeRange,
): Promise<AnalyticsResponse> {
  const client = await pool.connect();
  try {
    const { from, to, bucket } = Resolverange(range);

    const summaryresult = await client.query(
      `
      SELECT
      COUNT(*)::int AS total_logs,
      COUNT(*) FILTER  (WHERE level='error')::int AS error_count,
      COUNT(*) FILTER (WHERE level = 'warn')::int AS warn_count,
      COUNT(*) FILTER (WHERE level = 'info')::int AS info_count,
      COUNT(*) FILTER (WHERE level = 'debug')::int AS debug_count,
      COUNT(DISTINCT service)::int AS unique_services
      FROM logs WHERE timestamp BETWEEN $1 AND $2;`,
      [from, to],
    );
    const summaryRow = summaryresult.rows[0];

    const totalLogs = summaryRow.total_logs;
    const errorCount = summaryRow.error_count;
    const warnCount = summaryRow.warn_count;
    const infoCount = summaryRow.info_count;
    const debugCount = summaryRow.debug_count;
    const uniqueServices = summaryRow.unique_services;
    const errorRate =
      totalLogs > 0 ? Number(((errorCount / totalLogs) * 100).toFixed(2)) : 0;

    const levelsResult = await client.query(
      `
         SELECT level, COUNT(*)::int AS count
         FROM logs
         WHERE timestamp BETWEEN $1 AND $2
         GROUP BY level;
         `,
      [from, to],
    );
    const allowedLevels: Loglevel[] = ["info", "warn", "error", "debug"];

    const levels: LevelCount[] = allowedLevels.map((lvl) => {
      const found = levelsResult.rows.find((r) => r.level === lvl);
      return {
        level: lvl,
        count: found?.count ?? 0,
      };
    });

    const servicesResult = await client.query(
      `
         SELECT service, COUNT(*)::int AS count
         FROM logs
         WHERE timestamp BETWEEN $1 AND $2
         GROUP BY service
         ORDER BY count DESC
         LIMIT 5;
         `,
      [from, to],
    );

    const services = servicesResult.rows;

    const timeseriesResult = await client.query(
      `
         SELECT
           date_trunc($3, timestamp) AS bucket,
           COUNT(*) FILTER (WHERE level = 'info')::int AS info,
           COUNT(*) FILTER (WHERE level = 'warn')::int AS warn,
           COUNT(*) FILTER (WHERE level = 'error')::int AS error,
           COUNT(*) FILTER (WHERE level = 'debug')::int AS debug
         FROM logs
         WHERE timestamp BETWEEN $1 AND $2
         GROUP BY bucket
         ORDER BY bucket ASC;
         `,
      [from, to, bucket],
    );

    const timeseries = fillMissingBuckets(
      from,
      to,
      bucket,
      timeseriesResult.rows,
    );
    console.log("FROM:", from);
    console.log("TO:", to);
    return {
      meta: {
        range: range,
        from: from.toISOString(),
        to: to.toISOString(),
        bucket: bucket,
      },
      summary: {
        totalLogs,
        errorCount,
        warnCount,
        infoCount,
        debugCount,
        uniqueServices,
        errorRate,
      },
      levels,
      services,
      timeseries,
    };
  } finally {
    client.release();
  }
}
