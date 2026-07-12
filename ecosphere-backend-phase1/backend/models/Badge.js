const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Badge name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    unlockRule: {
      type: {
        type: String,
        enum: ['XP', 'ChallengeCount'],
        required: [true, 'Unlock rule type is required']
      },
      threshold: {
        type: Number,
        required: [true, 'Unlock rule threshold is required']
      }
    },
    icon: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', BadgeSchema);
