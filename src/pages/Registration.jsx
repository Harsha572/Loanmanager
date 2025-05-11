import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Update import

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', formData);
      if (res.status === 201) {
        navigate('/login');  // Redirect to login after successful registration
      }
    } catch (err) {
      console.error('Registration error', err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName}
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          value={formData.address}
          onChange={handleChange} 
          required
        />
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username}
          onChange={handleChange} 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange} 
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
