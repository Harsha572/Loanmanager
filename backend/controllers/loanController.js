// controllers/loanController.js
const { createLoan, getAllLoans, getLoansByUserId, updateLoanStatus, getLoanById } = require('../models/loanModel');

exports.addLoan = async (req, res) => {
  try {
    const newLoan = await createLoan(req.body);
    res.status(201).json(newLoan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create loan' });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const { userId, status } = req.query;

    if (userId) {
      const userLoans = await getLoansByUserId(userId);
      return res.json(userLoans);
    }

    if (status) {
      const result = await pool.query('SELECT * FROM loans WHERE status = $1 ORDER BY created_at DESC', [status]);
      return res.json(result.rows);
    }

    const loans = await getAllLoans();
    res.json(loans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
};

exports.changeLoanStatus = async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  try {
    const loan = await getLoanById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // If already approved/rejected by admin, don't allow change
    if ((loan.status === 'approved' || loan.status === 'rejected') && loan.finalized_by === 'admin') {
      return res.status(403).json({ error: 'Status already finalized by admin' });
    }

    const updated = await updateLoanStatus(id, status, role);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating status' });
  }
};
