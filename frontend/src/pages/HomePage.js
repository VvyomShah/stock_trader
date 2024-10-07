// src/pages/HomePage.js

import React from 'react';
import { Typography, Button, Box } from '@mui/material'; // Import Box here
import { Link } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';

const HomePage = () => {
    return (
        <BackgroundOverlay imageUrl={`${process.env.PUBLIC_URL}/Graphs-on-iPad.jpg`}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center" // Center text alignment
            >
                <Typography variant="h2" gutterBottom color="white">
                    Welcome to Stock Trader
                </Typography>
                <Typography variant="h5" paragraph color="white">
                    Experience the ultimate stock trading platform!
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mt={2}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            Register
                        </Button>
                    </Link>
                </Box>
            </Box>
        </BackgroundOverlay>
    );
};

export default HomePage;
