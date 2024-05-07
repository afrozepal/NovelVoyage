const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const {booksModel} = require('./models/books.js');
const User = require('./models/userData.js'); // Import user model
const bodyParser = require('body-parser');
const CommunityDataModel = require('./models/CommunitySchema.js')
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

app.put('/updatesaving/:id', async (req, res) => {
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const upload = multer({ storage });

app.post('/createpost', upload.single('image'), async (req, res) => {
  const { username, comment } = req.body;
  const imagePath = req.file ? req.file.path : null; // Get image path if uploaded

  try {
      const newPost = new CommunityDataModel({ username, comment, image: imagePath });
      await newPost.save();
      res.status(201).json(newPost);
  } catch (err) {
      res.status(500).json({ error: 'Failed to create post' });
  }
});

// app.post('/createpost', async (req, res) => {
//     const { username, comment } = req.body;
//     try {
//         const newPost = new CommunityDataModel({ username, comment });
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create post' });
//     }
// });

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


/////////////////////

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
