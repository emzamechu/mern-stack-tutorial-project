const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    //Check for access token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get access token
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Get user from the decoded token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return res.status(403).json({message: 'Not authorized!'})
        }
    }

    if (!token) {
        return res.status(401).json({message: 'Not authorized!, no token in authorization request!'})
    }

})

module.exports = {protect}
