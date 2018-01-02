const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MealSchema = new mongoose.Schema({
  type:String,
  email: String,
  time: Date
});

module.exports = mongoose.model('Meal', MealSchema);
