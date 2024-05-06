const mongoose = require('mongoose')

const connectDB = async() => {

    try{
        const conn=await mongoose.connect('mongodb+srv://afrozepal:TOdwAM50oSoqDvHG@nv.5rxrd80.mongodb.net/NovelVoyage'
        
    );
        console.log(`MongoDb Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
};

module.exports= connectDB;