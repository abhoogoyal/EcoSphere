const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    description: {
      type: String,
      trim: true
    },
    xp: {
      type: Number,
      default: 0
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy'
    },
    evidenceRequired: {
      type: Boolean,
      default: false
    },
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'UnderReview', 'Completed', 'Archived'],
      default: 'Draft'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', ChallengeSchema);
