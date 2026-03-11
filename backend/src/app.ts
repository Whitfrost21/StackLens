import express from "express";
import logroutes from "./routes/log.routes.js";
import dashboardrouter from "./routes/dashboardroutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/v1/logs", logroutes);
app.use("/api/v1/dashboard", dashboardrouter);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  const statusCode = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message || "An unexpected error occurred";
  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { error: err.toString() }),
  });
});

export default app;
