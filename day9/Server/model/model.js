const mongoose = require("mongoose");

const {Schema,model} = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
  
    }
})

const Usermodel  =  model("day9",userSchema);

module.exports = Usermodel;