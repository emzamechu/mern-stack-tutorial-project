const express = require('express')
const router = express.Router()
const {registerUser,login,getUserData,logout} = require('../controllers/UserController')
const { protect } = require('../middleware/AuthMiddleware')

//Register User
router.post('/', registerUser)
//Authenticate User
router.post('/login', login)
//Authenticate User
router.get('/me', protect, getUserData)
//Rgister User
router.post('/logout', logout)

module.exports = router