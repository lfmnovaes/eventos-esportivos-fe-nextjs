'use client';

import {Provider as JotaiProvider} from 'jotai';
import type {Theme, Palette, PaletteOptions} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material';
import {space_grotesk} from '@/app/ui/fonts';

const theme: Theme = createTheme({
  typography: {
    fontFamily: space_grotesk.style.fontFamily
  },
  palette: {
    warning: {
      main: "#dbece2",
      contrastText: "#616161"
    }
  }
});

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </JotaiProvider>
  );
}
