import { auth } from "@/auth"
import pool from "@/lib/database/db"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest)
{
    const { toFollowUserId } = await request.json()
    if (!toFollowUserId)
        return NextResponse.json({ type: "error", message: "Missing ID!" }, { status: 400 })

    const session = await auth()
    if (!session)
        return NextResponse.json({ type: "error", message: "Cannot connect to sattelite..." }, { status: 500 })

    let conn = null
    try
    {
        conn = await pool.getConnection()
        const userId = session?.user ? session.user.id : "0"
        if (!userId || userId === "0")
            return new Response(JSON.stringify({ type: "error", message: "Invalid User!" }), { status: 400 })

        // chck if the user is already following the user
        const checkFollowQuery = "SELECT * FROM followers WHERE user_id = ? AND followed_user_id = ?"
        const [checkFollowRows] = await conn.query<RowDataPacket[]>(checkFollowQuery, [userId, toFollowUserId])
        if (checkFollowRows.length > 0)
            return NextResponse.json({ followed: true }, { status: 200 })

        const [res] = await conn.execute<ResultSetHeader>("INSERT INTO followers (user_id, followed_user_id, created_at) VALUES (?, ?, NOW())", [userId, toFollowUserId])
        if (res.affectedRows === 0)
            return NextResponse.json({ followed: false }, { status: 200 })

        return NextResponse.json({ followed: true }, { status: 200 })
    } catch (error) {
        console.error("Error checking follow: ", error)
        return NextResponse.json({ type: "error", message: error }, { status: 500 })
    }
}