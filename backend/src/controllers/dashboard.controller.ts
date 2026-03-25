import type { Request, Response } from "express";
import { getDashboard } from "../services/dashboard.service.js";

export async function getDashboardController(_req: Request, res: Response) {
  try {
    const user = (_req as any).user;
    const data = await getDashboard(user.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Failed to fetch dashboard" });
  }
}
