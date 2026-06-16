# ✈️ TaskPilot — Frontend Documentation

## Overview

TaskPilot is a desktop-first web application built to help university students manage their academic workload in a calm, structured environment. It consolidates tasks, deadlines, focus sessions, and course information into a single interface — eliminating the need to juggle multiple platforms like email, LMS portals, and physical planners.

The application is intended for use on desktop and laptop browsers. It is not optimized for mobile devices in its current version.

> **Live Application:** [https://task-manager-app-zeta-gules.vercel.app](https://task-manager-app-zeta-gules.vercel.app)

---

## Design Philosophy

TaskPilot is built around the concept of **"breathable productivity"** — the idea that a student's digital workspace should feel as calm and organized as a clean desk in the morning. Every design decision on the frontend reflects this:

- **Minimal clutter** — only the most relevant information is shown on each screen
- **Soft, intentional color use** — colors serve a purpose (urgency, status, category) rather than decoration
- **Warm, personal tone** — the app greets students by name and uses encouraging language (e.g. *"Stay sharp, Zoe. You're doing great!"*)
- **Gentle analytics** — progress is framed positively to motivate rather than stress

The overall visual impression is clean, modern, and academic — designed to make students feel in control rather than overwhelmed.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js** (App Router) | Core React framework; handles routing, server components, and page rendering |
| **TypeScript** | Adds static typing across the codebase for reliability and easier debugging |
| **Tailwind CSS** | Utility-first CSS framework used for all layout, spacing, color, and responsive styling |
| **Context API** | Manages global application state (e.g. authenticated user, active tasks) across components |

---

## Application Structure

The frontend is organized using Next.js's App Router convention. Each folder inside `app/` represents a route, and `_components` folders contain components local to that page.

```
task-manager-app/
└── app/
    ├── calendar/
    │   ├── _component/           # Calendar-specific components
    │   ├── layout.tsx
    │   └── page.tsx              # Calendar page
    ├── context/
    │   └── AuthContext.tsx       # Global authentication context
    ├── dashboard/
    │   ├── _components/          # Dashboard-specific components
    │   ├── folders/              # Folders view
    │   ├── layout.tsx
    │   └── page.tsx              # Main dashboard page
    ├── forgot-password/
    │   └── page.tsx              # Forgot password page
    ├── login/
    │   └── page.tsx              # Login page
    ├── settings/
    │   ├── _components/          # Settings-specific components
    │   └── page.tsx              # Settings page
    ├── signup/
    │   └── page.tsx              # Sign up page
    ├── tasklist/
    │   ├── _components/          # Task list components
    │   ├── add/                  # Add new task
    │   ├── layout.tsx
    │   └── page.tsx              # Task list page
    ├── timer/
    │   ├── layout.tsx
    │   └── page.tsx              # Focus timer page
    ├── favicon.ico
    ├── globals.css               # Global styles
    └── layout.tsx                # Root layout
```

Protected routes (dashboard, tasklist, calendar, timer, folders, settings) require the user to be logged in. Unauthenticated users are automatically redirected to the login page.

---

## Pages & User Interface

### 1. Landing Page (`/`)

The landing page is the first thing a visitor sees. It is a public-facing marketing page that introduces TaskPilot and its value to prospective student users.

**Layout & Content:**
- A full-width hero section with the headline *"Experience Calm Productivity with TaskPilot"* and a subheading that summarizes the app's purpose
- A prominent **"Get Started for Free"** call-to-action button alongside a secondary **"See How It Works"** link
- A link for returning users to log in directly
- A **features section** with four key highlights laid out in a clean grid:
  - 🎯 **Task Management** — intelligent sorting by course, due date, or energy level
  - ⏱️ **Focus Timer** — Pomodoro-style timer with ambient sounds
  - 📊 **Performance** — gentle weekly analytics
  - 🗂️ **Resource Hub** — study guides and notes stored alongside tasks
- A **testimonials section** featuring quotes from three student personas (Computer Science, Law, and Accounting students) to establish social proof
- A footer call-to-action encouraging sign-up, with links to Privacy Policy, Terms of Service, and Student Discounts

**Purpose:** Convert new visitors into registered users by clearly communicating TaskPilot's benefits.

---

### 2. Sign Up Page (`/signup`)

The sign up page uses a **split-screen layout**:

- **Left side:** A registration form with fields for Full Name, Email, and Password (minimum 6 characters). A single **"Create free account"** button submits the form. Below the form are links to the Terms and Privacy Policy, and a prompt for existing users to log in instead.
- **Right side:** A visual panel reinforcing the app's value — featuring the TaskPilot logo, motivational copy (*"Breathe • Plan • Flow"*), and a checklist of key features (Task lists, Focus blocks, Priorities). A memorable tagline reads: *"If 'I'll remember' was a plan, you wouldn't be here."*

**Purpose:** Register new users and direct them to the dashboard.

---

### 3. Login Page (`/login`)

The login page also uses a **split-screen layout**:

- **Left side:** A login form with fields for Email Address and Password, a **"Forgot password?"** link, and a **"Login →"** submit button. Below the form is a prompt for new users to create an account.
- **Right side:** A preview image of the app's "Today's Focus" view, giving returning users a visual reminder of what they're logging into. The headline reads: *"Pick up right where you left off."*

**Purpose:** Authenticate existing users and restore their session.

---

### 4. Dashboard (`/dashboard`)

The dashboard is the heart of TaskPilot — the primary workspace students interact with on a daily basis. It is divided into a **left sidebar navigation** and a **main content area** with multiple sections.

#### Sidebar Navigation
A persistent left-hand sidebar contains:
- The TaskPilot logo and name
- Navigation links: **Dashboard**, **Task List**, **Calendar**, **Focus Timer**, **Folders**
- A **Settings** link and **Log Out** button at the bottom
- An **Upgrade** button for premium plans
- The logged-in student's avatar and name (e.g. *"Z — Zoe Hassan"*)

#### Main Content Area
The dashboard is organized into clearly labeled sections:

**Greeting Header**
A personalized greeting at the top of the page (e.g. *"Good afternoon, Zoe!"*) followed by a summary of how many tasks the student needs to focus on today. A badge also indicates active study groups (e.g. *"+3 Study group active"*).

**Today's Focus**
A list of the student's most important tasks for the day, each displayed as a card containing:
- Task title (e.g. *"COS 202 Project commit"*)
- Course tag (e.g. *"COS 202"*)
- Priority label — color-coded:
  - 🔴 **HIGH PRIORITY** — urgent tasks requiring immediate attention
  - 🟡 **MEDIUM PRIORITY** — tasks due soon
  - 🟢 **LOW PRIORITY** — tasks with more time remaining
- A three-dot overflow menu (⋮) for quick actions (edit, delete, reschedule)
- A **"View All"** link to see the full task list

**Focus Session Widget**
A compact Pomodoro timer widget embedded directly in the dashboard showing:
- Time remaining in the current session (e.g. *"25:00"*)
- Total focus time remaining for the day (e.g. *"Remaining today: 2h 15m"*)
- A **"Start Session"** button to begin a focus block
- An encouraging message to the student

**Deadlines**
A list of upcoming deadlines displayed as date cards, each showing:
- The month and day prominently (e.g. *"OCT 12"*)
- The task or assignment name (e.g. *"Final year project"*)
- Days remaining (e.g. *"2 days remaining"*)

**Courses**
A quick-glance section showing today's scheduled courses with:
- Course name (e.g. *"Psychology 101"*)
- Room or location (e.g. *"Room 402"*)
- Time (e.g. *"~ 10:00 AM"*)
- An icon indicating whether the class is in-person or online

**Performance Panel**
A summary of the student's current productivity stats displayed as simple metrics:
- **Progress** — a percentage bar (e.g. *"75%"*)
- **Focus** — total focus time logged today (e.g. *"2h 15m"*)
- **Tasks** — number of tasks for the day (e.g. *"4"*)
- **Streak 🔥** — consecutive days of activity (e.g. *"6d"*)

---

### 5. Focus Timer (`/dashboard` → Focus Timer)

A dedicated Pomodoro-style timer to help students enter deep work sessions. Features include timed focus intervals, short break periods, ambient sound support, and a distraction-free mode that hides other UI elements.

---

### 6. Folders (`/dashboard/folders`)

Students can group related tasks, notes, and resources into named folders — similar to organizing files on a computer. This is especially useful for project-based work or grouping resources by subject.

---

### 9. Settings (`/settings`)

A settings page where students can manage their account preferences, update personal information, and configure notification or display options.

---

## Functional Requirements

| ID | Feature | Description |
|---|---|---|
| F01 | Task Management | Students can create, edit, delete, and search tasks with a title, priority level, and due date |
| F02 | Priority Color Coding | Tasks are automatically color-coded — Red (high), Yellow (medium), Green (low/done) |
| F03 | Today View | A filtered view showing only tasks due today, with a one-click option to reschedule missed tasks |
| F04 | Focus Timer | A Pomodoro-style timer with start, pause, and reset controls and ambient sound support |
| F05 | Progress Dashboard | A visual chart showing weekly task completion percentage and productivity stats |
| F06 | User Authentication | Students can sign up, log in, log out, and have their data persist securely across sessions |

---

## Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NF01 | Desktop-First | The application is designed and optimized for desktop and laptop browsers |
| NF02 | Ease of Use | A student should be able to add their first task within seconds of logging in, without needing a tutorial |
| NF03 | Performance | All UI interactions must feel instant with no visible lag |
| NF04 | Reliability | Task data must persist even if the browser is closed or the device loses power unexpectedly |
| NF05 | Accessibility | Alongside color coding, tasks use text labels (HIGH, MEDIUM, LOW) so students with color vision difficulties can still understand urgency |

---

## Integration with Backend

The frontend communicates with the backend through REST API calls. All data — tasks, user accounts, deadlines, focus sessions — is stored in a PostgreSQL database managed via Prisma ORM on the backend.

| Integration Point | Description |
|---|---|
| **Task CRUD** | The frontend sends API requests to create, read, update, and delete tasks stored in the database |
| **User Authentication** | Login and signup forms submit credentials to the backend, which validates them and returns a session token |
| **Session Persistence** | The authentication token is stored and used to restore the student's session on return visits |
| **Real-time UI Updates** | After any task action, the frontend updates the displayed data immediately without a full page reload |
| **Performance Data** | Progress percentages, streak counts, and focus time are calculated from backend data and rendered in the Performance panel |


---

## 🧪 Testing

To ensure the reliability and usability of the TaskPilot frontend, the following testing approaches are planned across the development lifecycle.

| Test Type | Purpose |
|---|---|
| **Functional Testing** | Verify that core features — task creation, editing, deletion, login, and navigation — behave as expected |
| **User Interface Testing** | Ensure layouts, buttons, forms, and components render correctly and maintain visual consistency across screens |
| **Browser Compatibility Testing** | Confirm the application functions correctly across supported desktop browsers (Chrome, Safari, Firefox) |
| **Authentication Testing** | Verify that login, signup, logout, and protected route redirection all work correctly |
| **Error Handling Testing** | Ensure invalid inputs and failed API requests display clear, helpful feedback to the user rather than crashing |
| **User Acceptance Testing** | Gather feedback from real students to evaluate the app's usability and effectiveness in managing academic workload |

> Testing is ongoing throughout development and will be completed before the final production release.

---

## Known Limitations

- The application is **desktop-only** in its current version. Mobile responsiveness is planned as a future improvement.
- The **Schedule** and **Course** features are currently not functional. They are present in the navigation but have not been fully implemented in this release.
- **Real-time collaboration** is partially implemented — the study group badge is visible on the dashboard but full collaboration functionality will be available in a future release.
