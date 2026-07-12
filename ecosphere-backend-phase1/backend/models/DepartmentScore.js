const mongoose = require('mongoose');

const DepartmentScoreSchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    environmentalScore: {
      type: Number,
      default: 0
    },
    socialScore: {
      type: Number,
      default: 0
    },
    governanceScore: {
      type: Number,
      default: 0
    },
    totalScore: {
      type: Number,
      default: 0
    },
    period: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('DepartmentScore', DepartmentScoreSchema);
