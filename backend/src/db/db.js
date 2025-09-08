const mongoose = require('mongoose')


function connectDb(){
    mongoose.connect('mongodb+srv://biswaganguly10_db_user:VkLdMIsjbt2Ou5SY@zomato.xormgum.mongodb.net/?retryWrites=true&w=majority&appName=zomato')
    .then(()=>console.log('MongoDB connected to backend'))
    .catch((err)=>console.log('MongoDb connection failed', err))
}

module.exports = connectDb