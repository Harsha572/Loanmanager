import React, { useEffect, useState } from 'react';

const LoanList = ({ role }) => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      let url = '/api/loans';

      // Modify URL based on the role
      if (role === 'user') {
        url = '/api/loans/user';  // Fetch only the user's loans
      } else if (role === 'verifier') {
        url = '/api/loans/pending';  // Fetch only loans with "pending" status
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoans(data);
        } else {
          const result = await response.json();
          setError(result.message || 'Error fetching loan data');
        }
      } catch (error) {
        setError('Error fetching loan data');
      }
    };

    fetchLoans();
  }, [role]);

  return (
    <div>
      <h2>Loan Applications</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li key={loan.id}>
              <h3>Loan Amount: {loan.amount}</h3>
              <p>Term: {loan.term} months</p>
              <p>Reason: {loan.reason}</p>
              <p>Status: {loan.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanList;
