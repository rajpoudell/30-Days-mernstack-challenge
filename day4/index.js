const express = require('express');
const router = require('./controllers/controller');
 const db = require('./db');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/',router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});