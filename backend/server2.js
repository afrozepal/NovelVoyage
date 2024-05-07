const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// const mongoose = require('./mongoose');
const Trivia = require('./models/triviamodule');
const Books = require('./models/booksmodule.js');

const connectDB = require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));


connectDB();

app.post('/generate-trivia', async (req, res) => {
    try {
        const { bookID, userId } = req.body;
  
      // Retrieve book details including author name based on bookId
      const book = await Books.findById(bookID);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        console.log('BOOK YEAR DIRECT:', book.author,book.published_year);

        const authorName = book.author;
        const yearof = book.published_year;
        console.log('author book yearf:', authorName,book.published_year);
        const genre = book.Genre;
        const pages = book.num_pages;
        console.log(`PAGESSSSSSS: is ${pages}`);
    //get random books for choices
    const randomBooks = await Books.aggregate([{ $sample: { size: 3 } }]);

    // Example: Access the randomly selected books
    //console.log('Randomly selected books:', randomBooks[0]);
    

    // Save the trivia data to the database
    const triviaQuestion1 = 'What is the name of the author of the book?'
    //const triviaQuestion2 = 'What is the year of publication of the book?';
    const triviaQuestion3 = 'what genre does the book belong to?';
    const triviaQuestion4 = 'How many pages does the book have?';

    const options1 = [randomBooks[0].author, randomBooks[1].author, randomBooks[2].author, authorName]
    //const options2 = [randomBooks[0].published_year,randomBooks[2].published_year,yearof,randomBooks[1].published_year]
    //console.log('KUTTI DEYAAAAAAAAAAA',options2)
    const options3 = [randomBooks[0].Genre, randomBooks[1].Genre, randomBooks[2].Genre, genre]
    const options4 = [randomBooks[0].num_pages, randomBooks[1].num_pages,randomBooks[2].num_pages, pages]
    console.log('OPTIONS 4:', options4);
    const correct1 = authorName;
    //const correct2 = yearof;
    const correct3 = genre;
    const correct4 = pages;
    const bookId = '663956eea20f0bcbfb2aee79'

    const newtrivia = [{
        userDataId: userId,
        bookId: bookId,
        question: triviaQuestion1,
        options: options1,
        correctOption: correct1
 
    },
    {
        userDataId: userId,
        bookId: bookId,
        question: triviaQuestion3,
        options: options3,
        correctOption: correct3

    },
    {
        userDataId: userId,
        bookId: bookId,
        question: triviaQuestion4,
        options: options4,
        correctOption: correct4

    }];
    //{
        //userDataId: userId,
        //bookId: bookId,
        //question: triviaQuestion2,
        //options: options2,
        //correctOption: correct2
    //},
    
    
    await Trivia.insertMany(newtrivia);

    res.status(201).json({ message: 'Trivia generated and saved successfully' });
  } catch (error) {
    console.error('Error generating trivia:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  


app.listen(8000, () => {
    console.log("Server listening on port 8000");
});