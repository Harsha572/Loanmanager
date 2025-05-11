import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Registration from './pages/Registration'; 
import AdminLogin from './pages/AdminLogin'; 
import VerifierLogin from './pages/VerifierLogin'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verifier-login" element={<VerifierLogin />} />

        {/* Protected Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/verifier-dashboard" element={<VerifierDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
