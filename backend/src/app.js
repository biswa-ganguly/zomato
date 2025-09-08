const express = require('express')

const app = express()

app.get("/", (req,res )=>{
    res.send("hello world")
})

module.exports = app




// biswaganguly10_db_user
// VkLdMIsjbt2Ou5SY

// mongodb+srv://biswaganguly10_db_user:VkLdMIsjbt2Ou5SY@zomato.xormgum.mongodb.net/?retryWrites=true&w=majority&appName=zomato