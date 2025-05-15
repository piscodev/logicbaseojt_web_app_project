import pool from "@/lib/database/db";
import dayjs from "dayjs";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest)
{
    const { userId, mediaUrl, thumbnailUrl } = await req.json()
    if (!userId || userId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    // if (!mediaUrl || mediaUrl.length <= 0)
    //     return NextResponse.json({ type: "error", message: "Invalid Media!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()
    
        const strId = String(userId)
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const arr = [strId, mediaUrl, thumbnailUrl, now]
        const [result] = await conn.execute("INSERT INTO stories (story_user_id, story_media_url, story_thumbnail_url, created_at) VALUES (?, ?, ?, ?)", arr) as [ResultSetHeader, FieldPacket[]]
        if (result.affectedRows === 0)
            return NextResponse.json({ type: "error", message: "Failed to insert record" }, { status: 500 })

        const queryStory = `
            SELECT
                u.*,
                s.*
            FROM stories AS s
            JOIN users AS u ON u.user_id = s.story_user_id
            WHERE s.story_user_id = ? AND s.story_id = ?
`
        const [rows] = await conn.query(queryStory, [userId, result.insertId]) as [RowDataPacket[], FieldPacket[]]
        if (rows.length === 0)
            return NextResponse.json({ type: "error", message: "User not found" }, { status: 404 })

        const user = rows[0]
        const { user_id, first_name, last_name, profile_image } = user

        return NextResponse.json({ type: "success", message: "Reel created successfully!", user_id, first_name, last_name, profile_image, media_url: mediaUrl }, { status: 200 })
    } catch (error) {
        console.error("Error inserting record: ", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally {
        if (conn)
            conn.release()
    }
}