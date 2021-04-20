const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required : true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = new mongoose.model("Todo", todoSchema);