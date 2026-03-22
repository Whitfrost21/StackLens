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
      const user = (req as any).user;
      if (!validatedbody) {
        return res.status(400).json({ error: "Invalid request body" });
      }
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const log = await LogService.createlog({
        ...validatedbody,
        user_id: user.id,
      });
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
      if (!filters || filters.page < 1 || filters.limit < 1) {
        return res.status(400).json({ error: "Invalid pagination parameters" });
      }
      const user = (req as any).user;
      const { rows, total } = await LogService.getLogs({
        ...filters,
        userid: user.id,
      });
      const validLimit = Math.max(1, Math.min(filters.limit, 100));
      const totalpages = Math.ceil(total / validLimit);
      return res.json({
        filters: { level: filters.level, service: filters.service },
        user_id: user.id,
        pagination: {
          page: filters.page,
          limit: validLimit,
          offset: (filters.page - 1) * validLimit,
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
      const validated = (req as any).validated as AnalyticsQuery;
      if (!validated || !validated.range) {
        return res.status(400).json({ error: "Invalid analytics parameters" });
      }
      const user = (req as any).user;
      const data = await getAnalytics(pool, validated.range, user.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Analytics error:", error);
      return res.status(400).json({
        message: "Invalid analytics request",
      });
    }
  }
}
