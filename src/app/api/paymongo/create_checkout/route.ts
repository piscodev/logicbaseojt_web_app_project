
import pool from "@/lib/database/db";
import dayjs from "dayjs";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { postId, price, quantity, name, email, description } = await req.json();

  const apiKey = "sk_test_JazfktkvScra2zttD7Mc1Lyo"
  let url = 'https://api.paymongo.com/v1/checkout_sessions';
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Basic ${btoa(`${apiKey}:`)}`
  };

  const data = {
    data: {
      attributes: {
        billing:{name, email},
        send_email_receipt: true,
        show_description: true,
        show_line_items: true,
        line_items: 
        [
          {
            "amount":Number(price) * 100,
            "currency":"PHP",
            "description": description,
            "images":[
              "https://images.unsplash.com/photo-1612346903007-b5ac8bb135bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            ],
            "name":"Beanines",
            "quantity":Number(quantity)
          }
        ]
        ,
        description: description,
        payment_method_types: ['gcash'],
        success_url: process.env.NEXTAUTH_URL,
        cancel_url: process.env.NEXTAUTH_URL,
      }
    }
  };

  let conn = null
  try
  {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok)
      throw new Error(`Error: ${response.statusText}`)

    conn = await pool.getConnection()
    const strId = String(postId)

    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const arr = [quantity, strId, now]
    const [result] = await conn.execute<ResultSetHeader>("UPDATE posts SET quantity = (quantity - ?) WHERE post_id = ? ", arr)
    if (result.affectedRows === 0)
      return NextResponse.json({ type: "error", message: "Failed to update record" }, { status: 500 })


    const responseData = await response.json()
    return NextResponse.json({url:responseData.data.attributes.checkout_url})
  }catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}