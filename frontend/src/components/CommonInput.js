// src/components/CommonInput.js

import React from 'react';
import { TextField } from '@mui/material';

const CommonInput = ({ label, value, onChange, type = 'text' }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            variant="outlined" // You can choose 'filled' or 'standard' based on your design
            fullWidth
            margin="normal"
            // Using sx prop to set styles directly from the theme
            sx={{
                '& .MuiInputBase-root': {
                    color: 'white', // Input text color from the theme
                },
                '& .MuiInputLabel-root': {
                    color: 'white', // Label color from the theme
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Border color from the theme
                },
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Border color on hover from the theme
                },
                '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Border color when focused from the theme
                },
            }}
        />
    );
};

export default CommonInput;
