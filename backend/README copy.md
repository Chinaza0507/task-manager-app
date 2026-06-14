# 📋 Task Manager App — Backend

> **Group 1 — COS Project**
## What This Is

This is the backend for the Task Manager App — a productivity tool built for students. It handles everything that happens behind the scenes: storing your tasks, enforcing your permissions, sending notifications, calculating priorities, and keeping your data safe. The frontend talks to this backend through a REST API.

---

## Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript (strict mode) |
| Runtime | Node.js |
| Database | SQL via Prisma ORM |
| Deployment | Vercel (Serverless) |Railway 
| Version Control | GitHub |
| IDE / Tooling | VS Code, Bash CLI |

---

## Functional Requirements

These are the features the backend is responsible for delivering. Each one maps to real API endpoints and database logic.

---

### 👤 User Account Management

Users must create an account to use the app. Only school email addresses are accepted at registration. Once registered, users can customise their profile — display name, profile picture, and account settings.

---

### ✅ Task Management

Tasks are the core of the app. The backend supports the full lifecycle of a task:

- **Create** a task with a title, description, deadline, tags, hyperlinks, and metadata
- **Edit** any of those details at any time
- **Typed schedule parsing** — users can type out or paste a schedule in plain text, and the backend will automatically turn it into calendar entries

---

### 📁 Task-List Management

Task-lists group related tasks together. Users can:

- **Create** a task-list with a name, urgency rating, description, and metadata
- **Edit** its urgency rating, info, and progress percentage
- **Delete and recover** task-lists the same way as individual tasks (30-day Trash window)
- **View progress** — each task-list automatically shows how many of its tasks are complete as a percentage


### 🧠 Smart Priority System

The backend automatically assigns each task a priority level based on its deadline, tags, and history. This happens in the background and never slows down other requests.

**Automatic levels (colour-coded):**

| Colour | Meaning |
|---|---|
| 🔴 Red | High urgency — needs attention soon |
| 🟡 Yellow | Moderate urgency — on the radar |
| 🟢 Green | Low urgency — not urgent right now |

**User-assigned special levels:**


### 🔔 Notification Management

The backend builds and sends personalised notifications based on each task's urgency and tags.

- Notification colour is determined first by urgency level, then by the task's tag colour
- Long-term tasks get recurring reminders at an interval chosen by the user
- Blue-priority tasks trigger a reminder at least every 2 hours
- Notifications can be sent for a single task or an entire task-list

---

### 📊 Performance Analytics

The backend tracks how users are getting on with their tasks and surfaces useful insights.

- Tracks completed, unfinished, deleted, moved, and cancelled tasks
- Analytics queries are cached and paginated so they stay fast even with large amounts of data
---

### 👥 Multi-User Collaboration

Users can invite others to collaborate on specific tasks. When collaborating:

- Both users can read and edit the shared task
- An in-app chat is available, but **only between users who share that task** — no random messaging
- A user can never access another user's tasks unless explicitly added as a collaborator

---

### 📧 Email & Calendar Syncing

- The app connects with **Outlook** and other email accounts to sync schedules and convert emails into calendar tasks
- A dedicated **Calendar** view lets users save one-off tasks on specific days and times
- Users can type or paste a schedule and the backend will automatically parse it into calendar entries

---

### ⏱️ Focus Timer (Pomodoro)

The app includes a Pomodoro-style focus timer designed to help students study without distractions.

- Users can start a focus session, optionally linked to a specific task
- Session history is tracked and fed into analytics
- While a session is active, non-critical notifications can be deferred

---

### 🗂️ Folders

Instead of attaching files to individual tasks (which can get messy), users can upload files to a general folder inside the app. Tasks can then reference files from that folder directly.

- Create, rename, and delete folders
- Upload files to a folder
- Link files to tasks via folder references
- Deleted folders go to Trash and are recoverable within 30 days
- Storage limits depend on the user's plan tier

---

## Non-Functional Requirements

These are the standards and constraints the backend must meet — covering performance, security, reliability, and code quality. Non-technical readers: this section explains *how* the backend is built to be safe, fast, and maintainable.

---

### ⚡ Performance

| Requirement | Detail |
|---|---|
| Response Time | API responses must not exceed **300ms** for standard operations under normal load |
| Async Processing | The Smart Priority System recalculates scores in the background — it never blocks a user waiting for a response |
| Query Optimisation | Analytics queries are **paginated and cached** to keep them fast on large datasets |
| Database Indexing | Frequently queried fields (`userId`, `taskListId`, `status`, `deadline`) all have database indexes |

---

### 🔒 Security

| Requirement | Detail |
|---|---|
| Authentication | Every API route is protected. Requests without a valid token are rejected with a `401 Unauthorized` error |
| JWT Tokens | Login returns a signed JSON Web Token. That token must be included in every subsequent request |
| Server-Side Authorisation | Permission checks always happen on the server. The client is **never** trusted to declare its own access level |
| Password Hashing | Passwords are hashed with **bcrypt** before being stored. Plaintext passwords are never saved or logged anywhere |
| Data Isolation | A user can never read or modify another user's data unless they have been explicitly added as a collaborator |
| Input Validation | All data sent by users is validated and sanitised on the server before it touches the database |
| Referential Integrity | Foreign key constraints are enforced at the **database level**, not just in code |

---

### 🏗️ Architecture & Reliability

| Requirement | Detail |
|---|---|
| Statelessness | The backend holds no session state. This allows Vercel's serverless functions to scale horizontally without conflicts |
| Availability | Target uptime is **99.5%**, using Vercel's global edge network |
| Soft Deletion | Tasks and task-lists are never immediately deleted — they are marked with a `deletedAt` timestamp and purged after 30 days. This powers the Trash/recovery feature |
| Atomicity | All multi-step write operations (create, update, delete) are wrapped in **database transactions** to prevent partial or corrupted writes |
| Timezone Standardisation | All deadlines and timestamps are stored in **UTC**. The client (app/browser) handles converting to the user's local timezone |

---

### 🛠️ Code Quality & Maintainability

| Requirement | Detail |
|---|---|
| TypeScript Strict Mode | Strict mode is enabled across the entire codebase. The build fails on any type error |
| API Versioning | All routes follow REST conventions and are versioned: `/api/v1/...` |
| Migration Control | All database schema changes go through **Prisma migrations**, which are version-controlled in this GitHub repo alongside the code |
| Error Consistency | Every error response returns the same JSON shape: `{ error: string, code: string, statusCode: number }` |
| Response Structure | Every successful response follows the same envelope: `{ data: T, meta?: object }` |

---

## API Conventions

**Common status codes:**

| Code | Meaning |
|---|---|
| `200` | OK — request succeeded |
| `201` | Created — new resource was made |
| `400` | Bad Request — invalid input |
| `401` | Unauthorized — missing or expired token |
| `403` | Forbidden — not allowed (wrong plan or not your resource) |
| `404` | Not Found — resource doesn't exist |
| `409` | Conflict — e.g. time slot already taken |

---

## Project Structure

```
/
├── api/            # Serverless API route handlers
├── prisma/         # Database schema and migration files
├── lib/            # Shared utilities, middleware, helpers
├── types/          # TypeScript type definitions
└── README.md
```

---
