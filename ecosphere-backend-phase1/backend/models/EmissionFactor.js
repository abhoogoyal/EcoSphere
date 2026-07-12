const mongoose = require('mongoose');

const EmissionFactorSchema = new mongoose.Schema(
  {
    activityType: {
      type: String,
      required: [true, 'Activity type is required'],
      trim: true
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true
    },
    factorValue: {
      type: Number,
      required: [true, 'Factor value is required']
    },
    source: {
      type: String,
      trim: true
    },
    effectiveDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmissionFactor', EmissionFactorSchema);
