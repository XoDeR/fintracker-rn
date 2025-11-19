import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

async function initDb() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`

    console.log("DB initted successfully")
  } catch (error) {
    console.log("DB init error:", error)
    process.exit(1) // 1 === status code FAILURE
  }
}

app.get("/", (req, res) => {
  res.send("Test: server works");
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  });
})

