const mongoose = require('mongoose');

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

module.exports = User;
