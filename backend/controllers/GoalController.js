const asyncHandler = require('express-async-handler');

//Get all Goals
const getGoals = asyncHandler(async (req, res) => {
    return res.json({message: 'Hello World'})
})

//Create a new Goal
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({message: 'No Request body supplied'})
    }
    console.log(req.body);
    return res.json({message: 'Hello World'})
})

//Get single Goal
const getSingleGoal = asyncHandler(async (req, res) => {
    return res.json({message: `Here is id: ${req.params.id}`})
})

//Update a Goal
const updateGoal = asyncHandler(async (req, res) => {
    return res.json({message: `Goal with id: ${req.params.id} updated successfully`})
})

//Delete a Goal
const deleteGoal = asyncHandler(async (req, res) => {
    return res.json({message: `Goal with id: ${req.params.id} deleted successfully`})
})

module.exports = {
    getGoals,createGoal, getSingleGoal,updateGoal, deleteGoal
}