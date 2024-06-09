const express = require('express');
const cors = require('cors');
const router = require('./routes/route');
const mongoose = require('mongoose');
const PORT = 4000;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/day19').then(() => console.log('MongoDB connected'));

app.use(cors());
app.use(express.json());

app.use("/",router);


app.listen(PORT, () => {
    console.log(`Listening on port PORT`);
});