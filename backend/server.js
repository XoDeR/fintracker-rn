import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Test: server works");
})

app.listen(5001, () => {
  console.log("server running on PORT:5001");
});