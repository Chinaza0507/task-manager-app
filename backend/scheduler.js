import prisma from "../db.js"

//URGENCY HELPERS
//Tasks due within 24 hours = daily
//Tasks due within 7 days = weekly
// User can override by setting list_type manually on the task

function getUrgency(deadline){
    if (!deadline) return "none"
    const now = new Date()
    const hoursTillDeadline = (new Date (deadline) - now) / (1000 * 60 * 60)
    if (hoursTillDeadline <= 24) return "daily"
    if (hoursTillDeadline <= 168) return "weekly" //168 hours in a week
    return "none"
}

//generateDailyList
//Finds all tasks due within 24hrs (or manually marked as daily)
// and groups them into a daily list for user

export async function generateDailyList(user_id){
    const now = new Date()
    const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const tasks = await prisma.task.findMany({
        where: {
            deleted_at: null,
            completed: false,
            task_list: {user_id: user_id},
            OR: [
                //Default urgency based on deadline
                { deadline: { lte: in24hrs, gte: now } },

                //Override for manually marked daily tasks
                { list_type: "daily" }
            ]
        }
    })

    return tasks
}

if (tasks.length === 0) {
    console.log("No tasks due within 24 hours.")
    return null
}

//Creates new daily task for each list for today, and adds tasks to it
const title = `Daily — ${now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}`

const list = await prisma.taskList.create({
    data: {
        user_id: user_id,
        title: title,
        list_type: "daily",
        generated_at: now,
        expires_at: new Date(now.getTime() + 24 * 60 * 60 * 1000) //Expires in 24hrs
    }
})

//Link tasks to the new daily list
await Promise.all(tasks.map(task => prisma.task.update({
    where: { id: task.id },
    data: { task_list_id: list.id }
})))
return list

//generateWeeklyList
//Finds all tasks due within 7 days (or manually marked as weekly)
// and groups them into a weekly list for user

export async function generateWeeklyList(user_id){
    const now = new Date()
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const tasks = await prisma.task.findMany({
        where: {
            deleted_at: null,
            completed: false,
            task_list: {user_id: user_id},
            OR: [
                //Default urgency based on deadline
                { deadline: { lte: in7Days, gte: now } },
                //Override for manually marked weekly tasks
                { list_type: "weekly" }
            ]
        }
    })
    return tasks
}

if (tasks.length === 0) {
    console.log("No tasks due within 7 days.")
    return null
}

const startOfWeek = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })
const endOfWeek = in7Days.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })
const title = `Weekly — ${startOfWeek} to ${endOfWeek}`

const list = await prisma.taskList.create({
    data: {
        user_id: user_id,
        title,
        list_type: "weekly",
        generated_at: now,
        expires_at: in7Days,
    }})

    await Promise.all(tasks.map(task => prisma.task.update({
        where: { id: task.id },
        data: { task_list_id: list.id }
    })))
    return list

  //cleanupExpiredLists
  //Deletes any generated daily/weekly lists that have expired, and unlinks tasks from them
  //Daily tasks are exempt from cleanup if they are marked as daily, and same for weekly

export async function cleanupExpiredLists(){
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000) //24hrs ago

    //Find expired lists
    const expiredLists = await prisma.taskList.findMany({
        where: {
            list_type: { in: ["daily", "weekly"] },
            expires_at: { lte: cutoff }
        }
    })

    const deleted = await prisma.taskList.deleteMany({
    where: {
      list_type: { not: "daily" },   // exempt daily lists
      expires_at: { lt: new Date() }, // past expiry
      tasks: {
        every: { completed: true }    // only if all tasks are done
      }
    }
  })
 
  console.log(`Cleanup: removed ${deleted.count} expired task list(s).`) 
    }

// runScheduler
// Called by node-cron at midnight every day
// Generates daily + weekly lists for every user

export async function runScheduler(){
    console.log("Running scheduler...", new Date().toISOString())

    const users = await prisma.user.findMany({ select: { id: true } })
    for (const user of users) {
        await generateDailyList(user.id)
        await generateWeeklyList(user.id)
    }

    await cleanupExpiredLists()
    console.log("Scheduler finished.")
}