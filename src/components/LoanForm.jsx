import { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
  const [form, setForm] = useState({ applicant_name: '', amount: '', purpose: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/loans', form);
      alert('Loan submitted!');
      setForm({ applicant_name: '', amount: '', purpose: '' });
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Loan Dashboard</h2>
      <input name="applicant_name" placeholder="Name" value={form.applicant_name} onChange={handleChange} required />
      <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required />
      <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} />
      <button type="submit">Apply for Loan</button>
    </form>
  );
};

export default LoanForm;
