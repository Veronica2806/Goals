const express = require('express');
const Goal = require('../models/goal');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/nextSteps', async (req, res) => {
    try {
        const goals = await Goal.find();
        const firstSteps = [];
        //TODO: only uncompleted steps should be returned
        goals.forEach(goal => {
            if (goal.steps.length) {
                firstSteps.push({ step: goal.steps[0], goalName: goal.name, goalId: goal._id })
            }
        })
        res.json(firstSteps);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/create', async (req, res) => {
    const goal = new Goal({ ...req.body });
    try {
        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/:goalId', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        res.json(goal);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/:goalId/update', async (req, res) => {
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

router.patch('/:goalId/updateStatus', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        goal.completed = req.body.completed;
        const updatedGoal = await goal.save();
        res.json(updatedGoal);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:goalId/delete', async (req, res) => {
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