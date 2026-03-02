import { Router } from "express";
import { LogController } from "../controllers/log.controller.js";
import { validate } from "../middleware/validate.js";
import { logSchema } from "../schema/log.schema.js";
import { logQuerySchema } from "../schema/log.query.schema.js";
import { analyticsQuerySchema } from "../schema/analytics.schema.js";

const router = Router();

router.post("/", validate(logSchema), LogController.create);
router.get("/", validate(logQuerySchema, "query"), LogController.getAll);
router.get(
  "/analytics",
  validate(analyticsQuerySchema, "query"),
  LogController.getLogsAnalytics,
);
export default router;
