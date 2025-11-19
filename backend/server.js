import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Test: server works");
});

console.log("Port: ", process.env.PORT);

app.listen(5001, () => {
  console.log("server running on PORT:5001");
});