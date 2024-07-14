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
    },
    files:{
        filename:{
            type:'String',
        },
        path: {
            type:"String",
        }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
})
userSchema.pre('save', function (next) {
    if (this.files && this.files.path) {
        this.files.path = this.files.path.replace(/\\/g, '/');
    }
    next();
});

const Usermodel  =  model("user",userSchema);

module.exports = Usermodel;