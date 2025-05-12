const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async ({ full_name, address, username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await pool.query(
      'INSERT INTO users (full_name, address, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, address, username, hashedPassword]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Failed to create user');
  }
};

const findUserByUsername = async (username) => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0];
  } catch (err) {
    console.error('Error fetching user by username:', err);
    throw new Error('Failed to find user');
  }
};

module.exports = {
  createUser,
  findUserByUsername,
};
