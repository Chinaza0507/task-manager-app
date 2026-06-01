// app/ api/ files/ download/[fileId]/ route.js
// GET /api/files/download/:fileId

import { NextResponse} from "next/server"
import { readFile } from "fs/promises"
import path from "path"
import prisma from "@/lib/db"

export async function GET(request, { params }) {
    try{
        const file = await prisma.taskFile.findUnique({
            where: { id: parseInt(params.fileId)}
        })

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 })
        }

        //Read file from public uploads
        const filepath = path.join(process.cwd(), "public", file.filepath)
        const fileBuffer = await readFile(filepath)

        //Return file as downloadable response
        return new NextResponse(fileBuffer, {
            headers:{
                "Content-Disposition": `attachment; filename="${file.filename}"`,
                "Content-Type": file.mimetype,
            }
        })
    }catch(error){
        console.error("Error downloading file:", error)
        return NextResponse.json({error: "Download failed"}, {status: 500})
    }
}