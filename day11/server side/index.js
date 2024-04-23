const express = require('express');
const bodyParser = require('body-parser');
const  cors = require('cors');
const router = require('./routes/route');
const mongoose = require('mongoose');
const PORT = 4000;
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/day11ghraihuda').then( (e)=> { console.log("mongodb connectd")});


app.use(bodyParser.json());

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use("/",router);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});