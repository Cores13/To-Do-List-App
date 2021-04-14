const mongoose = require('mongoose');
const { stringify } = require('qs');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required : true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;