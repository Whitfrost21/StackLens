import { Router } from "express";
import { LogController } from "../controllers/log.controller.js";
import { validate } from "../middleware/validate.js";
import { logSchema } from "../schema/log.schema.js";
import { logQuerySchema } from "../schema/log.query.schema.js";
import { analyticsQuerySchema } from "../schema/analytics.schema.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, validate(logSchema), LogController.create);
router.get("/", auth, validate(logQuerySchema, "query"), LogController.getAll);
router.get(
  "/analytics",
  auth,
  validate(analyticsQuerySchema, "query"),
  LogController.getLogsAnalytics,
);
export default router;
