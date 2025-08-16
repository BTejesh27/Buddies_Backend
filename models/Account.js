const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

module.exports = mongoose.model('Account', accountSchema);
