import pool from "@/lib/database/db"
import { ResultSetHeader } from "mysql2"
import { NextResponse } from "next/server"


export async function GET()
{
    let conn = null
    try
    {
        conn = await pool.getConnection()
        const [trendingTopics] = await conn.query<ResultSetHeader>(`
            SELECT 
                c.comment_post_id,
                p.post_id, p.content, p.media_url,
                COUNT(*) AS comment_count,
                MAX(c.created_at) AS latest_comment
            FROM comments AS c
            INNER JOIN posts AS p ON p.post_id = c.comment_post_id
            GROUP BY c.comment_post_id
            ORDER BY comment_count DESC, latest_comment DESC
            LIMIT 5
        `)

        return NextResponse.json(trendingTopics)
    } catch (error) {
        console.error("Error fetching trending topics: ", error)
        return NextResponse.json({ type: "error", message: "Failed to fetch trending topics" })
    } finally {
        if (conn)
            conn.release()
    }
}