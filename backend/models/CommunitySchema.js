const mongoose = require('mongoose')

const ThoughtSchema = new mongoose.Schema({
    username: String,
    thoughtText: String,
    timestamp: { type: Date, default: Date.now }
});

const CommunityDataTable = new mongoose.Schema({
    username: String,
    comment: String,
    likes: { type: Number, default: 0 },
    saved: { type: Boolean, default: false },
    thoughts: [ThoughtSchema],
    image: {
        type: String,
        required: false
    }
})

const CommunityDataModel = mongoose.model("CommunityData", CommunityDataTable)
module.exports = CommunityDataModel
