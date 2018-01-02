const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NurseRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  service : String,
  additional : String,
  time: Date
});

module.exports = mongoose.model('NurseRequest', NurseRequestSchema);
