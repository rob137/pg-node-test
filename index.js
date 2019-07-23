const express = require('express');
const dotenv = require('dotenv');
const { readUsers, insertUser } = require('./routes/user');

const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => readUsers(req, res));

app.post('/', (req, res) => insertUser(req, res));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
