import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoanFormModal from '../components/LoanFormModal';
import UserLoanList from '../components/loan/UserLoanList';

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
      fetchLoans(user.id);
    }
  }, []);

  const fetchLoans = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/loans/user/${id}`);
      setLoans(res.data);
    } catch (error) {
      console.error('Error fetching user loans:', error);
    }
  };

  const handleLoanAdded = () => {
    if (userId) {
      fetchLoans(userId);
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Your Loan Applications</h2>
      <button onClick={() => setShowModal(true)}>Apply for Loan</button>

      <UserLoanList loans={loans} />

      {showModal && (
        <LoanFormModal
          userId={userId}
          onClose={() => setShowModal(false)}
          onLoanAdded={handleLoanAdded}
        />
      )}
    </div>
  );
};

export default UserDashboard;
