'use client';

import {Provider as JotaiProvider} from 'jotai';
import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {theme} from '@/app/lib/theme';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <JotaiProvider>
      <SessionProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </SessionProvider>
    </JotaiProvider>
  );
}
