import pool from "@/lib/database/db"
import { FieldPacket, ResultSetHeader } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest)
{
    const { postId, commentId } = await req.json()

    if (!postId || !commentId)
        return NextResponse.json({ type: "error", message: "Invalid comment ID or post ID!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        const deleteCommentQuery = "DELETE FROM comments WHERE comment_id = ? AND comment_post_id = ?"
        const [deleteCommentResult] = await conn.query(deleteCommentQuery, [commentId, postId]) as [ResultSetHeader, FieldPacket[]]

        if (deleteCommentResult.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Comment not found!" }, { status: 404 })

        return NextResponse.json({ type: "success", message: "Comment deleted successfully!" }, { status: 200 })
    } catch (error)
    {
        console.error("Error deleting comment:", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally
    {
        if (conn)
            conn.release()
    }
}