import z from "zod";

export const logQuerySchema = z.object({
  level: z.enum(["info", "warn", "error", "debug"]).optional(),
  service: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(20),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  range: z.enum(["1h", "24h", "7d", "30d"]).optional(),
});

export type Logquery = z.infer<typeof logQuerySchema>;
