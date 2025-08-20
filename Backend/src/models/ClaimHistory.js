const mongoose = require('mongoose');

const ClaimHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);
