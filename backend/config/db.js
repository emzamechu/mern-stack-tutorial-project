const mongoose = require('mongoose')

const connectDB = async (req, res) => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI)
       console.log(`Connect to DB on host ${conn.connection.host}`.bgCyan.underline);
    } catch (error) {
        console.log(`Connection to DB failed: ${error}`.bgRed.underline);
        process.exit(1);
    }
}

module.exports = connectDB