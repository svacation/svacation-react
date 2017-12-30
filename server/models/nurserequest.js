const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const NurseRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  service : String,
  additional : String,
  time: String
});

module.exports = mongoose.model('NurseRequest', NurseRequestSchema);
