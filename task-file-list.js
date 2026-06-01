// app/api/files/task/[taskId]/route.js
// GET /api/files/task/:taskId 

import {NextResponse} from "next/server"
import prisma from  "@/lib/db"

export async function GET(req, {params}) {
    try{
        const files = await prisma.taskFile.findMany({
            where: {task_id: parseInt(params.taskId)},
            orderBy: {created_at: 'desc'}
        })

        return NextResponse.json(files)
    }catch (error){
        console.error("Fetch files error:", error)
        return NextResponse.json({error: "Failed to fetch files"}, {status: 500})
    }
}