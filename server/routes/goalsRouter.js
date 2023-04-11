const express = require('express');
const Goal = require('../models/goal');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const goals = await Goal.find({userId: req.params.userId});
        res.json(goals);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/nextSteps/:userId', authMiddleware, async (req, res) => {
    try {
        const goals = await Goal.find({userId: req.params.userId});
        const firstSteps = [];
        for (let i = 0; i < goals.length; i++) {
            const notCompletedTask = goals[i].steps.find((step) => !step.completed);
            if (notCompletedTask) {
                notCompletedTask.goalColor = goals[i].goalColor;
                notCompletedTask.goalId = goals[i]._id;
                firstSteps.push(notCompletedTask);
            }
        }
        res.json(firstSteps);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/create', authMiddleware, async (req, res) => {
    const goal = new Goal({ ...req.body });
    try {
        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/details/:goalId', authMiddleware, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        res.json(goal);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/:goalId/update', authMiddleware, async (req, res) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.goalId, req.body, {
            new: true,
            runValidators: true
        })
        res.json(updatedGoal);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.patch('/:goalId/updateStatus', authMiddleware, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        goal.completed = req.body.completed;
        goal.lastEdited = req.body.lastEdited;
        const updatedGoal = await goal.save();
        res.json(updatedGoal);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:goalId/delete', authMiddleware, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (goal) {
            await goal.remove();
        }
        res.json('deleted');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;