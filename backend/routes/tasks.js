import express from "express";
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

export default router; 
