import pool from "@/lib/database/db";
import Snowflake from "@/lib/snowflake_tinapa/snowflake";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest)
{
    const { userId, content, mediaUrl, mediaType } = await req.json()
    // console.log("Received data:", { userId, content, mediaUrl, mediaType })
    if (!userId || userId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    if (content.length <= 0)
        return NextResponse.json({ type: "error", message: "Content cannot be empty!" }, { status: 400 })

    // if (mediaType !== "image" || mediaType !== "video")
    //     return NextResponse.json({ type: "error", message: "Invalid File!" }, { status: 400 })

    let conn = null
    try
    {
        const sf = new Snowflake()
        const post_id = sf.GenerateID()

        conn = await pool.getConnection()
        const [result] : [ResultSetHeader, FieldPacket[]] = await conn.execute("INSERT INTO posts (post_id, post_user_id, content, media_url, media_type, created_at) VALUES (?, ?, ?, ?, ?, NOW())", [post_id, String(userId), content, mediaUrl, mediaType]) as [ResultSetHeader, FieldPacket[]]
        if (result.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Failed to insert record" }, { status: 500 })

        return NextResponse.json({ type: "success", message: "Post created successfully!", post_id }, { status: 200 })
    } catch (error)
    {
        console.error("Error inserting record:", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}