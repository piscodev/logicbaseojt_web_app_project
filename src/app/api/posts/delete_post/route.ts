import pool from "@/lib/database/db"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { NextResponse } from "next/server"

export async function POST(request: Request)
{
    const { currentUserId, postId } = await request.json()
    if (!currentUserId || !postId)
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        const queryPosts = "DELETE FROM posts WHERE post_id = ? AND post_user_id = ?"
        const [result] = await conn.execute<ResultSetHeader>(queryPosts, [postId, currentUserId])
        if (result.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Failed to delete post" }, { status: 500 })

        return NextResponse.json({ type: "success", message: "Post deleted successfully!" })
    } catch (error) {
        console.error("Error deleting post:", error)
        return NextResponse.json({ type: "error", message: "Error deleting post" }, { status: 500 })
    } finally {
        if (conn)
            conn.release()
    }
}