import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ selectedRole, setSelectedRole }) => {
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role === 'verifier') navigate('/login/verifier');
    else if (role === 'admin') navigate('/login/admin');
  };

  return (
    <nav>
      <h1>Loan Manager</h1>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
      >
        <option value="user">User</option>
        <option value="verifier">Verifier</option>
        <option value="admin">Admin</option>
      </select>
    </nav>
  );
};

export default Navbar;
