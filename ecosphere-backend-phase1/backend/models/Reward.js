const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Reward name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    pointsRequired: {
      type: Number,
      required: [true, 'Points required is required']
    },
    stock: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reward', RewardSchema);
