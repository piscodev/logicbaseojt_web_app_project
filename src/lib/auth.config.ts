import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthConfig =
{
    providers: [
        GoogleProvider(
        {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        },)
    ],
    session: {
        strategy: 'jwt',
    },
    // cookies: {
    //     sessionToken: {
    //         name: 'next-auth.session-token',
    //         options: {
    //             httpOnly: true,
    //             sameSite: 'lax',
    //             path: '/',
    //             secure: false,
    //         },
    //     },
    // },
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
}