const mongoose = require('mongoose');

const EnvironmentalGoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    targetMetric: {
      type: String,
      trim: true
    },
    targetValue: {
      type: Number,
      required: [true, 'Target value is required']
    },
    currentValue: {
      type: Number,
      default: 0
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ['OnTrack', 'AtRisk', 'Achieved', 'Missed'],
      default: 'OnTrack'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EnvironmentalGoal', EnvironmentalGoalSchema);
