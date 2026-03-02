import { pool } from "../config/db.js";
import type { DashboardResponse } from "../models/dashboard.js";

export async function getDashboard(): Promise<DashboardResponse> {
  const client = await pool.connect();

  try {
    const now = new Date();
    const from = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const summaryResult = await client.query(
      `
      SELECT
        COUNT(*)::int AS total_logs,
        COUNT(*) FILTER (WHERE level = 'error')::int AS error_count,
        COUNT(*) FILTER (WHERE level = 'warn')::int AS warn_count,
        COUNT(DISTINCT service)::int AS active_services
      FROM logs
      WHERE timestamp BETWEEN $1 AND $2;
      `,
      [from, now],
    );

    const row = summaryResult.rows[0];

    const totalLogs = row.total_logs;
    const errorCount = row.error_count;
    const warnCount = row.warn_count;
    const activeServices = row.active_services;

    const errorRate =
      totalLogs > 0 ? Number(((errorCount / totalLogs) * 100).toFixed(2)) : 0;

    const topServiceResult = await client.query(
      `
      SELECT service, COUNT(*)::int AS count
      FROM logs
      WHERE timestamp BETWEEN $1 AND $2
      GROUP BY service
      ORDER BY count DESC
      LIMIT 1;
      `,
      [from, now],
    );

    const topService =
      topServiceResult.rows.length > 0 ? topServiceResult.rows[0] : null;

    const recentLogsResult = await client.query(
      `
      SELECT id, service, level, message, timestamp
      FROM logs
      ORDER BY timestamp DESC
      LIMIT 5;
      `,
    );

    return {
      summary: {
        totalLogs24h: totalLogs,
        errorRate24h: errorRate,
        warnCount24h: warnCount,
        activeServices24h: activeServices,
      },
      topService,
      recentLogs: recentLogsResult.rows.map((log) => ({
        ...log,
        timestamp: new Date(log.timestamp).toISOString(),
      })),
    };
  } finally {
    client.release();
  }
}
