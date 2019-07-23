const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/database');

const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  await db.query('SELECT * FROM users', [], (err, dbRes) => {
    if (err) { return handleError(res, err); }
    res.send(dbRes.rows[0]);
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

function handleError(res, err) {
  if (err.errno === 'ECONNREFUSED') {
    return res.status(500).send({ error: 'Unable to connect to database' });
  } else {
    return res.status(500).send({ error: 'Something went wrong' });
  }
}

// async function connectToDb() {
//   try {
//     await client.connect();
//   }
//   catch(e) {
//     console.error(`Failed to connect ${e}`);
//   }
// }
