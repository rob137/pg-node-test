const db = require('../models/database');

function readUsers(req, res) {
  db.query('SELECT * FROM users', [], (err, dbRes) => {
    if (err) { return handleError(res, err); }
    return res.send(dbRes.rows[0]);
  });
}

function handleError(res, err) {
  if (err.errno === 'ECONNREFUSED') {
    return res.status(500).send({ error: 'Unable to connect to database' });
  } else {
    return res.status(500).send({ error: 'Something went wrong' });
  }
}

module.exports = { readUsers };
