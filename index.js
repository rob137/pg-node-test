const express = require('express');
const dotenv = require('dotenv');
const { Client } = require('pg');

const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'auth',
  port: '5432'
});

app.get('/', async (req, res) => {
  const users = await readUsers();
  res.setHeader('content-type', 'application/json');
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

connectToDb();

async function connectToDb() {
  try {
    await client.connect();
  }
  catch(e) {
    console.error(`Failed to connect ${e}`);
  }
}

async function readUsers() {
  try {
    const response = await client.query('SELECT * FROM users');
    return response.rows;
  }
  catch(e) {
    return [];
  }
}
