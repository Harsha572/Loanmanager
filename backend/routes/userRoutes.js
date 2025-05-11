const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const pool = require('../config/db');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows); // Sending the list of users in response
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
