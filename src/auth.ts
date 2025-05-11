import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { authConfig } from "@/lib/auth.config";
//import { PrismaAdapter } from "@auth/prisma-adapter";
import Snowflake from "@/lib/snowflake_tinapa/snowflake";
import { FieldPacket } from "mysql2";
import db from "./lib/database/db";

interface userRow
{
    user_id: string
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(
{
    ...authConfig,
    session: {
        strategy: "jwt",
        maxAge: 86400, // session expires in 1 day
    },
    // jwt: {
    //     encode: async ({ token, secret }) => {
    //         return JSON.stringify(token);
    //     },
    //     decode: async ({ token, secret }) => {
    //         return JSON.parse(token || "{}");
    //     }
    // },
    pages: {
        signIn: "/",
        signOut: "/logout",
    },
    callbacks:
    {
        async jwt({ token, user, profile }): Promise<JWT>
        {
            if (user)
            {
                // get user from db with the email
                // if there is no user with the email, create new user
                // else set the user data to token

                let conn = null
                // const snowflake = new Snowflake()
                // const generatedId = snowflake.GenerateID()

                conn = await db.getConnection()
                const checkUser = "SELECT * FROM users WHERE email = ? LIMIT 1"
                const [row_check]: [userRow[], FieldPacket[]] = await conn.query(checkUser, [user.email]) as [userRow[], FieldPacket[]]
                if (row_check.length === 0)
                {
                    const snowflake = new Snowflake()
                    const generatedId = snowflake.GenerateID()

                    let birthdate = null
                    if (profile?.birthdate)
                    {
                        const parsedDate = new Date(profile.birthdate)
                        if (!isNaN(parsedDate.getTime()))
                            birthdate = parsedDate.toISOString() // Ensure ISO-8601 format
                    }

                    let data = new Array()
                    try
                    {
                        data.push({
                            google_id: user.id || "",
                            email: user.email || "",
                            //name: `${profile?.name || ""} ${profile?.family_name ?? ""}`,
                            first_name: profile?.given_name || "",
                            last_name: profile?.family_name || "",
                            profile_image: profile?.picture || "",
                            hashed_password: "",
                            address: "",
                            contact_number: profile?.phone_number || null,
                            gender: "",
                            birthdate: birthdate || null,
                        })
                    } catch (error) {
                        console.error(error)

                        data.push({
                            google_id: user.id || "",
                            email: user.email || "",
                            //name: `${profile?.name || ""} ${profile?.family_name ?? ""}`,
                            first_name: profile?.given_name || "",
                            last_name: profile?.family_name || "",
                            profile_image: profile?.picture || "",
                            hashed_password: "",
                            address: "",
                            contact_number: null,
                            gender: "",
                            birthdate: birthdate || null,
                        })
                    }

                    const udata = data[0]
                    const newUser = "INSERT INTO users (user_id, google_id, email, first_name, last_name, profile_image, contact_number, birthdate, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
                    // const [result] : [ResultSetHeader, FieldPacket[]] = await conn.execute(newUser, [generatedId, udata.google_id, udata.email, udata.first_name, udata.last_name, udata.contact_number, udata.birthdate || null]) as [ResultSetHeader, FieldPacket[]]
                    await conn.execute(newUser, [generatedId, udata.google_id, udata.email, udata.first_name, udata.last_name, udata.profile_image, udata.contact_number, udata.birthdate || null])

                    token.userId = generatedId
                    console.log("User created: ", generatedId)

                    await conn.execute("UPDATE users SET last_login = NOW() WHERE user_id = ?", [generatedId])
                } else if (row_check.length > 0) {
                    const userRow = row_check[0]
                    console.log("User found: ", userRow.user_id)
                    token.userId = userRow.user_id

                    await conn.execute("UPDATE users SET last_login = NOW() WHERE user_id = ?", [userRow.user_id])
                    // console.log("User created: ", userRow.user_id.toString())
                }
            }

            return token
        },

        async session({ session, token })
        {
            if (token)
            {
                // set the token data to session
                session.user.id = token.userId as string
            }

            return session
        },

        redirect({ url, baseUrl })
        {
            if (url === '/api/auth/signout')
            {
                // User is logging out, redirect to a specific page
                return baseUrl + '/logout'
            }

            if (url.startsWith(baseUrl))
                return url

            if (url.startsWith("/"))
                return baseUrl + url

            return baseUrl
            // } else if (url === '/api/auth/callback')
            // {
            //     // User is logging in, generate ID and redirect to create password page
            //     const snowflake = new Snowflake()
            //     const generatedId = snowflake.GenerateID().toString()
            //     return baseUrl + "/create-password?userId=" + generatedId
            // }

            // return "/"
        },
    }
})

export { authConfig }