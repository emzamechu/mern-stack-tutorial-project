const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

//@desc Register user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    //validate request parameters
    if (!name || !email || !password) {
        return res.status(400).json({message:'Please provide a name, email address and password'})
    }

    //Check if user is already registered
    const userExists = await User.findOne({email: email})
    if (userExists) {
        res.status(409).json({message:'User with provided email already exists'})
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Save new User
    const user = await User.create({name: name, email: email, password: hashedPassword})

    if (user) {
        return res.status(201).json({_id: user._id, name: user.name, email: user.email, token: generateToken(user._id)})
    } else {
        return res.status(400).json({message:'Invalid User'})
    }

})

//@desc Authenticate a User
//@route POST /api/users/login
//@access public
const login = asyncHandler(async(req, res) => {
    
    //Get login credentials
    const {email, password} = req.body
    
    //Get user by email
    const user = await User.findOne({email: email})

    //Validate password
    if (user && await bcrypt.compare(password, user.password)) {
        return res.status(200).json({name: user.name, email: user.email, token: generateToken(user._id)})
    }else{
        return res.status(403).json({message: 'Invalid User credentials!'})
    }

})

//@desc Get current logged in user
//@route GET /api/users/login
//@access private
const getUserData = asyncHandler(async(req, res) => {
    // const {_id, name, email, createdAt, updatedAt} = req.user
    return res.status(200).json(req.user);
})

//@desc Logout a User
//@route POST /api/users/logout
//@access private
const logout = asyncHandler(async(req, res) => {
    return res.status(200).json({message: 'Logout current User Route'})
})

//Generate jwt token
const generateToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '360d'
    })
}

module.exports = {
    registerUser, login, getUserData, logout
}