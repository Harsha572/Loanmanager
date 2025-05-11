const pool = require('../db');

const createLoan = async (data) => {
  const { applicant_name, amount, purpose, user_id } = data;
  try {
    const res = await pool.query(
      'INSERT INTO loans (applicant_name, amount, purpose, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [applicant_name, amount, purpose, user_id]
    );
    return res.rows[0];
  } catch (err) {
    console.error('Error creating loan:', err);
    throw new Error('Failed to create loan');
  }
};

const getAllLoans = async () => {
  try {
    const res = await pool.query('SELECT * FROM loans ORDER BY created_at DESC');
    return res.rows;
  } catch (err) {
    console.error('Error fetching loans:', err);
    throw new Error('Failed to fetch loans');
  }
};

const getLoansByUserId = async (userId) => {
  try {
    const res = await pool.query('SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return res.rows;
  } catch (err) {
    console.error('Error fetching loans by user ID:', err);
    throw new Error('Failed to fetch loans by user ID');
  }
};

const getLoanById = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM loans WHERE id = $1', [id]);
    return res.rows[0];
  } catch (err) {
    console.error('Error fetching loan by ID:', err);
    throw new Error('Failed to fetch loan by ID');
  }
};

const updateLoanStatus = async (id, status, role) => {
  try {
    let query, values;

    if (role === 'admin') {
      query = `
        UPDATE loans 
        SET status = $1, final_status = $1, finalized_by = 'admin' 
        WHERE id = $2 
        RETURNING *;
      `;
      values = [status, id];
    } else {
      query = `
        UPDATE loans 
        SET status = $1 
        WHERE id = $2 
        RETURNING *;
      `;
      values = [status, id];
    }

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error in updateLoanStatus:', err);
    throw err;
  }
};



module.exports = { createLoan, getAllLoans, getLoansByUserId, updateLoanStatus, getLoanById };
