import type { Request, Response } from "express";
import { LogService } from "../services/log.service.js";
import { type AnalyticsQuery } from "../schema/analytics.schema.js";
import { getAnalytics } from "../analytics/logs.analytics.js";
import { pool } from "../config/db.js";

//logcontroller to update log status
export class LogController {
  //post
  static async create(req: Request, res: Response) {
    try {
      const validatedbody = (req as any).validated;
      const log = await LogService.createlog(validatedbody);
      res.status(201).json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to create log" });
    }
  }
  //get
  static async getAll(req: Request, res: Response) {
    try {
      const filters = (req as any).validated;
      const { rows, total } = await LogService.getLogs(filters);
      const totalpages = Math.ceil(total / filters.limit);
      return res.json({
        filters: { level: filters.level, service: filters.service },
        pagination: {
          page: filters.page,
          limit: filters.limit,
          offset: (filters.page - 1) * filters.limit,
          total,
          totalpages,
        },
        data: rows,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "failed to fetch logs" });
    }
  }

  static async getLogsAnalytics(req: Request, res: Response) {
    try {
      const { range } = (req as any).validated as AnalyticsQuery;
      const data = await getAnalytics(pool, range);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Analytics error:", error);
      return res.status(400).json({
        message: "Invalid analytics request",
      });
    }
  }
}
