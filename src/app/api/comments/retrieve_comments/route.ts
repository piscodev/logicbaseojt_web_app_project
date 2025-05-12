import { FieldPacket } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

import pool from "@/lib/database/db"
import { CommentsData } from "@/app/utils/interfaces"

export async function POST(req: NextRequest)
{
    // const { searchParams } = new URL(request.url)
    // const postId = searchParams.get("postId")
    const { postId } = await req.json()
    // const postId = 45324274667360256n
    // if (!postId)
    //     return NextResponse.json({ type: "error", message: "Invalid Post ID!" }, { status: 400 })

    // console.log(postId)

    let conn = null
    try
    {
        conn = await pool.getConnection()

        const queryComments = "SELECT p.*, c.*, u.first_name, u.last_name, u.profile_image FROM comments AS c JOIN posts AS p ON p.post_id = c.comment_post_id LEFT JOIN users AS u ON u.user_id = c.commenter_user_id WHERE c.comment_post_id = ? ORDER BY c.created_at DESC"
        const [retrieveComments]: [CommentsData[], FieldPacket[]] = await conn.query(queryComments, [postId]) as [CommentsData[], FieldPacket[]]

        // if (retrieveComments.length === 0)
        //     return NextResponse.json({ type: "error", message: "No posts found!" }, { status: 404 })

        return NextResponse.json(retrieveComments, { status: 200 })
    } catch (error)
    {
        console.error("Error retrieving posts:", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}