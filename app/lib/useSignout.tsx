'use client';

import {useSession, signOut} from 'next-auth/react';

export function useSignOut() {
  const {status} = useSession();

  return async () => {
    if (status === 'authenticated') {
      await signOut();
    }
  };
}
