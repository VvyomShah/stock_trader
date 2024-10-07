// src/pages/RegisterPage.js

import React, { useState } from 'react';
import BackgroundOverlay from '../components/BackgroundOverlay';
import CommonAuthForm from '../components/CommonAuthForm';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; // Import your registerUser function

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser(username, password); // Call the registerUser function

            // Assuming the response contains a status indicating success
            if (response[1] === 201) {
                // Redirect to User Home after successful registration
                navigate('/login');
            } else {
                // Handle registration failure
                setError('Registration failed. Please try again.'); // Set error message
            }
        } catch (err) {
            // Handle any errors that occurred during the registration
            setError('Registration failed. Please try again.'); // Set error message
        }
    };

    return (
        <BackgroundOverlay imageUrl={`${process.env.PUBLIC_URL}/Graphs-on-iPad.jpg`}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <CommonAuthForm
                username={username}
                password={password}
                onUsernameChange={handleUsernameChange}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                title="Register"
                buttonText="Register"
            />
        </BackgroundOverlay>
    );
};

export default RegisterPage;
