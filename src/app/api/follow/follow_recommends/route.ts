import { UserRow } from "@/app/utils/interfaces"
import { auth } from "@/auth"
import pool from "@/lib/database/db"
import { FieldPacket } from "mysql2"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET()
{
    const session = await auth()
    if (!session?.user)
        return NextResponse.json({ type: "error", message: "User not logged in!" }, { status: 401 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        // const recommendQuery = "SELECT user_id, first_name, last_name, profile_image FROM users WHERE user_id != ? AND last_login IS NOT NULL ORDER BY last_login DESC LIMIT 5"
        // const recommendQuery = `
        //     SELECT user_id, first_name, last_name, profile_image
        //     FROM users
        //     WHERE user_id != ?
        //       AND last_login IS NOT NULL
        //       AND user_id NOT IN (
        //         SELECT followed_user_id FROM followers WHERE user_id = ?
        //       )
        //     ORDER BY last_login DESC
        //     LIMIT 5
        // `

        const recommendQuery = `
            SELECT user_id, first_name, last_name, profile_image
            FROM users
            WHERE user_id != ?
            AND last_login IS NOT NULL
            AND user_id NOT IN (
                SELECT followed_user_id FROM followers WHERE user_id = ?
            )
            ORDER BY RAND()
            LIMIT 10
        `

        const [rows]: [UserRow[], FieldPacket[]] = await conn.query(recommendQuery, [session.user.id, session.user.id]) as [UserRow[], FieldPacket[]]
        // if (rows.length === 0)
        //     return NextResponse.json({ type: "error", message: "No recommendations found!" }, { status: 404 })

        return NextResponse.json(rows, { status: 200 })
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