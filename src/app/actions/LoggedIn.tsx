'use client'

import React from 'react';
import Image from "next/image";
import { signOut } from 'next-auth/react';
import { doLogout } from "@/app/actions";
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const LoggedIn = () =>
{
    const { data: session } = useSession()
    if (!session?.user)
    {
        return (
            <>
                {/* <div className="py-2 px-1 border-white text-xs md:text-base md:py-1 md:px-2 border rounded hover:bg-slate-100 hover:text-black focus-visible:bg-slate-100 focus-visible:text-black"> */}
                    {/* <form action={doSocialLogin}>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => (document.querySelector('button[type="submit"]') as HTMLButtonElement)?.click()}>
                            <Image 
                                src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_sl.svg" 
                                width={25} 
                                height={25} 
                                alt={""}
                            />
                            <Button onClick={() => signIn("google")} className="ml-2" type="submit" name="action" value="google">Sign In</Button>
                        </div>
                    </form> */}
                    <Link
                        href="/login"
                        variant="body2"
                        color="primary"
                        sx={{ alignSelf: 'center', marginRight: 1 }}
                    >
                        Sign in
                    </Link>
                    <Button href="/signup" color="primary" variant="contained" size="small">
                        Sign up
                    </Button>
                {/* </div> */}
            </>
        )
    } else {

        return (
            <form action={doLogout}>
                <div onClick={() => signOut()} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Button startIcon={
                        <Image 
                            src={session?.user.image || "https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_sl.svg"}
                            width={25} 
                            height={25} 
                            alt={""}
                        />
                    }
                    className="ml-2" type="button" value="google">Log out</Button>
                </div>
            </form>
        )
    }
}

export default LoggedIn