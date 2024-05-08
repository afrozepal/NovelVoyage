const mongoose=require('mongoose')

const booksSchema= new mongoose.Schema(
    {
        title: String,
        author: String,
        Genre: String,
        Image: String,
        description: String,
        published_year: Number, // Ensure the field name matches exactly
        num_pages: Number,      // Ensure the field name matches exactly
        Rating: Number,
        Read: Number,
        Like: Number,
        Save: Number,
    }
)

const booksModel=mongoose.model("books" , booksSchema )
module.exports={booksModel}
