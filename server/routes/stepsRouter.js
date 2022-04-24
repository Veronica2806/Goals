const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

router.patch('/:goalId/updateStepStatus/:stepId', async (req, res) => {
    const goal = await Goal.findById(req.params.goalId);
    const stepId = req.params.stepId;
    const step = goal.steps.find((step) => step.id === stepId);
    if (!step){
        res.status(404).json('Step is not found');
    }
    step.completed = req.body.completed;
    try {
        const updatedGoal = await goal.save();
        res.json(updatedGoal);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;