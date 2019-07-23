const db = require('../models/database');

function insertUser(req, res) {
  const text = 'INSERT INTO users(email, admin) VALUES($1, $2)';
  const { email, admin } = req.body;
  const values = [email, admin];
  db.query(text, values, (err, dbRes) => {
    if (err) { return handleError(res, err); }
    return res.send(dbRes);
  });
}

function readUsers(req, res) {
  db.query('SELECT * FROM users', [], (err, dbRes) => {
    if (err) { return handleError(res, err); }
    return res.send(dbRes.rows);
  });
}

function deleteUser(req, res) {
  const text = 'DELETE FROM users WHERE email = $1';
  db.query(text, [req.body.email], (err, dbRes) => {
    if (err) { return handleError(res.err); }
    return res.send(dbRes);
  })
}

function handleError(res, err) {
  console.error(err);
  if (err.errno === 'ECONNREFUSED') {
    return res.status(500).send({ error: 'Unable to connect to database' });
  } else {
    return res.status(500).send({ error: 'Something went wrong' });
  }
}

module.exports = { insertUser, readUsers, deleteUser };
