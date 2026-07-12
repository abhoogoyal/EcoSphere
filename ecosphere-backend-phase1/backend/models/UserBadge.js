const mongoose = require('mongoose');

// NOTE: This model is an ADDITION to the Section 0 contract.
// The original contract's User/Badge schemas have no join table to record
// "which user unlocked which badge" — without it, checkAndAwardBadges() has
// nowhere to persist state and would re-award the same badge every time.
// This does not modify any existing field on User or Badge, so it is safe
// to drop into models/ alongside Phase 1's files with zero merge conflict.

const userBadgeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
    awardedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

module.exports = mongoose.model('UserBadge', userBadgeSchema);
