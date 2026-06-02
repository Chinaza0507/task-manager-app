import prisma from "../db.js";

// URGENCY HELPERS
function getUrgency(deadline: Date | string | null | undefined) {
  if (!deadline) return "none";
  const now = new Date();
  const hoursTillDeadline =
    (new Date(deadline).getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursTillDeadline <= 24) return "daily";
  if (hoursTillDeadline <= 168) return "weekly";
  return "none";
}

// generateDailyList
export async function generateDailyList(user_id: number) {
  const now = new Date();
  const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await prisma.task.findMany({
    where: {
      deleted_at: null,
      completed: false,
      task_list: { user_id },
      OR: [
        { deadline: { lte: in24hrs, gte: now } },
        { list_type: "daily" },
      ],
    },
  });

  if (tasks.length === 0) {
    console.log("No tasks due within 24 hours.");
    return null;
  }

  const title = `Daily — ${now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })}`;

  const list = await prisma.taskList.create({
    data: {
      user_id,
      title,
      list_type: "daily",
      generated_at: now,
      expires_at: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    },
  });

  await Promise.all(
    tasks.map((task: { id: number }) =>
      prisma.task.update({
        where: { id: task.id },
        data: { task_list_id: list.id },
      }),
    ),
  );

  return list;
}

// generateWeeklyList
export async function generateWeeklyList(user_id: number) {
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const tasks = await prisma.task.findMany({
    where: {
      deleted_at: null,
      completed: false,
      task_list: { user_id },
      OR: [
        { deadline: { lte: in7Days, gte: now } },
        { list_type: "weekly" },
      ],
    },
  });

  if (tasks.length === 0) {
    console.log("No tasks due within 7 days.");
    return null;
  }

  const startOfWeek = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const endOfWeek = in7Days.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const title = `Weekly — ${startOfWeek} to ${endOfWeek}`;

  const list = await prisma.taskList.create({
    data: {
      user_id,
      title,
      list_type: "weekly",
      generated_at: now,
      expires_at: in7Days,
    },
  });

  await Promise.all(
    tasks.map((task: { id: number }) =>
      prisma.task.update({
        where: { id: task.id },
        data: { task_list_id: list.id },
      }),
    ),
  );

  return list;
}

// cleanupExpiredLists
export async function cleanupExpiredLists() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const expiredLists = await prisma.taskList.findMany({
    where: {
      list_type: { in: ["daily", "weekly"] },
      expires_at: { lte: cutoff },
    },
  });

  void expiredLists;

  const deleted = await prisma.taskList.deleteMany({
    where: {
      list_type: { not: "daily" },
      expires_at: { lt: new Date() },
      tasks: {
        every: { completed: true },
      },
    },
  });

  console.log(`Cleanup: removed ${deleted.count} expired task list(s).`);
}

// runScheduler
export async function runScheduler() {
  console.log("Running scheduler...", new Date().toISOString());

  const users = await prisma.user.findMany({ select: { id: true } });
  for (const user of users) {
    await generateDailyList(user.id);
    await generateWeeklyList(user.id);
  }

  await cleanupExpiredLists();
  console.log("Scheduler finished.");
}
