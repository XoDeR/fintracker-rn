import { neon } from "@neondatabase/serverless";

import "dotenv/config"; // does the same as import dotenv + call dotenv.config()

// SQL connection
export const sql = neon(process.env.DATABASE_URL);

export async function initDb() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    // DECIMAL(10,2) total 10 digits, 2 digits after the decimal point

    console.log("DB initted successfully")
  } catch (error) {
    console.log("DB init error:", error);
    process.exit(1); // 1 === status code FAILURE
  }
}