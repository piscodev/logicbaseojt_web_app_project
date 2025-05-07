'use client'

import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from './login/CustomIcons';
import { usePathname } from 'next/navigation';
import { doSocialLogin } from '@/app/actions';

export function SocialLoginButton({ provider }: { provider: string })
{
    const pathname = usePathname()
    const handleLogin = async () => await signIn(provider, { callbackUrl: '/' })

    return (
        <form action={doSocialLogin}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => (document.querySelector('button[type="submit"]') as HTMLButtonElement)?.click()}>
                <Button
                    fullWidth
                    variant="outlined"
                    // onClick={() => signIn('google', { callbackUrl: '/' })}
                    onClick={handleLogin}
                    startIcon={<GoogleIcon />}
                    type="submit"
                    name="action"
                    value="google"
                >
                    {pathname === '/login' ? "Sign in with Google" : "Sign up with Google"}
                </Button>
            </div>
        </form>
    )
}