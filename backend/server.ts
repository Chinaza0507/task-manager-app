import express from "express";
import cors from "cors";

import tasksRouter from "./routes/tasks.js";
import groupsRouter from "./routes/groups.js";
import tasklistsRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Routes
app.use("/tasks", tasksRouter);
app.use("/groups", groupsRouter);
app.use("/tasklists", tasklistsRouter);

const PORT = process.env.PORT ?? 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
