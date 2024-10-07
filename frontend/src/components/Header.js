import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Link } from 'react-router-dom'; // Import Link for routing
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { logout } = useContext(AuthContext); // Access logout from AuthContext
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Call the logout function
        navigate('/')
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Stock Trading Dashboard
                </Typography>
                <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/portfolio">
                    Portfolio
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
