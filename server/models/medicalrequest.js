const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MedicalRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  service : String,
  additional : String,
  time: Date
});

module.exports = mongoose.model('MedicalRequest', MedicalRequestSchema);
