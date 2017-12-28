const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const TourRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  source : String,
  time: String,
  destination: String,
  people : String,
  additional : String
});

module.exports = mongoose.model('TourRequest', TourRequestSchema);
