const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the User model schema
const MedicalRequestSchema = new mongoose.Schema({
  email: String,
  service : String,
  additional : String,
  time: String
});

module.exports = mongoose.model('MedicalRequest', MedicalRequestSchema);
