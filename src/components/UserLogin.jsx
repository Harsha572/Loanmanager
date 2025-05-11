import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', credentials);
      localStorage.setItem('userId', res.data.user.id);
      navigate('/dashboard/user');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Login</h2>
      <input className="input" name="username" placeholder="Username" onChange={handleChange} required />
      <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className="btn">Login</button>
    </form>
  );
};

export default UserLogin;
