import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

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

app.post("/api/transactions", async (req, res) => {
  // title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;

    // all fields are required
    // amount can be 0, so we compare it with undefined
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id,title,amount,category)
      VALUES (${user_id},${title},${amount},${category})
      RETURNING *
    `;

    console.log(first)
    res.status(201).json(transaction[0])

  } catch (error) {
    console.log("Transaction creation error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  });
})

