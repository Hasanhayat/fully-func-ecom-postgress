// src/theme.js
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#af8d86', // Warm pink
    },
    secondary: {
      main: '#edbfc6', // Light pink
    },
    background: {
      default: '#260c1a', // Base background
      paper: '#432e36',   // Card/background
    },
    text: {
      primary: '#edbfc6',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: `'Segoe UI', sans-serif`,
  },
});

export default theme;
