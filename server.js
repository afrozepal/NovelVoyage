const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('./mongo');
const Trivia = require('./triviamodule');
const Books = require('./booksmodule');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));


app.put('/triviaupdate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { chosenOption, marks } = req.body;
        console.log('CHOSEN OPTION:', chosenOption);
      // Find the trivia entry by ID
        const trivia = await Trivia.findById(id);
        console.log('TRIVIA:', trivia);
        if (!trivia) {
        return res.status(404).json({ message: 'Trivia entry not found' });
        }

      // Update the trivia entry with chosen option and marks
        trivia.chosenOption = chosenOption;
        trivia.marks = marks;

      // Save the updated trivia entry
        const updatedTrivia = await trivia.save();

        res.json(updatedTrivia);
    } catch (error) {
        console.error('Error updating trivia:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.get('/gettrivia', async (req, res) => {
    try {
        const { bookId, userId } = req.query; // Use consistent casing
        console.log('BOOK ID:', bookId);
        // Check if bookId and userId are provided
        if (!bookId || !userId) { // Use consistent casing
            return res.status(400).json({ message: 'Both bookId and userId are required' }); // Use consistent casing
        }
        console.log('hereeeeeee');
        // Find trivia data based on bookId and userId
        const triviaData = await Trivia.find({ bookId: bookId, userDataId: userId }); // Use consistent casing

        if (!triviaData) {
            return res.status(404).json({ message: 'Trivia data does not exist' });
        }
        console.log('TRIVIA DATA:', triviaData);
        res.json(triviaData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





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
        //const yearof = book.published_year;
        console.log('author book yearf:', authorName,book.published_year);
        const genre = book.Genre;
        const pages = book.num_pages;
        //console.log(`PAGESSSSSSS: is ${pages}`);
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
    //const options4 = [randomBooks[0].num_pages, randomBooks[1].num_pages,randomBooks[2].num_pages, pages]
    //console.log('OPTIONS 4:', options4);
    const correct1 = authorName;
    //const correct2 = yearof;
    const correct3 = genre;
    const correct4 = pages;
    const bookId = '663956eea20f0bcbfb2aee79'

    const newtrivia = [{
        userDataId: userId,
        bookId: bookID,
        question: triviaQuestion1,
        options: options1,
        correctOption: correct1
 
    },
    {
        userDataId: userId,
        bookId: bookID,
        question: triviaQuestion3,
        options: options3,
        correctOption: correct3

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