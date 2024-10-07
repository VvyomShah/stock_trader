// src/components/BackgroundOverlay.js

import React from 'react';
import { Box } from '@mui/material';

const BackgroundOverlay = ({ children, imageUrl }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            position="relative"
            sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
                    zIndex: 1, // Overlay's z-index
                },
                zIndex: 0, // Ensure the Box itself has a lower z-index
            }}
        >
            <Box zIndex={2}> {/* Ensure children are above the overlay */}
                {children}
            </Box>
        </Box>
    );
};

export default BackgroundOverlay;
