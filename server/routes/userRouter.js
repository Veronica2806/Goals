const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;