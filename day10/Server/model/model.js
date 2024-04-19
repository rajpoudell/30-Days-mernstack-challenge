const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{ 
    token: { 
    type: String,
     required: true } }],
});

const Usermodel = model("day10", userSchema);

module.exports = { Usermodel };
