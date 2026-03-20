import type { Request, Response, NextFunction } from "express";
import { supabase } from "../libs/supabase.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    (req as any).user = data.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Auth middleware error" });
  }
};
