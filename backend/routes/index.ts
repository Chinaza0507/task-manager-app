import express, { Request, Response } from "express";
import prisma from "../db.js";

const router = express.Router();

// POST /tasklists
router.post("/", async (req: Request, res: Response) => {
  const { title, user_id } = req.body as {
    title?: string;
    user_id?: number;
  };

  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!user_id) return res.status(400).json({ error: "User ID is required" });

  try {
    const taskList = await prisma.taskList.create({
      data: { title, user_id },
    });
    return res.status(201).json(taskList);
  } catch {
    return res.status(500).json({ error: "Tasks list creation failed" });
  }
});

// GET /tasklists/:id/tasks
router.get("/:id/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        task_list_id: parseInt(req.params.id, 10),
        deleted_at: null,
      },
      include: { task_tags: { include: { tag: true } } },
    });
    return res.json(tasks);
  } catch {
    return res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// GET /tasklists/:id/progress
router.get("/:id/progress", async (req: Request, res: Response) => {
  try {
    const total = await prisma.task.count({
      where: { task_list_id: parseInt(req.params.id, 10), deleted_at: null },
    });

    const completed = await prisma.task.count({
      where: {
        task_list_id: parseInt(req.params.id, 10),
        status: "completed",
        deleted_at: null,
      },
    });

    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);
    return res.json({ total, completed, progress: `${progress}%` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Progress fetch failed" });
  }
});

// DELETE /tasklists/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.taskList.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { deleted_at: new Date() },
    });
    return res.json({ message: "Task list deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete task list" });
  }
});

export default router;
