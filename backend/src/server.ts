import app from "./app.js";
import dotenv from "dotenv";
import { pool } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
pool
  .query("SELECT NOW()")
  .then((res) => console.log("db connected", res.rows[0]))
  .catch((err) => console.log("db error:", err));
app.listen(PORT, () => {
  console.log("server started at port$:", PORT);
});
