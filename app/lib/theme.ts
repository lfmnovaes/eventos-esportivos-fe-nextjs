import type {Theme} from '@mui/material';
import {createTheme} from '@mui/material';
import {space_grotesk} from '@/app/ui/fonts';

declare module '@mui/material/styles' {
  interface Palette {
    successDark?: {
      main: string;
      contrastText?: string;
    };
    warningDark?: {
      main: string;
      contrastText?: string;
    };
    customError?: {
      main: string;
      contrastText?: string;
    };
    errorDark?: {
      main: string;
      contrastText?: string;
    };
  }
  interface PaletteOptions {
    successDark?: {
      main: string;
      contrastText?: string;
    };
    warningDark?: {
      main: string;
      contrastText?: string;
    };
    customError?: {
      main: string;
      contrastText?: string;
    };
    errorDark?: {
      main: string;
      contrastText?: string;
    };
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    successDark: true;
    warningDark: true;
    customError: true;
    errorDark: true;
    infoDark: true;
  }
}

export const theme: Theme = createTheme({
  typography: {
    fontFamily: space_grotesk.style.fontFamily,
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    success: {
      main: '#CEEFE5',
      contrastText: '#0BB07B'
    },
    successDark: {
      main: '#023034',
      contrastText: '#0BB07B',
    },
    warning: {
      main: '#FAEDD3',
      contrastText: '#FFAD0D'
    },
    warningDark: {
      main: '#3B4C50',
      contrastText: '#FFAD0D'
    },
    customError: {
      main: '#FDECEC',
      contrastText: '#F03D3D'
    },
    errorDark: {
      main: '#383559',
      contrastText: '#F03D3D'
    },
    info: {
      main: '#4070F4'
    }
  }
});
