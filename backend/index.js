const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const {booksModel} = require('./models/books.js');
const User = require('./models/userData.js'); // Import user model
const bodyParser = require('body-parser');
const CommunityDataModel = require('./models/CommunitySchema.js')
const Trivia = require('./models/triviamodule.js');
// const Books = require('./models/booksmodule');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(express.json());

// // Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();

//////////////////////////////////////// for user

// Define routes
app.get('/api/userslala', (req, res) => {
  console.log('Fetching users...'); // Log before fetching users
  // Fetch users from MongoDB
  User.find().lean() // Convert Mongoose model instances to plain JavaScript objects
    .then(users => {
      console.log('Fetched users:', users); // Log fetched users to console
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
  const { username, password, email, name, liked_books, read_count, saved_books} = req.body; 

  // Log the received data
  console.log('Received Data:', { username, password, email, name, liked_books, read_count, saved_books });

  // Create a new User document using Mongoose
  User.create({ username, password, email, name, liked_books, read_count, saved_books})
    .then(createdUser => {
      console.log('User added:', createdUser); // Convert Mongoose model instance to plain JavaScript object
      const userData = createdUser.toObject(); // Extract user data
      res.status(201).json(userData); // Send only the user data as response
    })
    .catch(error => {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Route to handle updating user password by username
app.put('/api/userslala/:username', (req, res) => {
  console.log('Updating user password...');
  const { username } = req.params;
  const { password } = req.body; 

  // Log the received data
  console.log('Received Data:', { username, password });

  // Find the user by username and update the password
  User.findOneAndUpdate({ username }, { password }, { new: true }) 
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('User password updated:', updatedUser);
      res.json(updatedUser);
    })
    .catch(error => {
      console.error('Error updating user password:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

////////////////////////////////////////////////////////////////

app.get('/getusers/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ error: 'User not found' }));
});

app.get('/getbooks', (req, res) => {
    booksModel.find({})
        .then(books => res.json(books))
        .catch(err => res.json(err));
});

app.put('/updatesaving/:id', async (req, res) => {          //sam
  const userId = req.params.id;
  const { saved_books } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.saved_books = saved_books
    const updatedUser = await user.save();

    res.json({ message: 'library updated  successfully'});
  } catch (error) {
    console.error('Error updating library:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
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


////////////////      fatima part

app.get('/getcomments', (req, res) => {
  CommunityDataModel.find()
      .then(CommunityData => res.json(CommunityData))
      .catch(err => res.json(err))
})

app.post('/createpost', async (req, res) => {
  const { username, comment } = req.body;
  try {
      const newPost = new CommunityDataModel({ username, comment });
      await newPost.save();
      res.status(201).json(newPost);
  } catch (err) {
      res.status(500).json({ error: 'Failed to create post' });
  }
});

// Route to update likes on a post
app.post('/likePost/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
      const post = await CommunityDataModel.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      post.likes += 1; // Increment the likes by 1
      await post.save();
      res.status(200).json({ message: 'Likes updated successfully', likes: post.likes });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});

app.post('/savePost/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
      const post = await CommunityDataModel.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      post.saved = !post.saved; // Toggle the 'saved' field
      await post.save();
      res.status(200).json(post);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});

app.post('/addThought/:postId', async (req, res) => {
  const { postId } = req.params;
  const { username, thoughtText } = req.body;

  try {
      const post = await CommunityDataModel.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      const newThought = { username, thoughtText };
      post.thoughts.push(newThought);
      await post.save();

      res.status(201).json(newThought); // Return the newly added thought
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});
///////////////////////umaima 
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
      const book = await booksModel.findById(bookID);
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
  const randomBooks = await booksModel.aggregate([{ $sample: { size: 3 } }]);

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
/////////////////// samreen
app.get('/getuserdata', (req, res) => {
  console.log("Request received at /getuserData");
  User.find()
      .then(userData => res.json({userData} ))
      .catch(err => {
          console.error("Error fetching user data:", err);
          res.status(500).json({ error: "Error fetching user data" });
      });
});
/////////////////////

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
