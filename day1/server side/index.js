const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;


app.get("/api", (req, res) => {
    res.json({ messages: ["Hello from server!","Hello again","feri ni hello"] });
  });
app.listen(PORT,()=> console.log(`Connected at ${PORT}` ))