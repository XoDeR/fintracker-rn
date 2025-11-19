import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Test: server works");
});

app.listen(PORT, () => {
  console.log("server running on PORT:", PORT);
});