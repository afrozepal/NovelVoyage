 const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://afrozepal:TOdwAM50oSoqDvHG@nv.5rxrd80.mongodb.net/NovelVoyage')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for your MongoDB collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  liked_books: { type: String, default: "" },
  read_count: { type: String, default: "" },
  saved_books: { type: String, default: "" },
}, { collection: 'userData', versionKey:false });

const User = mongoose.model('User', userSchema);

// Define routes
app.get('/api/getuserdata', (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log('Server listening on port' + PORT);
});