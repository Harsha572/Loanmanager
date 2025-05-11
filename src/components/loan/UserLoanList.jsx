import React from 'react';

const UserLoanList = ({ loans }) => {
  return (
    <div>
      <h2>Your Loan Applications</h2>
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

export default UserLoanList;
