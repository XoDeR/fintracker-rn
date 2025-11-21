import express from "express";
import {
  getTransactionsByUserId,
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId)

router.delete("/:id", deleteTransaction)

router.post("/", createTransaction);

router.get("/summary/:userId", getSummaryByUserId)

export default router;