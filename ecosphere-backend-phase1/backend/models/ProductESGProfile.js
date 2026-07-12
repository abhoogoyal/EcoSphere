const mongoose = require('mongoose');

const ProductESGProfileSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    carbonFootprint: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductESGProfile', ProductESGProfileSchema);
