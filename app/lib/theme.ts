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
    customErrorDark?: {
      main: string;
      contrastText?: string;
    };
    gray?: {
      main: string;
      contrastText?: string;
    };
    gray80?: {
      main: string;
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
    customErrorDark?: {
      main: string;
      contrastText?: string;
    };
    gray?: {
      main: string;
      contrastText?: string;
    };
    gray80?: {
      main: string;
    };
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    successDark: true;
    warningDark: true;
    customError: true;
    customErrorDark: true;
    infoDark: true;
    gray: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray80: true;
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
      contrastText: '#0BB07B'
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
    customErrorDark: {
      main: '#383559',
      contrastText: '#F03D3D'
    },
    info: {
      main: '#4070F4'
    },
    gray: {
      main: '#E8EBEA',
      contrastText: '#303E38'
    },
    gray80: {
      main: '#303E38'
    }
  }
});
