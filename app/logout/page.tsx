'use client';

import {useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';

export default function LogoutPage() {
  const {status} = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    if (status === 'authenticated') {
      signOut({redirect: false}).then(() => {
        router.push(callbackUrl || '/');
      });
    } else {
      router.push('/');
    }
  }, [status, router, callbackUrl]);

  if (status === 'loading') {
    return <div>Signing out...</div>;
  }

  return null;
}
