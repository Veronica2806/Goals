const express = require('express');
const Folder = require('../models/folder');
const Goal = require('../models/goal');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.put('/:userId', authMiddleware, async (req, res) => {
    const folder = new Folder({ ...req.body, userId: req.params.userId });
    try {
        const newFolder = await folder.save();
        res.status(201).json(newFolder);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const folders = await Folder.find({userId: req.params.userId});
        res.json(folders);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:folderId', authMiddleware, async (req, res) => {
    try {
        const folderId = req.params.folderId;
        const folder = await Folder.findById(folderId);
        if (folder) {
            await Goal.updateMany({ folderId }, { $set: { folderId: '' } })
            await folder.remove();
        }
        res.json('deleted');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;