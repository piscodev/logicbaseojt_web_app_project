import pool from "@/lib/database/db"
import { FieldPacket, RowDataPacket } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest)
// export async function GET()
{
    const { currentUserId } = await req.json()
    // const currentUserId = "47605698242023424"
    if (!currentUserId || currentUserId === "0")
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()
        const strId = String(currentUserId)
        const query = `
            SELECT
                s.story_id,
                s.story_media_url,
                s.story_thumbnail_url,
                s.created_at,
                u.first_name,
                u.last_name,
                u.profile_image
            FROM stories AS s
            JOIN users AS u ON u.user_id = s.story_user_id
            WHERE (s.story_user_id IN (
                SELECT followed_user_id FROM followers WHERE user_id = ?
            ) OR s.story_user_id = ?)
            AND DATE(s.created_at) = CURDATE()
            AND s.created_at = (
                SELECT MAX(s2.created_at)
                FROM stories AS s2
                WHERE s2.story_user_id = s.story_user_id
                AND DATE(s2.created_at) = CURDATE()
            )
            ORDER BY s.created_at DESC
        `
        const [rows] = await conn.query<RowDataPacket[]>(query, [strId, strId]) as [RowDataPacket[], FieldPacket[]]

        const stories = rows.map((row) => ({
            id: row.story_id,
            name: row.first_name + " " + row.last_name,
            videoUrl: row.story_media_url,
            avatar: row.profile_image,
            thumbnail: row.story_thumbnail_url,
            isCreate: false,
        }))

        return NextResponse.json({ stories }, { status: 200 })
    } catch (error) {
        console.error("Error retrieving stories: ", error)
        return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}