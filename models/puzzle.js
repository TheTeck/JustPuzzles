const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
    photoUrl: String,
    width: Number,
    height: Number,
    month: Number,
    day: Number,
    year: Number
  })
 

module.exports = mongoose.model('Puzzle', puzzleSchema);