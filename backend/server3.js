//mongodb+srv://afrozepal:TOdwAM50oSoqDvHG@nv.5rxrd80.mongodb.net/
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./db.js')
const User = require('./models/userData.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

connectDB();

app.get('/getuserdata', (req, res) => {
    console.log("Request received at /getuserData");
    User.find()
        .then(userData => res.json({userData} ))
        .catch(err => {
            console.error("Error fetching user data:", err);
            res.status(500).json({ error: "Error fetching user data" });
        });
});


app.listen(8080,()=>{
    console.log("server is running");
})
