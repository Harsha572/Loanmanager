import { useEffect, useState } from 'react';
import axios from 'axios';
import LoanStats from './LoanStats'; // Adjust if the path differs

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await axios.get('http://localhost:5000/api/loans');
    setLoans(res.data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/loans/${loanId}/status`,
        { status: newStatus },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      fetchLoans();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };


  return (
    <div>
      
      <LoanStats />

      <h3>All Loans</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant</th>
            <th>Amount</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.applicant_name}</td>
              <td>{loan.amount}</td>
              <td>{loan.purpose}</td>
              <td>{loan.status}</td>
              <td>
                <select
                  id={`status-select-${loan.id}`}
                  value={loan.status}
                  onChange={e => handleStatusChange(loan.id, e.target.value)}
                  disabled={loan.status === 'approved' || loan.status === 'rejected'}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;
