const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    goalId: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    goalColor: {
        type: String,
        required: false
    },
});

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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
    },
    lastEdited: {
        type: Date,
        required: false
    },
    createdDate: {
        type: Date,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    goalColor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Goal', goalSchema)