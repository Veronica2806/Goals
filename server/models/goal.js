const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    dueDate: Date, 
    completed: {
        type: Boolean, 
        default: false 
    }});

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    steps: {
        type: [StepSchema],
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Goal', goalSchema)