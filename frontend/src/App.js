import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// PrivateRoute component to handle authentication and loading state
// const PrivateRoute = ({ element }) => {
//   const { auth, loading } = useContext(AuthContext);

//   // Wait until the loading state is resolved
//   if (loading) {
//     return <div>Loading...</div>; // Display a loading message or spinner
//   }

//   // If user is authenticated, render the element, otherwise redirect to login
//   return auth ? element : <Navigate to="/login" />;
// };

export default App;
