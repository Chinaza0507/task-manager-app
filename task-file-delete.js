// app/api/files/[fileId]/routes.js
// DELETE /api/files/:fileId

import {NextResponse} from "next/server"
import {unlink} from "fs/promises"
import path from "path"
import prisma from "@/lib/db"

export async function DELETE(request, {params}) {
    try{
        const file = await prisma.taskFile.findUnique({
            where: {id: parseInt(params.fileId)}
        })

        if (!file){
            return NextResponse.json({error: "File not found"}, {status: 404})
        }

        //Delete from disk
        const filepath = path.join(process.cwd(), "public", file.filepath)
        await unlink(filepath)

        //Delete from database
        await prisma.taskFile.delete({
            where: {id: parseInt(params.fileId)}
        })
        return NextResponse.json({message: "File deleted successfully"})
    } catch (error){
        console.error("Error deleting file:", error)
        return NextResponse.json({error: "Failed to delete file"}, {status: 500})
    }
}
