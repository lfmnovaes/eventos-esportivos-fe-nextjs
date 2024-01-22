'use client';

import {useSignOut} from '@/app/lib/useSignout';
import {Button} from '@mui/material';

export default function DashboardPage() {
  const signOut = useSignOut();

  return (
    <div className="flex flex-col p-16">
      <h1>Protected dashboard page</h1>
      <Button className="w-fit" variant="contained" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
}
