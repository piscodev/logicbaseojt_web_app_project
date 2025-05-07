'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
cssVariables: true, // to enable theme
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;