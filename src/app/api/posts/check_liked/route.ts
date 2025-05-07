import { auth } from "@/auth"
import pool from "@/lib/database/db"
import { FieldPacket } from "mysql2"
import { NextResponse } from "next/server"


interface CheckLikedResult
{
    count: number
}

export async function POST(req: Request)
{
    const { postId, userId } = await req.json()

    const session = await auth()
    if (!session)
        return NextResponse.json({ type: "error", message: "Cannot connect to sattelite..." }, { status: 500 })

    if (!userId || userId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        const queryLikedPost = "SELECT COUNT(*) as count FROM posts_users_liked WHERE users_liked_id = ? AND users_liked_post_id = ?"
        const [checkLiked]: [CheckLikedResult[], FieldPacket[]] = await conn.query(queryLikedPost, [userId, postId]) as [CheckLikedResult[], FieldPacket[]]
        const isLiked = checkLiked[0].count > 0

        return NextResponse.json({ isLike: isLiked }, { status: 200 })
    } catch (error)
    {
        console.error("Error checking like: ", error)
        return NextResponse.json({ type: "error", message: "Internal server error" }, { status: 500 })
    } finally
    {
        if (conn)
            conn.release()
    }
}