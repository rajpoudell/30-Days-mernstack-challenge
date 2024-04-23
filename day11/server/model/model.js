const { timeStamp } = require('console');
const mongoose = require('mongoose');
const {model,Schema} = require('mongoose');
const userschema = new Schema({
    firstName:{
        type: 'String',
        required:true,
    },
    lastName:{
        type: 'String',
        required:true,
    },
   email:{
        type: 'String',
        required:true,
        unique:false,
        
    },
    files:{
        filename:{
            type:'String',
        },
        path: {
            type:"String",
        }
    }
},{timeStamp:true});
const Usermodel = model('day11',userschema);

module.exports = Usermodel;