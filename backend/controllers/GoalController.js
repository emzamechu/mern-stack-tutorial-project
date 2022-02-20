const asyncHandler = require('express-async-handler');

//Goal Model
const Goal = require('../models/GoalModel')
const User = require('../models/UserModel')

//Get all Goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user:req.user.id})
    return res.json(goals)
})

//Create a new Goal
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
       return res.status(400).json({message: 'No Request body supplied'})
    }
    const newGoal = await Goal.create({
        user:req.user.id,
        text: req.body.text
    })
    return res.json({message: 'New goal created', goal: newGoal})
})

//Get single Goal
const getSingleGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    return res.json(goal)
})

//Update a Goal
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
       return res.status(404).json({message: 'Please provide a valid goal :id'})
    }

    if (!req.user && goal.user.toString() !== req.user.id) {
        return res.status(401).json({message: 'Unauthorized to update this goal!'})
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    return res.json({message: `Goal with id: ${req.params.id} updated successfully`, updatedGoal: updatedGoal})
})

//Delete a Goal
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
       return res.status(404).json({message: 'Please provide a valid goal :id'})
    }
    
    //Check if user is authorized to delete goal
    if (!req.user && goal.user.toString() !== req.user.id) {
        return res.status(401).json({message: 'Unauthorized to update this goal!'})
    }
    const deletedGoal = await Goal.findByIdAndRemove(req.params.id)
    return res.json({message: `Goal with id: ${req.params.id} deleted successfully`, deletedGoal : deletedGoal})
})

module.exports = {
    getGoals,createGoal, getSingleGoal,updateGoal, deleteGoal
}