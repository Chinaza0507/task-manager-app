/*import express from "express";
import db from "../db.js";

const router = express.Router();

// Create task
router.post("/", async (req, res) => {
    const { title, description, deadline, start_time, end_time, task_list_id } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    //Conflict detection for overlapping tasks in same list

    if (start_time && end_time) {
      if (new Date(start_time) >= new Date(end_time)) {
        return res.status(400).json({ error: "Start time must be before end time" })
      }
    }

    if (start_time && end_time) {
  if (new Date(start_time) >= new Date(end_time)) {
    return res.status(400).json({ error: "Start time must be before end time" });
  }

  if (task_list_id) {
    const conflictQuery = await prisma.task.findFirst({
      where: {
        task_list_id,
        deleted_at: null,
        start_time: { lt: new Date(end_time) },
        end_time: { gt: new Date(start_time) },
      }
    });

    if (conflictQuery) {
      return res.status(409).json({
        error: "Task time conflicts with an existing task in the same list",
        conflictQuery
      });
    }
  }
}
    try {
      const task = await prisma.task.create({
        data:{
          title,
          description,
          deadline: deadline ? new Date(deadline) : null,
          start_time: start_time ? new Date(start_time) : null,
          end_time: end_time ? new Date(end_time) : null,
          task_list_id,
          status: "pending",
        }
      })
      res.status(201).json(task)
    } catch (error) {
      console.error("Error creating task:", error)
      res.status(500).json({ error: "Failed to create task" })
    }
  })
  // GET /tasks
  router.get("/", async (req: Request, res: Response) => {
    try {
      const completedParam = req.query.completed as string | undefined;

      const where =
        completedParam === "true"
          ? { deleted_at: null, completed: true }
          : completedParam === "false"
            ? { deleted_at: null, completed: false }
            : { deleted_at: null };

      const tasks = await prisma.task.findMany({
        where,
        orderBy: { created_at: "desc" },
      });

      return res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  //GET /tasks/today
  //SChedule tasks for today
  router.get("/today", async (req, res) => {
    try{
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

  const tasks = await prisma.task.findMany({
    where: {
      deleted_at: null,
      start_time: { gte: todayStart, lte: todayEnd}
    }
  })
  res.json(tasks)
} catch (error) {  console.error("Error fetching today's tasks:", error)
  res.status(500).json({ error: "Failed to fetch today's tasks" })
}

  })

  //GET /tasks/upcoming
  router.get("/upcoming", async (req, res) => {
    try{
    const now = new Date()
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        start_time: {gte: now, lte: in7Days}
      } })
      res.json(tasks)
    } catch(error){
      console.error("Error fetching upcoming tasks:", error)
      res.status(500).json({ error: "Failed to fetch upcoming tasks" })
    }
  })

  //GET /tasks/overdue
  //Incomplete tasks and deadlines
  router.get("/overdue", async (req, res) => {
    try{
      const tasks = await prisma.task.findMany({
        where: {
          deleted_at: null,
          completed: false,
          deadline: { lt: new Date() }
      }})
      res.json(tasks)
    } catch(error){
      console.error("Error fetching overdue tasks:", error);
      res.status(500).json({ error: "Failed to fetch overdue tasks" })
    }
  })

  //Get /task/ search?q=study
  //Search tasks by ttile

  router.get("/search", async (req, res) => {
    const { q } = req.query
    if (!q) return res.status(400).json({ error: "Search query is required" });

    try {
      const tasks = await prisma.task.findMany({
        where: {
          deleted_at: null,
          title: {contains: q, mode: "insensitive"}
        }
      })
      res.json(tasks)
    } catch(error) {
      console.error("Error searching tasks:", error)
      res.status(500).json({ error: "Failed to search tasks" })
    }
  })

  //PATCH /tasks/:id/complete
  //Mark task as completed

  router.patch("/:id/complete", async (req, res) => {
    try {
      const task = await prisma.task.update({
        where: {id: parseInt(req.params.id)},
        data: {completed: true, status: "done"}
      })
      res.json(task)
    } catch (error){
      console.error(error)
      res.status(500).json({ error: "Failed to mark task as completed" })
    }
  })

  //PATCH /tasks/ :id/reschedule
  //Update start_time, end_time, or deadline

  router.patch("/:id/reschedule", async (req, res) => {
    const {start_time, end_time, deadline} = req.body
    try{
      const task = await prisma.task.update({
        where: {id: parseInt(req.params.id)},
        data: {
          ...(start_time && {start_time: new Date(start_time)}),
          ...(end_time && {end_time: new Date(end_time)}),
          ...(deadline && {deadline: new Date(deadline)}),
          status: "pending"
        }

      })
      res.json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to reschedule task" })
    } })

    //DELETE /tasks/:id
    //Soft delete a task by setting deleted_at timestamp

    router.delete("/:id", async (req, res) => {
      try {
        const task = await prisma.task.update({
          where: {id: parseInt(req.params.id)},
          data: {deleted_at: new Date()}
        })
        res.json({ message: "Task deleted successfully" })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to delete task" })
        }})

  //DELETE /tasks/:id/permanent
  //Permanently delete a task from the database
  router.delete("/:id/permanent", async (req, res) => {
    try {
      await prisma.task.delete({
        where: { id: parseInt(req.params.id) }
      })
      res.json({ message: "Task permanently deleted" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to permanently delete task" })
    }
        })

// PATCH /tasks/:id/restore
router.patch("/:id/restore", async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: { deleted_at: null, status: "pending" }
    })
    res.json({ message: "Task restored", task })
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "Task not found" })
  }
});

// PATCH /tasks/:id/list_type
router.patch("/:id/list_type", async (req, res) => {
  const { list_type } = req.body;
  const valid = ["daily", "weekly", null]
  if (!valid.includes(list_type)) {
    return res.status(400).json({ error: "list_type must be 'daily', 'weekly', or null" })
  }
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: { list_type }
    });
    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "Task not found" })
  }
});

export default router; */

