const express = require('express');
const dotenv = require('dotenv');

const port = 5000;
dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})