const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv:/.5rxrd80.mongodb.net/NovelVoyage')
        console.log('MongoDB Connected!')
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
module.exports = connectDB; 
