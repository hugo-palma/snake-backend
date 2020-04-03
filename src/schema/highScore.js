const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighScoreSchema = new Schema({
    user: String,
    date: { type: Date, default: Date.now },
    scoreValue: Number,
});
module.exports = HighScoreSchema;
