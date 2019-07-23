const { Pool } = require('pg');

// .env file must set PGUSER, PGDATABASE
const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
