import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoanList from '../components/loan/LoanList';
import LoanStatusUpdate from '../components/loan/LoanStatusUpdate';

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Fetch all loans (not just pending ones) for admin review
    axios.get('/api/loans')
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
      });
  }, []);

  const handleApproval = (loanId) => {
    // Approve the loan
    axios.put(`/api/loans/${loanId}/status`, { status: 'approved', role: 'admin' })
      .then(() => {
        setLoans(loans.filter(loan => loan.id !== loanId)); // Remove approved loan from list
      })
      .catch((error) => {
        console.error('Error updating loan status:', error);
      });
  };

  const handleRejection = (loanId) => {
    // Reject the loan
    axios.put(`/api/loans/${loanId}/status`, { status: 'rejected', role: 'admin' })
      .then(() => {
        setLoans(loans.filter(loan => loan.id !== loanId)); // Remove rejected loan from list
      })
      .catch((error) => {
        console.error('Error updating loan status:', error);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <LoanList role="admin" />
      <div>
        {loans.map((loan) => (
          <div key={loan.id}>
            <p>{loan.applicant_name} - {loan.amount} - {loan.purpose} - {loan.status}</p>
            <LoanStatusUpdate loanId={loan.id} currentStatus={loan.status} role="admin"/>
            <button onClick={() => handleApproval(loan.id)}>Approve</button>
            <button onClick={() => handleRejection(loan.id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
