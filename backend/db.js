const mongoose = require('mongoose')

const connectDB = async() => {

    try{
        const conn=await mongoose.connect('mongodb+srv://.mongodb.net/NovelVoyage'
        
    );
        console.log(`MongoDb Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
};

module.exports= connectDB;
