const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://afrozepal:TOdwAM50oSoqDvHG@nv.5rxrd80.mongodb.net/NovelVoyage")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
    });

module.exports = { mongoose };
