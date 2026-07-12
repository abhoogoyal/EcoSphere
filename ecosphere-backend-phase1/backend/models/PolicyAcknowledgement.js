const mongoose = require('mongoose');

const PolicyAcknowledgementSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ESGPolicy'
    },
    acknowledgedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PolicyAcknowledgement', PolicyAcknowledgementSchema);
