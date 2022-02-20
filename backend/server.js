const express = require('express')
const DotEnv = require('dotenv').config()
const colors = require('colors')

//DB connection
const connectDB = require('./config/db')

connectDB()

const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v1/goals', require('./routes/apiRoutes'))

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
})

