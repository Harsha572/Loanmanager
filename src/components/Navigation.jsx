import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const goToDashboard = () => {
    if (role === 'user') {
      navigate('/dashboard/user');
    } else if (role === 'verifier') {
      navigate('/dashboard/verifier');
    } else if (role === 'admin') {
      navigate('/dashboard/admin');
    }
  };

  return (
    <div>
      <p>Logged in as: {role}</p>
      <button onClick={goToDashboard}>Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navigation;
