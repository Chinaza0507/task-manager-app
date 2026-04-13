import express from 'express'
const router = express.Router()

router.post("/", (req, res) =>{const {title} = req.body
res.json({message: "Task received",
    task: {title}
})})

export default router