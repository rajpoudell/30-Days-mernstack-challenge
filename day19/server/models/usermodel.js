const { mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
    lastname: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
    phonenumber: {
        type: String,
        required: true,
      },
    company: {
        type: String,
        required: true,
      },
      email: {
        unique: true,
        type: String,
        required: true,
      },
})
const Usermodel = mongoose.model("day19", UserSchema);

module.exports = { Usermodel };