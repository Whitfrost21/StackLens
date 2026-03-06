import z from "zod";

export const analyticsQuerySchema = z.object({
  range: z.enum(["24h", "7d", "30d", "1y"]).default("30d"),
});
export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>;
