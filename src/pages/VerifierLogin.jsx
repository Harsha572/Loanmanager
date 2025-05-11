import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifierLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'Arjunreddy' && password === 'Arjun572@') {
      // Set verifier role and proceed to the dashboard
      localStorage.setItem('role', 'verifier');
      navigate('/verifier-dashboard');
    } else {
      alert('Invalid verifier credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Verifier Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login as Verifier</button>
    </form>
  );
};

export default VerifierLogin;
