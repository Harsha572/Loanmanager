import React from 'react';

const LoanCard = ({ loan }) => {
  return (
    <div>
      <p><strong>Name:</strong> {loan.applicant_name}</p>
      <p><strong>Amount:</strong> {loan.amount}</p>
      <p><strong>Purpose:</strong> {loan.purpose}</p>
      <p><strong>Status:</strong> {loan.status}</p>
    </div>
  );
};

export default LoanCard;
