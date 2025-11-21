import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

app.use(rateLimiter);
// need this middleware to parse requests
app.use(express.json)

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
    )`;

    // DECIMAL(10,2) total 10 digits, 2 digits after the decimal point

    console.log("DB initted successfully")
  } catch (error) {
    console.log("DB init error:", error);
    process.exit(1); // 1 === status code FAILURE
  }
}

// For testing
app.get("/", (req, res) => {
  res.send("Test: server works");
});

app.use("/api/transactions", transactionsRoute)

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  });
})

