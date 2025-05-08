'use client'

// import { useEffect } from "react";
import Homepage from "@/components/home-page/Homepage";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation"; 

export default function HomePage()
{
    // const { data: session } = useSession()
    // const router = useRouter()

    // useEffect(() =>
    // {
    //     if (!session?.user)
    //         router.replace("/login")
    // }, [session, router])

    // if (!session)
    //    return null

    return <Homepage />
}