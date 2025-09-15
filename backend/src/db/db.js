const mongoose = require('mongoose')
require('dotenv').config()

function connectDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('MongoDB connected to backend'))
    .catch((err)=>console.log('MongoDb connection failed', err))
}

module.exports = connectDb