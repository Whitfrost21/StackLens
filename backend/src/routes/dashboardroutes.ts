import { Router } from "express";
import { getDashboardController } from "../controllers/dashboard.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getDashboardController);

export default router;
