const mongoose = require('mongoose');

const ESGPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    fileUrl: {
      type: String,
      trim: true
    },
    version: {
      type: String,
      trim: true,
      default: '1.0'
    },
    effectiveDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Active', 'Archived'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ESGPolicy', ESGPolicySchema);
