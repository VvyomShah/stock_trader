// src/components/CommonAuthForm.js

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CommonInput from './CommonInput'; // Corrected import here

const CommonAuthForm = ({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    title,
    buttonText
}) => {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Typography variant="h4" color="white" marginBottom={2}>
                {title}
            </Typography>
            <CommonInput
                label="Username"
                value={username}
                onChange={onUsernameChange}
            />
            <CommonInput
                label="Password"
                value={password}
                onChange={onPasswordChange}
                type="password"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
            >
                {buttonText}
            </Button>
        </Box>
    );
};

export default CommonAuthForm;
