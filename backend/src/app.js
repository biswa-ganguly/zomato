const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.route")
const foodRoutes = require('./routes/food.route');
const foodPartnerRoutes = require('./routes/foodpartner.route')

const app = express()
app.use(cookieParser());
app.use(express.json());

app.get("/", (req,res )=>{
    res.send("hello world")
})

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes);


module.exports = app



