import z from "zod";

export const logSchema = z.object({
  service: z
    .string()
    .min(2, "Service name must be atleast 2 characters")
    .trim(),
  level: z.enum(["info", "warn", "error", "debug"]),
  message: z.string().min(1, "Message cannot be empty"),
  metadata: z.record(z.string(), z.any()).optional(),
  timestamp: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid ISO timestamp")
    .optional()
    .transform((val) => val ?? new Date().toISOString()),
});
