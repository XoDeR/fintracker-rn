import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    res.status(200).json(transactions);
  } catch (error) {
    console.log("Transaction fetch error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createTransaction(req, res) {
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

    res.status(201).json(transaction[0])

  } catch (error) {
    console.log("Transaction creation error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    // if id which is a string does not represent a number
    // this check is needed because otherwise the following sql query would crash the server
    // i.e. id id === "abc"
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
      `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "transaction deleted successfully" });
  } catch (error) {
    console.log("Transaction deletion error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount),0) as balance FROM transactions 
      WHERE user_id = ${userId}
    `;
    // COALESCE -- will default to 0

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount),0) as income FROM transactions 
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount),0) as expenses FROM transactions 
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    })
  } catch (error) {
    console.log("Transactions summary error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
}