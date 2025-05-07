'use client'

import * as React from 'react';
import SignIn from '@/components/login/SignIn';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login()
{
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() =>
    {
        if (session?.user)
            router.replace('/')
    }, [session, router])

    if (status === 'loading')
        return null

    if (!session?.user)
        return <SignIn />

    return null // already redirected
}