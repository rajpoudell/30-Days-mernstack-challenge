const express = require('express');
const  mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/route');
const PORT = 4000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/day10after4thsem';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const app = express();

// 

app.use(cors())
app.use(express.json());
app.get('/' , (req,res) =>{
    res.send("<h1> hello</h1>")
});

app.use("/",router);



app.listen(PORT, () =>{
    console.log("PORT at "  + PORT)
})