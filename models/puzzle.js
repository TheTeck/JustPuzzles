const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
    photoUrl: String,
    width: Number,
    height: Number,
    month: Number,
    day: Number,
    year: Number,
    views: {
      type: Number,
      default: 0
    }
  })
 

module.exports = mongoose.model('Puzzle', puzzleSchema);