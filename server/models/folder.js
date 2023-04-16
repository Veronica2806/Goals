const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: String,
    userId: String,
    createdDate: {
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('Folder', folderSchema);