import React, { useState } from 'react';

const LoanStatusUpdate = ({ loanId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState(null);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const response = await fetch(`/api/loans/${loanId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus, role: 'admin' }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || 'Error updating loan status');
      } else {
        setError(null);
        alert('Loan status updated successfully');
      }
    } catch (error) {
      setError('Error updating loan status');
    }
  };

  return (
    <div>
      <h3>Change Loan Status</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
};

export default LoanStatusUpdate;
