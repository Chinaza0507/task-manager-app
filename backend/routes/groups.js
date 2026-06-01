import express from "express"
import prisma from "../db.js"

const router = express.Router()
//GET /groups/tags?use_id=1
//REturns all tasks grouped by their tags
//Tasks with no tags appear under "Untagged"

router.get("/tags", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: "user_id is required" });
 
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        task_list: { user_id: parseInt(user_id) }
      },
      include: {
        task_tags: { include: { tag: true } }
      }
    })
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" })
  }
})

//Group tasks by tag name
const groups = {}
for (const task of tasks) {
  if (task.task_tags.length === 0) {
    if (!groups["Untagged"]) groups["Untagged"] = []
    groups["Untagged"].push(task)
  } else {
    for (const task_tag of task.task_tags) {
      const tag_name = task_tag.tag.name
      if (!groups[tag_name]) groups[tag_name] = []
      groups[tag_name].push(task)
    }
  }
}
res.json(groups)

const result = Object.entries(groups).map(([tag, tasks]) => ({ tag, count: tasks.length, tasks }))
res.json(result)

// GET /groups/urgency?user_id=1
// Returns tasks grouped by urgency level:
//   critical  — deadline within 24hrs
//   high      — deadline within 3 days
//   mild      — deadline within 7 days
//   low       — deadline beyond 7 days or no deadline
//   overdue   — deadline already passed and not completed

router.get("/urgency", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: "user_id is required" });
 
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        completed: false,
        task_list: { user_id: parseInt(user_id) }
      }
    });
 
    const now = new Date();
 
    const groups = {
      overdue:  [],
      critical: [],
      high:     [],
      mild:     [],
      low:      [],
    };
 
    for (const task of tasks) {
      if (!task.deadline) {
        groups.low.push(task)
        continue
      }
 
      const hoursLeft = (new Date(task.deadline) - now) / (1000 * 60 * 60);
 
      if (hoursLeft < 0)    groups.overdue.push(task)
      else if (hoursLeft <= 24)  groups.critical.push(task)
      else if (hoursLeft <= 72)  groups.high.push(task)
      else if (hoursLeft <= 168) groups.mild.push(task)
      else                       groups.low.push(task)
    }
 
    // Format as array with urgency metadata
    const result = Object.entries(groups).map(([urgency, tasks]) => ({
      urgency,
      count: tasks.length,
      tasks
    }))
 
    res.json(result)
  } catch (error) {
    console.error("Error grouping by urgency:", error)
    res.status(500).json({ error: "Failed to group tasks by urgency" })
  }
})

//GET /groups/all?user_id=1
//Returns all tasks grouped by their task lists by BOTH tag amd urgency
router.get("/all", async (req, res) => {
  const { user_id } = req.query
  if (!user_id) return res.status(400).json({ error: "user_id is required" })
 
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deleted_at: null,
        completed: false,
        task_list: { user_id: parseInt(user_id) }
      },
      include: {
        task_tags: { include: { tag: true } }
      }
    })
    const now = new Date()

    function getUrgency(deadline){
        if (!deadline) return "low"
        const hoursLeft = (new Date(deadline) - now) / (1000 * 60 * 60)
        if (hoursLeft < 0) return "overdue"
        if (hoursLeft <= 24) return "critical"
        if (hoursLeft <= 72) return "high"
        if (hoursLeft <= 168) return "mild"
        return "low"
    }

    const groups = {}
    for (const task of tasks) {
        const urgency = getUrgency(task.deadline)
        const tagNames = task.task_tags.length > 0 ? task.task_tags.map(tt => tt.tag.name) : ["Untagged"]
        for (const tag of tagNames) {
            if (!groups[tag]) groups[tag] = { critical: [], high: [], mild: [], low: [], overdue: [] }
            groups[tag][urgency].push(task)
        }
    }

    // Format as array with tag and urgency metadata
    const result = Object.entries(groups).map(([tag, urgencies]) => ({
        tag,
        urgencies: Object.entries(urgencies).map(([urgency, tasks]) => ({
            urgency,
            count: tasks.length,
            tasks
        }))
    }))

    res.json(result)
  } catch (error) {
    console.error("Error grouping tasks:", error)
    res.status(500).json({ error: "Failed to group tasks" })
  }
})

export default router
