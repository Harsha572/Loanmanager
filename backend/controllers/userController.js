const pool = require('../config/db'); // Your database connection pool
const bcrypt = require('bcryptjs');
const { findUserByUsername } = require('../models/userModel'); // Assuming this is already in place

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin and verifier credentials
  const adminCredentials = { username: 'Anupamareddy', password: 'Anupama573@' };
  const verifierCredentials = { username: 'Arjunreddy', password: 'Arjun572@' };

  try {
    // Admin login check
    if (username === adminCredentials.username && password === adminCredentials.password) {
      return res.json({
        message: 'Admin login successful',
        role: 'admin',
        user: { username },
      });
    }

    // Verifier login check
    if (username === verifierCredentials.username && password === verifierCredentials.password) {
      return res.json({
        message: 'Verifier login successful',
        role: 'verifier',
        user: { username },
      });
    }

    // Regular user login check (database check)
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If credentials are correct for a regular user
    res.json({
      message: 'User login successful',
      role: 'user',
      user: { id: user.id, full_name: user.full_name, username: user.username },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
};


// User registration function
exports.registerUser = async (req, res) => {
  const { fullName, address, username, password } = req.body;

  if (!fullName || !address || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const result = await pool.query(
      'INSERT INTO users (full_name, address, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [fullName, address, username, hashedPassword]
    );

    // Return the created user
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = { registerUser: exports.registerUser, loginUser: exports.loginUser };
