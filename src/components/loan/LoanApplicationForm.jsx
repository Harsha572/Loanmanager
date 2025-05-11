import React, { useState } from 'react';

const LoanApplicationForm = () => {
  const [loanData, setLoanData] = useState({
    amount: '',
    term: '',
    reason: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loanData.amount || !loanData.term || !loanData.reason) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(loanData),
      });

      if (response.ok) {
        setError(null);
        alert('Loan application submitted successfully');
        setLoanData({ amount: '', term: '', reason: '' });
      } else {
        const result = await response.json();
        setError(result.message || 'Error submitting loan application');
      }
    } catch (error) {
      setError('Error submitting loan application');
    }
  };

  return (
    <div>
      <h2>Loan Application</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan Amount:</label>
          <input
            type="number"
            name="amount"
            value={loanData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Term (in months):</label>
          <input
            type="number"
            name="term"
            value={loanData.term}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Reason for Loan:</label>
          <textarea
            name="reason"
            value={loanData.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
