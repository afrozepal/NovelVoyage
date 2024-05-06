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
}, { collection: 'userData' });

const User = mongoose.model('User', userSchema);

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
  const { username, password, email, name } = req.body; 

  // Log the received data
  console.log('Received Data:', { username, password, email, name });

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



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
