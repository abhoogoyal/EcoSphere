const mongoose = require('mongoose');

const EmployeeParticipationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CSRActivity'
    },
    proofUrl: {
      type: String,
      trim: true
    },
    approvalStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    pointsEarned: {
      type: Number,
      default: 0
    },
    completionDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmployeeParticipation', EmployeeParticipationSchema);
