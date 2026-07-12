const mongoose = require('mongoose');

const ComplianceIssueSchema = new mongoose.Schema(
  {
    audit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audit'
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Low'
    },
    description: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dueDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Open', 'InProgress', 'Resolved'],
      default: 'Open'
    },
    flaggedOverdue: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ComplianceIssue', ComplianceIssueSchema);
