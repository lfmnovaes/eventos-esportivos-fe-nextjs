import type {Theme} from '@mui/material';
import {createTheme} from '@mui/material';
import {space_grotesk} from '@/app/ui/fonts';

export const theme: Theme = createTheme({
  typography: {
    fontFamily: space_grotesk.style.fontFamily,
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    success: {
      main: '#C4E6DB',
      contrastText: '#0BB07B'
    },
    warning: {
      main: '#FAEDD3',
      contrastText: '#FFAD0D'
    },
    error: {
      main: '#FDECEC',
      contrastText: '#F03D3D'
    },
    info: {
      main: '#4070F4'
    }
  }
});
