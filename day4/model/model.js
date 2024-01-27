const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    },
    job: {
        type: String
    },
    salary: {
        type: String
    }
});
const UserModel = mongoose.model('daychar', userSchema);  //daychar is collection 

module.exports = UserModel
