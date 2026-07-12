const mongoose = require('mongoose');

const CSRActivitySchema = new mongoose.Schema(
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
    date: {
      type: Date
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Archived'],
      default: 'Draft'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CSRActivity', CSRActivitySchema);
