import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'
// import { auth } from '@/auth'
// import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest)
{
    const secret = process.env.NEXTAUTH_SECRET!
    console.log('secret: ', secret)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })
    console.log('token: ', token)
    // const { pathname } = req.nextUrl


    if (!token)
        return NextResponse.redirect(new URL('/login', req.url))

    return NextResponse.next()
}

export const config =
{
    //   matcher: ['/((?!api|_next|favicon.ico|callback|auth|login).*)'], // exclude api, _next, favicon
    matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login|callback|auth|.png|assets).*)'], // exclude matcher; grabe nga fix ni pang 1 week huuuuuuaahhhhh
    runtime: 'nodejs',
}