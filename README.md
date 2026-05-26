# TaskPilot - A Student Task Manager

  **​A centralized productivity app designed to help students balance academic deadlines, extracurriculars, and personal study goals.**

## Scope and Requirements 
### Problem Statement
 Students often struggle to track deadlines across multiple platforms (LMS, email, syllabi). This tool consolidates those inputs into a single, prioritized view to reduce "deadline anxiety" and improve time management.

### Front-end: Functional Requirements 
 The Digital To-Do List : Students can type in a task, change the details later, or delete it if they don't need to do it anymore (Search, Edit and Delete button).
 It includes a specific spot to pick a date and time.

​ Color-Coded Urgency: To help students stay organized at a glance, tasks will automatically change colors: Red for "Do this now!", Yellow for "Soon," and Green for "Finished!"

​ The "Today" View: A special screen that shows only what is due today. If a student misses a task, the app lets them quickly push it to tomorrow with one click.

​ The Progress Dashboard : A simple chart that shows the student how much of their work is done (e.g., "You are 70% finished with your weekly goals!").

### Front-end: Non-functional Requirements 
 Simple to Use (Intuitive) : The app should be so simple that a student can figure out how to add a task in seconds without needing a manual.

​ Speed (Snappiness) : When a student clicks a button or changes a task to "Done," the screen should update instantly so it doesn't feel sluggish or broken.

​ Reliability : The app must be "tough." If the student’s phone dies or they close the browser, their saved tasks must still be there when they come back.

​ Works on All Devices:Whether the student is on a laptop in class or using their phone on the bus, the app should resize itself to fit the screen perfectly.

​ Easy to Read (Accessibility): Since we use colors for urgency, we will also use clear text or icons so that students who have trouble seeing certain colors can still understand which tasks are most important.

### Testing Requirements

​ Feature Check (Functional Testing) : We tested every single button (Create, Edit, Delete, Tag) to ensure they do exactly what they are supposed to do.

​ Device Check (Compatibility Testing) : We tested the app on different web browsers (like Chrome and Safari) and different phones (iPhone vs. Android) to make sure it looks good everywhere.

​ Error Handling : We tested to see what happens when something goes wrong. For example, if a student tries to save a task without a title, the app should show a helpful warning message instead of crashing.

### Pending testing

​ User Acceptance : Before the final launch, a small group of students will try the app to confirm it actually helps them manage their time effectively.

​ Visual Polish : We will check that the colors (Red, Yellow, Blue, Green) appear correctly and are easy to see under different screen brightness levels.

### Integration Requirements

​ Data Handshake (API Connection): The frontend must successfully send task information (like the task name and due date) to the backend database so it can be saved forever.

​ Real-time Updates : When a task is added on the backend, the frontend should show it immediately without the student having to refresh the page.

​ Secure Login : The frontend must safely pass the student’s login details to the security system to make sure only that student can see their private tasks.

​ Consistent Data: The colors and labels saved in the database must match exactly what is shown on the screen every time the student logs back in.

​ Loading Indicators: While the frontend is "talking" to the backend to save information, it should show a small "loading" spinner so the student knows the app is working.

### Technical Stack
- [ ] Frontend: React.js / Tailwind CSS
- [ ] State Management: Context API

### License
   MIT License
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
