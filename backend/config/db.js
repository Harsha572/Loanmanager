// backend/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'loanmanager',
  password: 'Harshabanty572@',
  port: 5432,
});

module.exports = pool;
