const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ShoppingRequestSchema = new mongoose.Schema({
  type:String,
  email: String,
  shoppingList: [String,Number],
  time: Date,
  addtional: String
});

module.exports = mongoose.model('ShoppingRequest', ShoppingRequestSchema);