import express, { Request, Response } from "express";
import prisma from "../db.js";

const router = express.Router();

function parseId(param: string) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

// GET /tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const completedParam = req.query.completed as string | undefined;

    const where =
      completedParam === "true"
        ? { deleted_at: null, completed: true }
        : completedParam === "false"
          ? { deleted_at: null, completed: false }
          : { deleted_at: null };

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create task
router.post("/", async (req: Request, res: Response) => {
  const { title, description, deadline, start_time, end_time, task_list_id } =
    req.body as {
      title?: string;
      description?: string;
      deadline?: string | null;
      start_time?: string | null;
      end_time?: string | null;
      task_list_id?: number;
    };

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (start_time && end_time) {
    if (new Date(start_time) >= new Date(end_time)) {
      return res
        .status(400)
        .json({ error: "Start time must be before end time" });
    }

    if (task_list_id) {
      const conflictQuery = await prisma.task.findFirst({
        where: {
          task_list_id,
          deleted_at: null,
          start_time: { lt: new Date(end_time) },
          end_time: { gt: new Date(start_time) },
        },
      });

      if (conflictQuery) {
        return res.status(409).json({
          error: "Task time conflicts with an existing task in the same list",
          conflictQuery,
        });
      }
    }
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
        start_time: start_time ? new Date(start_time) : null,
        end_time: end_time ? new Date(end_time) : null,
        task_list_id,
        status: "pending",
      },
    });
    return res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Failed to create task" });
  }
});

// GET /tasks/today
router.get("/today", async (_req: Request, res: Response) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        start_time: { gte: todayStart, lte: todayEnd },
      },
    });
    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching today's tasks:", error);
    return res.status(500).json({ error: "Failed to fetch today's tasks" });
  }
});

// GET /tasks/upcoming
router.get("/upcoming", async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        start_time: { gte: now, lte: in7Days },
      },
    });
    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching upcoming tasks:", error);
    return res.status(500).json({ error: "Failed to fetch upcoming tasks" });
  }
});

// GET /tasks/overdue
router.get("/overdue", async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        completed: false,
        deadline: { lt: new Date() },
      },
    });
    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching overdue tasks:", error);
    return res.status(500).json({ error: "Failed to fetch overdue tasks" });
  }
});

// GET /tasks/search?q=study
router.get("/search", async (req: Request, res: Response) => {
  const { q } = req.query as { q?: string };
  if (!q) return res.status(400).json({ error: "Search query is required" });

  try {
    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        title: { contains: q, mode: "insensitive" },
      },
    });
    return res.json(tasks);
  } catch (error) {
    console.error("Error searching tasks:", error);
    return res.status(500).json({ error: "Failed to search tasks" });
  }
});

// PATCH /tasks/:id/complete
router.patch("/:id/complete", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { completed: true, status: "done" },
    });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// PATCH /tasks/:id/status (toggle)
router.patch("/:id/status", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const { completed } = req.body as { completed?: boolean };
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be boolean" });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { completed, status: completed ? "done" : "pending" },
    });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// PATCH /tasks/:id/reschedule
router.patch("/:id/reschedule", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const { start_time, end_time, deadline } = req.body as {
    start_time?: string;
    end_time?: string;
    deadline?: string;
  };

  if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
    return res
      .status(400)
      .json({ error: "Start time must be before end time" });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(start_time && { start_time: new Date(start_time) }),
        ...(end_time && { end_time: new Date(end_time) }),
        ...(deadline && { deadline: new Date(deadline) }),
        status: "pending",
      },
    });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// DELETE /tasks/:id (soft delete)
router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  try {
    await prisma.task.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// DELETE /tasks/:id/permanent
router.delete("/:id/permanent", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  try {
    await prisma.task.delete({ where: { id } });
    return res.json({ message: "Task permanently deleted" });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// PATCH /tasks/:id/restore
router.patch("/:id/restore", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { deleted_at: null, status: "pending" },
    });
    return res.json({ message: "Task restored", task });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

// PATCH /tasks/:id/list_type
router.patch("/:id/list_type", async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const { list_type } = req.body as { list_type?: "daily" | "weekly" | null };
  const valid = ["daily", "weekly", null];

  if (!valid.includes(list_type ?? null)) {
    return res
      .status(400)
      .json({ error: "list_type must be 'daily', 'weekly', or null" });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { list_type: list_type ?? null },
    });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
});

export default router;
