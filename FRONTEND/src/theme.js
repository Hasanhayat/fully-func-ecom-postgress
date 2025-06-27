// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    // 🎨 Custom Tailwind-based colors
    primary: {
      main: '#a682ff', // Tropical Indigo
    },
    secondary: {
      main: '#715aff', // Medium Slate Blue
    },
    background: {
      default: '#102e4a', // Prussian Blue
      paper: '#1a365e',   // Darker variant of Prussian Blue (or a lighter tone if needed)
    },
    text: {
      primary: '#ddf3ff', // Light from Maya Blue 900
      secondary: '#bccfff', // Cornflower Blue 800
    },
    info: {
      main: '#55c1ff', // Maya Blue
    },
    success: {
      main: '#5887ff', // Cornflower Blue
    },
  },

  typography: {
    fontFamily: `'Segoe UI', sans-serif`,
    allVariants: {
      color: '#dde7ff', // Set default text color
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a365e', // Paper background
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
