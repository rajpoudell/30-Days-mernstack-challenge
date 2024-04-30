const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema ({
    title:{
        type:'String',
        required: true,
    },
    description: {
        type:'String',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
})

const  taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;