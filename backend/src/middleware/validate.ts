import type { Request, Response, NextFunction } from "express";
import type { ZodError } from "zod";

export const validate =
  (schema: any, source: "body" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = source === "body" ? req.body : req.query;

    const result = schema.safeParse(data);
    if (!result.success) {
      const formatted = (result.error as ZodError).issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Validation failed",
        details: formatted,
      });
    }

    (req as any).validated = result.data;

    next();
  };
