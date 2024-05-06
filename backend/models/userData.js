const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  liked_books:String,
  saved_books:String,
  read_count:String,
  
}, { collection: 'userData' });

const User = mongoose.model('User', userSchema);

module.exports = User;
