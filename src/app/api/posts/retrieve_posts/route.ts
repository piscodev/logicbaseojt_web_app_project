import { auth } from "@/auth"
import { FieldPacket } from "mysql2"
import { NextResponse } from "next/server"

import pool from "@/lib/database/db"
import { PostsData } from "@/app/utils/interfaces"

export async function GET()
{
    // const { searchParams } = new URL(request.url)
    // const userId = searchParams.get("profile")

    const session = await auth()
    const userId = session?.user ? session.user.id : "0"
    // const userId: BigInt = 44452442791743488n

    if (!userId || userId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        const queryPosts = "SELECT * FROM posts WHERE user_id = ? ORDER BY post_id DESC"
        const [retrievePosts]: [PostsData[], FieldPacket[]] = await conn.query(queryPosts, [userId]) as [PostsData[], FieldPacket[]]

        if (retrievePosts.length === 0)
            return NextResponse.json({ type: "error", message: "No posts found!" }, { status: 404 })

        return NextResponse.json([retrievePosts], { status: 200 })
    } catch (error)
    {
        console.error("Error retrieving posts:", error)
        return NextResponse.json(JSON.stringify({ type: "error", message: "Database error" }), { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}