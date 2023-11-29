const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'reactlogin'
});

module.exports = { pool };