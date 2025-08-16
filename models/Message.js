const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image'], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
