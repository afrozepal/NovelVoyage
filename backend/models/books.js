const mongoose=require('mongoose')

const booksSchema= new mongoose.Schema(
    {
        title:String,
        author:String,
        Genre:String,
        Image:String,
        Description:String,
        Published_Year:Number,
        Num_Pages:Number,
        Rating:Number,
        Read:Number,
        Like:Number,
        Save:Number,
    }
)

const booksModel=mongoose.model("books" , booksSchema )
module.exports={booksModel}
