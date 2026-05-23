import express from "express";
import db from "../db.js";

const router = express.Router();

// Create task
router.post("/", async (req, res) => {
  try {
    const { title, task_list_id } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await db.query(
      "INSERT INTO tasks (title, task_list_id) VALUES ($1, $2) RETURNING *",
      [title, task_list_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed" });
  }
});

// Complete task
router.patch("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Get overdue tasks
router.get("/overdue", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM tasks WHERE deadline < NOW() AND completed = FALSE"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

export default router;