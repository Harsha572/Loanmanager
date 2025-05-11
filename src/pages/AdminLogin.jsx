import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'Anupamareddy' && password === 'Anupama573@') {
      // Set admin role and proceed to the dashboard
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Admin Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login as Admin</button>
    </form>
  );
};

export default AdminLogin;
