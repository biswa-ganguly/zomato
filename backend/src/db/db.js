const mongoose = require('mongoose')


function connectDb(){
    mongoose.connect('mongodb+srv://biswaganguly10_db_user:VkLdMIsjbt2Ou5SY@zomato.xormgum.mongodb.net/?retryWrites=true&w=majority&appName=zomato')
    .then(()=>console.log('connected to db'))
    .catch((err)=>console.log(err))
}

module.exports = connectDb