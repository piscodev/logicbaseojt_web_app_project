import pool from "@/lib/database/db";
import Snowflake from "@/lib/snowflake_tinapa/snowflake";
import dayjs from "dayjs";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

interface MediaItem {
    url: string;
    type: string;
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const { userId, price, quantity, content, contactNumber, mediaList } = await req.json();

    if (!userId || userId === "0") {
        return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 });
    }

    if (!content.trim() && (!mediaList || mediaList.length === 0)) {
        return NextResponse.json({ type: "error", message: "Content or media required!" }, { status: 400 });
    }

    let conn = null;

    try {
        const sf = new Snowflake();
        const post_id = sf.GenerateID();
        const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

        conn = await pool.getConnection();

        // Combine media URLs as a semicolon-separated string
        const mediaUrl: string | null = mediaList?.map((m: MediaItem) => m.url).join(";") || null
        const mediaType = mediaList?.length ? mediaList[0].type : null; // Optional: first type or null

        const arr = [post_id, String(userId), price, quantity, content, contactNumber, mediaUrl, mediaType, now]

        const [result]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
            "INSERT INTO posts (post_id, post_user_id, price, quantity, content, post_contact_number, media_url, media_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            arr
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ type: "error", message: "Failed to insert post." }, { status: 500 });
        }

        const [rows] = await conn.query<RowDataPacket[]>(
            "SELECT user_id, first_name, last_name, profile_image FROM users WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ type: "error", message: "User not found." }, { status: 404 });
        }

        const { user_id, first_name, last_name, profile_image } = rows[0];

        return NextResponse.json({
            type: "success",
            message: "Post created successfully!",
            post_id,
            user_id,
            first_name,
            last_name,
            profile_image,
            price,
            quantity,
            content,
            post_contact_number: contactNumber,
            media_url: mediaUrl,
            mediaList: mediaList,
            mediaType,
            comment_count: 0,
            total_likes: 0,
            created_at: now,
        }, { status: 200 });

    } catch (error) {
        console.error("Error inserting record:", error);
        return NextResponse.json({ type: "error", message: "Database error." }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}



// import pool from "@/lib/database/db";
// import Snowflake from "@/lib/snowflake_tinapa/snowflake";
// import dayjs from "dayjs";
// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
// import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic"

// export async function POST(req: NextRequest)
// {
//     const { userId, content, mediaUrl, mediaType } = await req.json()
//     // console.log("Received data:", { userId, content, mediaUrl, mediaType })
//     if (!userId || userId === "0")
//         return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

//     if (content.length <= 0)
//         return NextResponse.json({ type: "error", message: "Content cannot be empty!" }, { status: 400 })

//     // if (mediaType !== "image" || mediaType !== "video")
//     //     return NextResponse.json({ type: "error", message: "Invalid File!" }, { status: 400 })

//     let conn = null
//     try
//     {
//         const sf = new Snowflake()
//         const post_id = sf.GenerateID()
//         const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

//         conn = await pool.getConnection()
//         const strId = String(userId)
//         const arr = [post_id, strId, content, mediaUrl, mediaType, now]
//         const [result] : [ResultSetHeader, FieldPacket[]] = await conn.execute("INSERT INTO posts (post_id, post_user_id, content, media_url, media_type, created_at) VALUES (?, ?, ?, ?, ?, ?)", arr) as [ResultSetHeader, FieldPacket[]]
//         if (result.affectedRows === 0)
//             return NextResponse.json({ type: "error", message: "Failed to insert record" }, { status: 500 })

//         const [rows] = await conn.query<RowDataPacket[]>("SELECT first_name, last_name, profile_image FROM users WHERE user_id = ?", [userId])
//         if (rows.length === 0)
//             return NextResponse.json({ type: "error", message: "User not found" }, { status: 404 })
//         const user = rows[0]
//         const { first_name, last_name, profile_image } = user

//         return NextResponse.json({ type: "success", message: "Post created successfully!", post_id, strId, first_name, last_name, profile_image, content, mediaUrl, mediaType }, { status: 200 })
//     } catch (error)
//     {
//         console.error("Error inserting record:", error)
//         return NextResponse.json({ type: "error", message: "Database error" }, { status: 500 })
//     } finally {

//         if (conn)
//             conn.release()
//     }
// }