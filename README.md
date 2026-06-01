# ✈️ TaskPilot

Navigate your academic workload with confidence.
TaskPilot is a smart, student-focused task manager built to reduce academic overwhelm — helping students organize assignments, track deadlines, collaborate with peers, and stay on top of every course, all in one place.

[![Beta](https://img.shields.io/badge/Status-Beta-F59E0B?style=flat-square)](https://task-manager-app-zeta-gules.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---
[🚀 Live Demo](https://task-manager-app-zeta-gules.vercel.app/)

[🐛 Report a Bug](https://github.com/Chinaza0507/task-manager-app/issues)

[💡 Request a Feature](https://github.com/Chinaza0507/task-manager-app/issues)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)

  
  ## 🎯 About the Project

Managing university life is hard. Between lectures, assignments, group projects, and deadlines across multiple courses, students often feel overwhelmed and disorganized.

TaskPilot was built to solve that. It gives students a single, intuitive workspace to:

- Stay on top of **every assignment and deadline** across all their courses
- **Collaborate seamlessly** with classmates on group tasks
- **Track their progress** and feel the satisfaction of getting things done

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **Task Management** | Create, edit, prioritize, and organize tasks with ease |
| 📅 **Calendar View** | Visualize upcoming deadlines in a clean weekly/monthly calendar |
| ⏰ **Deadline Tracking** | Never miss a submission with smart due date tracking |
| 🔔 **Reminders & Notifications** | Get notified before deadlines hit |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework with App Router and Server Components |
| [TypeScript](https://www.typescriptlang.org/) | Static typing for a more robust and maintainable codebase |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS for fast, consistent styling |

### Backend & Database
| Technology | Purpose |
|---|---|
| [Prisma ORM](https://www.prisma.io/) | Type-safe database access and schema migrations |
| [PostgreSQL](https://www.postgresql.org/) | Relational database for persistent data storage |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) — v18.17 or later
- [PostgreSQL](https://www.postgresql.org/download/) — v14 or later

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Chinaza0507/task-manager-app.git
cd task-manager-app
```

2. **Install dependencies**

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskpilot"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
task-manager-app/
├── app/                    # Next.js App Router
├── backend/                # Backend logic and API
├── components/             # Reusable UI components
├── designs/                # Design files
├── public/                 # Static assets
├── .env.example            # Example environment variables
├── .gitignore
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

## 🔮 Future Improvements

- Mobile app support
- AI-powered task prioritization
- Real-time collaboration
- Dark mode

---

## 🙏 Acknowledgements

A big thank you to all the contributors who helped build TaskPilot:

- [@Chinaza0507](https://github.com/Chinaza0507)
- [@oghossgift](https://github.com/oghossgift)
- [@tblgladiatorthekid](https://github.com/tblgladiatorthekid)
- [@timsly5](https://github.com/timsly5)
- [@FatihahA](https://github.com/FatihahA)
- [@Amarvel17](https://github.com/Amarvel17)
- [@of-gh](https://github.com/of-gh)

---
 
## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">

Built with ❤️ for students, by students.

</div>
