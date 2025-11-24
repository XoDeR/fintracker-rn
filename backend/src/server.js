import express from "express";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

app.use(rateLimiter);
// need this middleware to parse requests
app.use(express.json())

const PORT = process.env.PORT || 5001;

// For testing, health check
app.get("/health", (req, res) => {
  res.send("Test: server works");
});

app.use("/api/transactions", transactionsRoute)

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server running on PORT:", PORT);
  });
})

