import { useEffect, useState } from 'react';
import axios from 'axios';

const LoanStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/loans/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <div>Total Loans: {stats.total}</div>
      <div>Approved: {stats.approved}</div>
      <div>Rejected: {stats.rejected}</div>
      <div>Pending: {stats.pending}</div>
    </div>
  );
};

export default LoanStats;
