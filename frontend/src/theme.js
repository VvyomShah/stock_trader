// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Primary color
        },
        text: {
            primary: '#000', // Set default text color to white
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h2: {
            fontSize: '2rem',
            color: '#ffffff', // Set heading color
        },
        body1: {
            color: '#ffffff', // Set body text color
        },
    },
});

export default theme;
