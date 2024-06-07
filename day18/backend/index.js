const express = require('express');
const route = require('./routes/route');

const app = express();

// Use the route under '/data'
app.use('/', route);

module.exports = app;
