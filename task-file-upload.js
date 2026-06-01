// app/api/files-upload/[taskId]/route.js
//POST /api/files-upload/:taskId - attacf file to task

import {NextResponse} from 'next/server'
import {writeFile, mkdir} from 'fs/promises'
import path from 'path'
import prisma from "@/lib/db"

export const config = {
    api: {bodyParser: false}
}

export async function POST(request, {params}) {
    try{
        const formData = await request.formData()
        const file = formData.get('file')

        if (!file){
            return NextResponse.json({error: "No file provided"}, {status: 400})
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        //Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads")
        await mkdir(uploadDir, {recursive: true})

        //Save file with timestamp prefix to avoid name collisions
        const filename = `${Date.now()}-${file.name}`
        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, buffer)

        //Save file record to database
        const taskFile = await prisma.taskFile.create({
            data:{
                task_id: parseInt(params.taskId),
                filename: file.name,
                filepath: `/uploads/${filename}`,
                mimetype: file.type,
            }
        })
        return NextResponse.json({message: "File uploaded successfully", file: taskFile}, {status: 201})
            }
            catch(error){
        console.error("File upload error:", error)
        return NextResponse.json({error: "File upload failed"}, {status: 500})
            }
    }