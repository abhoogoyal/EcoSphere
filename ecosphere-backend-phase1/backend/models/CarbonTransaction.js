const mongoose = require('mongoose');

const CarbonTransactionSchema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    sourceType: {
      type: String,
      enum: ['Purchase', 'Manufacturing', 'Expense', 'Fleet']
    },
    sourceRefId: {
      type: mongoose.Schema.Types.ObjectId
    },
    emissionFactor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmissionFactor'
    },
    quantity: {
      type: Number,
      default: 0
    },
    calculatedCO2e: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    autoCalculated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CarbonTransaction', CarbonTransactionSchema);
