import React, { useState } from 'react';
import axios from 'axios';

const LoanFormModal = ({ userId, onClose, onLoanAdded }) => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    amount: '',
    purpose: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/loans', {
        ...formData,
        user_id: userId
      });
      onLoanAdded();
    } catch (error) {
      console.error('Error submitting loan:', error);
    }
  };

  return (
    <div>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="applicant_name"
          placeholder="Name"
          value={formData.applicant_name}
          onChange={handleChange}
        />
        <input
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default LoanFormModal;
