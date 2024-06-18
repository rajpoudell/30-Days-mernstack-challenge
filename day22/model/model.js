const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    job: {
        type: String
    },
    salary: {
        type: String
    }
});
const UserModel = mongoose.model('day22', userSchema);  //daychar is collection 

module.exports = UserModel
