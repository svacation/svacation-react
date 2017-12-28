const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const TourRequestSchema = new mongoose.Schema({
  email: String,
  service : String,
  additional : String,
  people : String,
  time: String
});

module.exports = mongoose.model('TourRequest', TourRequestSchema);
