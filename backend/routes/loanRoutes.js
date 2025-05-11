const express = require('express');
const router = express.Router();
const { addLoan, getLoans, changeLoanStatus } = require('../controllers/loanController');
const pool = require('../db');

// Create loan
router.post('/', addLoan);

// Get loans (query by userId or status if provided)
router.get('/', getLoans);

// Get all loans by user ID
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM loans WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user loans:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all pending loans (for verifier)
router.get('/pending', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM loans WHERE status = 'pending'");
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pending loans:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update loan status
router.put('/loans/:id/status', changeLoanStatus);

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM loans');
    const approvedRes = await pool.query("SELECT COUNT(*) FROM loans WHERE status = 'approved'");
    const rejectedRes = await pool.query("SELECT COUNT(*) FROM loans WHERE status = 'rejected'");
    const pendingRes = await pool.query("SELECT COUNT(*) FROM loans WHERE status = 'pending'");

    res.json({
      total: parseInt(totalRes.rows[0].count),
      approved: parseInt(approvedRes.rows[0].count),
      rejected: parseInt(rejectedRes.rows[0].count),
      pending: parseInt(pendingRes.rows[0].count),
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
