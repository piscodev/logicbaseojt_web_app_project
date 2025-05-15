import { auth } from "@/auth"
import { FieldPacket } from "mysql2"
import { NextRequest, NextResponse } from "next/server"

import pool from "@/lib/database/db"
import { PostsData } from "@/app/utils/interfaces"

export async function POST(request: NextRequest)
{
    const { offset } = await request.json()
    const limit = 10

    const session = await auth()
    const userId = session?.user ? session.user.id : "0"
    // const userId: BigInt = 44452442791743488n
    // const userId: BigInt = 45324192073125888

    //45329561272979456
    // if (!userId || userId === "0")
    //     return NextResponse.json({ type: "error", message: "Invalid User!" }, { status: 400 })

    let conn = null
    try
    {
        conn = await pool.getConnection()

        // const queryPosts = "SELECT fw.*, p.*, u.first_name, u.last_name, u.profile_image FROM followers AS fw JOIN posts AS p ON p.user_id = fw.followed_user_id LEFT JOIN users as u ON u.user_id = fw.followed_user_id WHERE fw.user_id = ? ORDER BY p.created_at DESC"
        // const queryPosts =
        // `
        //     SELECT 
        //         fw.*, 
        //         p.*, 
        //         u.first_name, 
        //         u.last_name, 
        //         u.profile_image,
        //         COALESCE(c.comment_count, 0) AS comment_count
        //     FROM followers AS fw
        //     JOIN posts AS p ON p.post_user_id = fw.followed_user_id
        //     LEFT JOIN users AS u ON u.user_id = fw.followed_user_id
        //     LEFT JOIN (
        //         SELECT comment_post_id, COUNT(*) AS comment_count
        //         FROM comments
        //         GROUP BY comment_post_id
        //     ) AS c ON c.comment_post_id = p.post_id
        //     WHERE fw.user_id = ?
        //     ORDER BY p.created_at DESC
        // `

        let queryPosts =
        `
            SELECT 
                p.*,
                u.*,
                COALESCE(c.comment_count, 0) AS comment_count,
                ? AS user_id, -- always output viewer's user_id
                f.followed_user_id   -- only filled if the post is from a followed user
            FROM posts AS p
            JOIN users AS u ON u.user_id = p.post_user_id
            LEFT JOIN (
                SELECT comment_post_id, COUNT(*) AS comment_count
                FROM comments
                GROUP BY comment_post_id
            ) AS c ON c.comment_post_id = p.post_id
            LEFT JOIN followers AS f
                ON f.followed_user_id = p.post_user_id
                AND f.user_id = ?  -- viewer follows this user
            WHERE p.post_user_id = ?
            OR p.post_user_id IN (
                SELECT followed_user_id
                FROM followers
                WHERE user_id = ?
            )
            -- ORDER BY p.created_at DESC
            ORDER BY p.id DESC
            LIMIT ? OFFSET ? -- specify the number of posts to fetch per query
        `
        // const values: any[] = [userId, userId, userId, userId];

        // //  pagination with post_id
        // if (lastPostId)
        // {
        //     queryPosts += ` AND p.post_id < ?`
        //     values.push(lastPostId)
        // }

        // queryPosts += ` ORDER BY p.post_id DESC LIMIT ?`
        // values.push(limit)

        // const queryPosts = `
        //     SELECT 
        //         p.*,
        //         u.first_name,
        //         u.last_name,
        //         u.profile_image,
        //         COALESCE(c.comment_count, 0) AS comment_count,
        //         ? AS user_id, -- always output viewer's user_id
        //         f.followed_user_id   -- only filled if the post is from a followed user
        //     FROM posts AS p
        //     JOIN users AS u ON u.user_id = p.post_user_id
        //     LEFT JOIN (
        //         SELECT comment_post_id, COUNT(*) AS comment_count
        //         FROM comments
        //         GROUP BY comment_post_id
        //     ) AS c ON c.comment_post_id = p.post_id
        //     LEFT JOIN followers AS f
        //         ON f.followed_user_id = p.post_user_id
        //         AND f.user_id = ?  -- viewer follows this user
        //     WHERE (p.post_user_id = ? OR p.post_user_id IN (
        //         SELECT followed_user_id
        //         FROM followers
        //         WHERE user_id = ?
        //     ))
        //     ${lastPostId ? `AND p.post_id < ?` : ''} -- Apply pagination only if lastPostId exists
        //     ORDER BY p.post_id DESC
        //     LIMIT ? -- specify the number of posts to fetch per query
        // `;

        // const params = lastPostId
        //     ? [userId, userId, userId, userId, lastPostId, limit]
        //     : [userId, userId, userId, userId, limit]; // First load doesn't use `lastPostId`

        const [retrievePosts]: [PostsData[], FieldPacket[]] = await conn.query(queryPosts, [userId, userId, userId, userId, limit, offset]) as [PostsData[], FieldPacket[]]

        // if (retrievePosts.length === 0)
        //     return NextResponse.json({ type: "error", message: "No posts found!" }, { status: 404 })

        return NextResponse.json(retrievePosts, { status: 200 })
    } catch (error)
    {
        console.error("Error retrieving posts:", error)
        return NextResponse.json(JSON.stringify({ type: "error", message: "Database error" }), { status: 500 })
    } finally {

        if (conn)
            conn.release()
    }
}