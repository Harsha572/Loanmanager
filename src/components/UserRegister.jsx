import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    username: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">User Registration</h2>
      <input className="input" name="full_name" placeholder="Full Name" onChange={handleChange} required />
      <input className="input" name="address" placeholder="Address" onChange={handleChange} required />
      <input className="input" name="username" placeholder="Username" onChange={handleChange} required />
      <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button className="btn">Register</button>
    </form>
  );
};

export default UserRegister;
