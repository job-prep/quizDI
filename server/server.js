const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });