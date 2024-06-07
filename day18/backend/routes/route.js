const express = require('express');

const router = express.Router();

// Apply JSON parsing middleware to this router
router.use(express.json());



router.get('/', (req, res) => {
  res.send(`<h1>hello world</h1>`);
});


router.post('/data', async (req, res) => {
  const { name } = req.body;
  if (name) {
    console.log(`hello, ${name} sir`);
    res.status(201).send({ message: `Hello, ${name}!` });
  } else {
    res.status(400).send({ error: 'Name is required' });
  }
});

module.exports = router;
