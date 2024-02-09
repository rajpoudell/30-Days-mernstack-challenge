const bodyParser = require('body-parser');
const express = require('express');
const  mongoose = require('mongoose');
const Usermodel  = require('./model/model');

mongoose.connect('mongodb://127.0.0.1:27017/day9ko_database').then( (e)=> { console.log("mongodb connectd")});


const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.get('/' , (req,res) =>{
    res.send("<h1> hello</h1>")
});

app.post('/register' , async(req,res) =>{
    const{username,email,password} =req.body;
    try {
        const newUser = new Usermodel({username,email,password});
        await Usermodel.create(newUser);
        res.json({ success: true, message: 'User registered successfully' });
        
    } catch (error) {
        console.log(error)
    }
});



app.listen(PORT, () =>{
    console.log("PORT at"  + PORT)
})