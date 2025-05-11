import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoanList from '../components/loan/LoanList';
import LoanStatusUpdate from '../components/loan/LoanStatusUpdate';

const VerifierDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Fetch pending loans for verification
    axios.get('/api/loans/pending')
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
      });
  }, []);

  const handleApproval = (loanId) => {
    // Approve the loan
    axios.put(`/api/loans/${loanId}/status`, { status: 'approved', role: 'verifier' })
      .then(() => {
        setLoans(loans.filter(loan => loan.id !== loanId)); // Remove approved loan from list
      })
      .catch((error) => {
        console.error('Error updating loan status:', error);
      });
  };

  const handleRejection = (loanId) => {
    // Reject the loan
    axios.put(`/api/loans/${loanId}/status`, { status: 'rejected', role: 'verifier' })
      .then(() => {
        setLoans(loans.filter(loan => loan.id !== loanId)); // Remove rejected loan from list
      })
      .catch((error) => {
        console.error('Error updating loan status:', error);
      });
  };

  return (
    <div>
      <h1>Verifier Dashboard</h1>
      <LoanList role="verifier" />
      
      <div>
        {loans.map((loan) => (
          <div key={loan.id}>
            <p>{loan.applicant_name} - {loan.amount} - {loan.purpose}</p>
            <LoanStatusUpdate loanId={loan.id} currentStatus={loan.status} />
            <button onClick={() => handleApproval(loan.id)}>Approve</button>
            <button onClick={() => handleRejection(loan.id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifierDashboard;
