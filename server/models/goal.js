const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
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
        type: [stepSchema],
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
    },
    folderId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Goal', goalSchema)