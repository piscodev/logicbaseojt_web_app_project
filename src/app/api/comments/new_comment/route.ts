import { auth } from "@/auth"
import pool from "@/lib/database/db"
import Snowflake from "@/lib/snowflake_tinapa/snowflake"
import dayjs from "dayjs"
import { ResultSetHeader } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest)
{
    const { postId, content } = await request.json()
    // const postId = 45324274667360256n
    // const userId = 44452442791743488n

    if (!postId || !content)
        return NextResponse.json({ type: "error", message: "Invalid Post ID!" }, { status: 400 })

    let conn = null
    try
    {
        const session = await auth()
        const userId = (session?.user ? String(session.user.id) : "0")
        if (!userId || userId === "0")
            return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

        const sf = new Snowflake()
        const commentId = sf.GenerateID()
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

        conn = await pool.getConnection()

        console.log("Inserting comment:", { commentId, postId, userId, content })

        const queryInsertComment = "INSERT INTO comments (comment_id, comment_post_id, commenter_user_id, comment_text, created_at) VALUES (?, ?, ?, ?, ?)"
        const [insertComment] = await conn.execute<ResultSetHeader>(queryInsertComment, [commentId, postId, userId, content, now])

        if (insertComment.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Failed to insert comment!" }, { status: 500 })

        return NextResponse.json({ type: "success", message: "Comment posted successfully!" }, { status: 200 })
    } catch (error)
    {
        console.error("Error inserting comment:", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally
    {
        if (conn)
            conn.release()
    }
}