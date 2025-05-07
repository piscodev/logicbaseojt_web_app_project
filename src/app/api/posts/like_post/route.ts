import { auth } from "@/auth";
import pool from "@/lib/database/db";
import Snowflake from "@/lib/snowflake_tinapa/snowflake";
import { FieldPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface LikePostRequest
{
    total_likes: number
}

interface CheckLikedResult
{
    count: number
}

export async function POST(req: NextRequest)
{
    const { postId, isLike } = await req.json()

    const session = await auth()
    if (!session)
        return NextResponse.json({ type: "error", message: "Cannot connect to sattelite..." }, { status: 500 })

    const userId = session?.user ? session.user.id : "0"
    if (!userId || userId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        if (isLike)
        {
            await conn.execute("INSERT INTO posts_users_liked (users_liked_id, users_liked_post_id) VALUES (?, ?)", [userId, postId])
            await conn.execute("UPDATE posts SET total_likes = (total_likes + ?) WHERE post_id = ?", [1, postId])
        } else {
            await conn.execute("UPDATE posts SET total_likes = (total_likes - ?) WHERE post_id = ?", [1, postId])
            await conn.execute("DELETE FROM posts_users_liked WHERE users_liked_id = ? AND users_liked_post_id = ?", [userId, postId])
        }

        // const sf = new Snowflake()
        // const likedId = sf.GenerateID()

        const queryPost = "SELECT total_likes FROM posts WHERE post_id = ?"
        const [rows]: [LikePostRequest[], FieldPacket[]] = await conn.query(queryPost, [postId]) as [LikePostRequest[], FieldPacket[]]
        if (rows.length === 0)
            return NextResponse.json({ type: "error", message: "Post not found" }, { status: 404 })

        const queryLikedPost = "SELECT COUNT(*) as count FROM posts_users_liked WHERE users_liked_id = ? AND users_liked_post_id = ?"
        const [checkLiked]: [CheckLikedResult[], FieldPacket[]] = await conn.query(queryLikedPost, [userId, postId]) as [CheckLikedResult[], FieldPacket[]]
        const isLiked = checkLiked[0].count > 0

        return NextResponse.json({ total_likes: Number(rows[0].total_likes), isLiked: isLiked }, { status: 200 })
    } catch (error)
    {
        console.error("Error updating post likes: ", error)
        return NextResponse.json({ type: "error", message: "Internal server error" }, { status: 500 })
    } finally
    {
        if (conn)
            conn.release()
    }
}