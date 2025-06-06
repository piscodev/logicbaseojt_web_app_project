
import pool from "@/lib/database/db";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { postId, price, quantity, name, email, description } = await req.json();

  const apiKey = "sk_test_JazfktkvScra2zttD7Mc1Lyo"
  // const apiKey = "sk_test_2byzkVErtpKCpLK9hkFT37gn"
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
            "amount":price,
            "currency":"PHP",
            "description": description,
            "images":[
              "https://images.unsplash.com/photo-1612346903007-b5ac8bb135bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            ],
            "name":"Beanines",
            "quantity":quantity
          }
        ]
        ,
        description: description,
        payment_method_types: ['gcash'],
        success_url: String(process.env.NEXTAUTH_URL),
        cancel_url: String(process.env.NEXTAUTH_URL),
      }
    }
  };

  let conn = null
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Error creating checkout session :', response.statusText);
      throw new Error(`Error: ${response.status}`);
    }

    
    conn = await pool.getConnection()
    const arr = [1, postId]
    const sql = "UPDATE posts SET quantity = (quantity - ?) WHERE post_id = ? AND quantity != 0"
    const [result] = await conn.execute<ResultSetHeader>(sql, arr)
    if (result.affectedRows === 0)
      return NextResponse.json({ type: "error", message: "Out of stock..." }, { status: 500 })

    const responseData = await response.json();
   return NextResponse.json({url:responseData.data.attributes.checkout_url})

  }catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}