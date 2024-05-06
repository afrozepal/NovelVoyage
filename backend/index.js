const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const {booksModel} = require('./models/books.js');
const User = require('./models/userData.js'); // Import user model
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

// // Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();

//////////////////////////////////////// for user
// Define routes


// Route to handle fetching users
app.get('/api/userslala', (req, res) => {
    // console.log('Fetching users...'); // Log before fetching users
    // Fetch users from MongoDB
    User.find().lean() // Convert Mongoose model instances to plain JavaScript objects
      .then(users => {
        // console.log('Fetched users:', users); // Log fetched users to console
        res.setHeader('Content-Type', 'application/json'); // Set content type header
        res.json(users); // Send users as response to client
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });


// Route to handle adding a new user
app.post('/api/userslala', (req, res) => {
    console.log('Adding user...');
    const { username, password, email, name } = req.body; 
  
    // Log the received data
    // console.log('Received Data:', { username, password, email, name });
  
    // Create a new User document using Mongoose
    User.create({ username, password, email, name }) // Adjust parameter name to match client-side code
      .then(createdUser => {
        console.log('User added:', createdUser);
        res.status(201).json(createdUser);
      })
      .catch(error => {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  


////////////////////////////////////////////////////////////////

app.get('/getbooks', (req, res) => {
    booksModel.find({})
        .then(books => res.json(books))
        .catch(err => res.json(err));
});

app.put('/updateLike/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await booksModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        book.Like += 1;
        const updatedBook = await book.save();
        res.json({ message: 'book liked successfully '});
    } catch (error) {
        console.error('Error updating like:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/updateRank/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const { rating } = req.body;

    try {
        const book = await booksModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const updatedRank = ((parseFloat(rating) + parseFloat(book.Rating)) / 2.0);
        book.Rating = updatedRank;
        const updatedBook = await book.save();

        res.json({ message: 'Rating updated successfully'});
    } catch (error) {
        console.error('Error updating rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/updateLibrary/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If saved_books is null or undefined, set it to the new book ID
    if (user.saved_books === null || user.saved_books === '') {
      user.saved_books = bookId;
    } else {
      // Append the new book ID and a comma to the existing saved_books string
      user.saved_books += ',' + bookId;
    }

    const updatedUser = await user.save();

    res.json({ message: 'Book saved successfully'});
  } catch (error) {
    console.error('Error updating library:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/MarkasRead/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If saved_books is null or undefined, set it to the new book ID
    if (user.read_count === null || user.read_count === '') {
      user.read_count = bookId;
    } else {
      // Append the new book ID and a comma to the existing saved_books string
      user.read_count += ',' + bookId;
    }

    const updatedUser = await user.save();

    res.json({ message: 'Book marked as read successfully'});
  } catch (error) {
    console.error('Error updating library:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
