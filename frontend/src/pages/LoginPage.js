// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';
import CommonAuthForm from '../components/CommonAuthForm';
import { loginUser } from '../services/authService'; // Make sure this service is set up to handle the login request.
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for managing authentication state

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error handling
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login function from AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error state
        try {
            const data = await loginUser(username, password); // Call the loginUser function
            login(data[0]['access_token']); // Set the token in AuthContext
            navigate('/dashboard'); // Redirect to UserHome page after successful login
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials."); // Update error state for user feedback
        }
    };

    return (
        <BackgroundOverlay imageUrl={`${process.env.PUBLIC_URL}/Graphs-on-iPad.jpg`}>
            <CommonAuthForm
                username={username}
                password={password}
                onUsernameChange={(e) => setUsername(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleSubmit}
                title="Login"
                buttonText="Login"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
        </BackgroundOverlay>
    );
};

export default LoginPage;
