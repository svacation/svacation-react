const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TourRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  source : String,
  time: Date,
  destination: String,
  people : String,
  additional : String
});

module.exports = mongoose.model('TourRequest', TourRequestSchema);
