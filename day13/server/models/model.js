const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:'String',
        required: true
    },
    lastName:{
        type:'String',
        required: true
    },
    email:{
        type:'String',
        required: true,
        unique: true
    }
});
const UserModel = mongoose.model('day13',userSchema);
module.exports = UserModel;