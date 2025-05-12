import pool from "@/lib/database/db";
import Snowflake from "@/lib/snowflake_tinapa/snowflake";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

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
        const strId = String(userId)
        const arr = [post_id, strId, content, mediaUrl, mediaType]
        const [result] : [ResultSetHeader, FieldPacket[]] = await conn.execute("INSERT INTO posts (post_id, post_user_id, content, media_url, media_type, created_at) VALUES (?, ?, ?, ?, ?, NOW())", arr) as [ResultSetHeader, FieldPacket[]]
        if (result.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Failed to insert record" }, { status: 500 })

        const [rows] = await conn.query<RowDataPacket[]>("SELECT first_name, last_name, profile_image FROM users WHERE user_id = ?", [userId])
        if (rows.length === 0)
            return NextResponse.json({ type: "error", message: "User not found" }, { status: 404 })
        const user = rows[0]
        const { first_name, last_name, profile_image } = user

        return NextResponse.json({ type: "success", message: "Post created successfully!", post_id, strId, first_name, last_name, profile_image, content, mediaUrl, mediaType }, { status: 200 })
    } catch (error)
    {
        console.error("Error inserting record:", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}