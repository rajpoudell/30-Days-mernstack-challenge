const express = require('express');
const router = require('./controllers/controller');
 const db = require('./db');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use('/',router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});