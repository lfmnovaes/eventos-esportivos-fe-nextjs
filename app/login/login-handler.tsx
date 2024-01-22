'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

interface LoginHandlerProps {
  email: string;
  password: string;
  setLoginError: (error: string) => void;
}

export default function LoginHandler({email, password, setLoginError}: LoginHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isLoggingIn && email && password) {
    setIsLoggingIn(true);
    signIn('credentials', {
      email,
      password,
      redirect: false
    })
      .then((result) => {
        if (result?.error) {
          setLoginError(result.error);
          setIsLoggingIn(false);
        } else {
          const callbackUrl = searchParams.get('callbackUrl');
          router.push(callbackUrl || '/');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setIsLoggingIn(false);
      });
  }

  return null;
}
