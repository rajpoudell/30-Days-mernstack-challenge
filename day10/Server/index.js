const bodyParser = require('body-parser');
const express = require('express');
const  mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/route');
const PORT = 4000;
mongoose.connect('mongodb://127.0.0.1:27017/day10after4thsem').then( (e)=> { console.log("mongodb connectd")});

const app = express();


app.use(bodyParser.json());

app.use(cors())
app.use(express.json());
app.get('/' , (req,res) =>{
    res.send("<h1> hello</h1>")
});

app.use("/",router);



app.listen(PORT, () =>{
    console.log("PORT at "  + PORT)
})