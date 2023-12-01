import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7D4E57', // Rose Taupe
    },
    secondary: {
      main: '#333333', // Dark Grey
    },
    background: {
      default: '#333333', // Dark Grey
    },
    box: {
      main: '#E0E0E0', // Light Grey
    },
    text: {
      primary: '#FFFFFF', // White
    },
  },
});

export default theme;
