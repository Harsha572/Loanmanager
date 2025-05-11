import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (selectedRole === 'user') {
      navigate('/register');
    }
  };

  const handleLogin = () => {
    if (selectedRole === 'user') {
      navigate('/login');
    } else if (selectedRole === 'verifier') {
      navigate('/verifier-login');
    } else if (selectedRole === 'admin') {
      navigate('/admin-login');
    }
  };

  return (
    <div>
      <h1>Loan Manager</h1>
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="verifier">Verifier</option>
        <option value="admin">Admin</option>
      </select>

      {selectedRole === 'user' && (
        <div>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {(selectedRole === 'verifier' || selectedRole === 'admin') && (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Home;
