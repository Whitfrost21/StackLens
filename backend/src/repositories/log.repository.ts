import { pool } from "../config/db.js";
import type { CreateLogDTO, GetLogsDTO } from "../models/logs.models.js";

//fetch logs from db
export class LogRepository {
  static async create(log: CreateLogDTO) {
    const query = `INSERT INTO logs(service,level,message,metadata,timestamp)
      VALUES($1,$2,$3,$4::jsonb,$5)
      RETURNING *;`;

    const values = [
      log.service,
      log.level,
      log.message,
      log.metadata || null,
      log.timestamp,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters: GetLogsDTO) {
    const { level, service, search, page, limit, start, end, range } = filters;

    // Validate pagination parameters
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 100));

    const values: any[] = [];
    const conditions: string[] = [];
    let index = 1;
    let effectivestart: Date | undefined;
    if (start) {
      effectivestart = start;
    } else if (range) {
      const now = new Date();
      type LogRange = "1h" | "24h" | "7d" | "30d";
      const rangeMap: Record<LogRange, number> = {
        "1h": 60 * 60 * 1000,
        "24h": 24 * 60 * 60 * 1000,
        "7d": 7 * 24 * 60 * 60 * 1000,
        "30d": 30 * 24 * 60 * 60 * 1000,
      };
      effectivestart = new Date(now.getTime() - rangeMap[range]);
    }
    if (level) {
      conditions.push(`level=$${index++}`);
      values.push(level);
    }
    if (service) {
      conditions.push(`service=$${index++}`);
      values.push(service);
    }
    if (search) {
      conditions.push(`message ILIKE $${index++}`);
      values.push(`%${search}%`);
    }
    if (effectivestart) {
      conditions.push(`timestamp >= $${index++}`);
      values.push(effectivestart);
    }
    if (end) {
      conditions.push(`timestamp <= $${index++}`);
      values.push(end);
    }
    const whereclause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const offset = (validPage - 1) * validLimit;
    const dataquery = `SELECT * FROM LOGS ${whereclause} ORDER BY timestamp DESC LIMIT $${index++} OFFSET $${index};`;
    const datavalues = [...values, validLimit, offset];
    console.log("Query:", dataquery);
    console.log("Values:", datavalues);
    const dataresult = await pool.query(dataquery, datavalues);

    const countquery = `SELECT COUNT(*) as total FROM logs ${whereclause};`;
    const countresult = await pool.query(countquery, values);
    const total = countresult.rows[0] ? Number(countresult.rows[0].total) : 0;
    return {
      rows: dataresult.rows,
      total,
    };
  }
}
