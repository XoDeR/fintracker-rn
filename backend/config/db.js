import { neon } from "@neondatabase/serverless";

import "dotenv/config"; // does the same as import dotenv + call dotenv.config()

// SQL connection
export const sql = neon(process.env.DATABASE_URL);