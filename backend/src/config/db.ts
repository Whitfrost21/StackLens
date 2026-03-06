import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
// testing purpose i use it locally for testing you can use too
// export const pool = new Pool({
//   user: "username",
//   database: "dbname",
// });
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
