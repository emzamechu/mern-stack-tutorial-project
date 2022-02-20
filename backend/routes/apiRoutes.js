const express = require('express')
const router = express.Router()
const {getGoals,createGoal, getSingleGoal,updateGoal, deleteGoal} = require('../controllers/GoalController')

//@desc Get all Goals
//@route GET /api/v1/goals
//@access private
router.get('/', getGoals)

//@desc Create or Save a new Goal
//@route POST /api/v1/goals
//@access private
router.post('/', createGoal)

//@desc Get single Goal
//@route GET /api/v1/goals/:id
//@access private
router.get('/:id', getSingleGoal)

//@desc Update a Goal
//@route PUT /api/v1/goals/:id
//@access private
router.put('/:id', updateGoal)

//@desc Update a Goal
//@route DELETE /api/v1/goals/:id
//@access private
router.delete('/:id', deleteGoal)

module.exports = router