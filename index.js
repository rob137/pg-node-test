const express = require('express');
const dotenv = require('dotenv');
const { insertUser, readUsers, updateUser, deleteUser } = require('./routes/user');

const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());

app.post('/', (req, res) => insertUser(req, res));
app.get('/', (req, res) => readUsers(req, res));
app.put('/', (req, res) => updateUser(req, res))
app.delete('/', (req, res) => deleteUser(req, res));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
