const express = require('express')
const router = express.Router()
const {getGoals,createGoal, getSingleGoal,updateGoal, deleteGoal} = require('../controllers/GoalController')
const {protect} = require('../middleware/AuthMiddleware')

//@desc Get all Goals
//@route GET /api/v1/goals
//@access private
router.get('/', protect, getGoals)

//@desc Create or Save a new Goal
//@route POST /api/v1/goals
//@access private
router.post('/', protect, createGoal)

//@desc Get single Goal
//@route GET /api/v1/goals/:id
//@access private
router.get('/:id', protect, getSingleGoal)

//@desc Update a Goal
//@route PUT /api/v1/goals/:id
//@access private
router.put('/:id', protect, updateGoal)

//@desc Update a Goal
//@route DELETE /api/v1/goals/:id
//@access private
router.delete('/:id', protect, deleteGoal)

module.exports = router