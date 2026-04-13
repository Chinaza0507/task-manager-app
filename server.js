import express, { json } from "express"
import { task as _task } from "./db"
import taskRoutes from "./route_tasks.js"

const app = express()
app.use(json())

app.get("/", (req, res) => {
    res.send("Task system API running")
})

app.post("/tasks", async (req, res) => {
    const {title, deadline, taskListId} = req.body
    try {
        const task = await _task.create({
            data:{
                title,
                deadline: deadline ? new Date(deadline) : null,
                taskListId
            }
        }) 
        res.json(task)
    } catch (error) {
        res.status(500).json({error: "Failed task creation"})
    }
})

app.use("/tasks", taskRoutes)

app.listen(5432, () => {
    console.log("Server running on port 5432")
})