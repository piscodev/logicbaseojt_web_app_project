'use client'

import React from 'react';
import Image from "next/image";
import { signOut } from 'next-auth/react';
import { doLogout } from "@/app/actions";
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const ProfileMenuComponent = () =>
{
    const { data: session } = useSession()
    if (session?.user)
    {
        return (
            <form action={doLogout}>
                <div onClick={() => signOut()} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    Log out
                </div>
            </form>
        )
    } else return ''
}

export default ProfileMenuComponent