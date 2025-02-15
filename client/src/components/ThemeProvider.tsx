import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed', // Vivid purple
      light: '#9d6ef4',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b21a8', // Darker purple
      light: '#8b5cf6',
      dark: '#4c1d95',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f7ff',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: 8,
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={muiTheme}>
      {children}
    </MUIThemeProvider>
  );
}