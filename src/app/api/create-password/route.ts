import { NextResponse } from "next/server";
import db from "@/lib/database/db";
import bcrypt from "bcryptjs";
import { FieldPacket, ResultSetHeader } from "mysql2";

export async function POST(request: Request)
{
  const { userId, password } = await request.json()
  if (!userId || !password)
    return NextResponse.json({ message: "User  ID and password are required." }, { status: 400 })

  let conn = null
  try
  {
    conn = await db.getConnection()

    const hashedPassword = await bcrypt.hash(password, 10)
    const checkUser = "UPDATE FROM users SET hashed_password = ? WHERE user_id = ?"
    const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(checkUser, [hashedPassword, userId]) as [ResultSetHeader, FieldPacket[]]
    if (result.affectedRows === 0)
      return NextResponse.json({ message: "An error occured creating password... Contact developer!" }, { status: 404 })

    return NextResponse.json({ message: "Password created successfully." }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error creating password." }, { status: 500 })
  }
}