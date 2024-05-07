const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
    userDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData', // Reference to the UserData model
    required: true
    },
    bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to the Book model
    required: true
    },
    question: {
    type: String,
    required: true
    },
    options: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
    },
    correctOption: {
    type: mongoose.Schema.Types.Mixed,
    required: true
    },
    chosenOption: {
    type: mongoose.Schema.Types.Mixed
  },
  marks: {
    type: Number,
    default: 0
  }
});

const Trivia = mongoose.model('Trivia', triviaSchema);

module.exports = Trivia;
