'use client'

import { useEffect } from "react";
import Homepage from "@/components/home-page/Homepage";
// import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation"; 

export default function HomePage()
{
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() =>
    {
        const test = async () =>
        {
            const mathcer = '/((?!api/auth|_next/static|_next/image|favicon.ico|login|callback|auth|.png|assets).*)'
            if (pathname.match(mathcer))
            {
                const res = await fetch("/api/auth/session")
                const data = await res.json()
                if (!data?.user)
                    router.replace("/login")
            }
        }

        test()
    }, [])

    // if (!session)
    //    return null

    return <Homepage />
}