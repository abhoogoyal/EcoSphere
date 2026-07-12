const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const User = require('../models/User');
const ChallengeParticipation = require('../models/ChallengeParticipation');
const { createNotification } = require('./notify');

/**
 * Checks all Badges' unlockRule against a user's current xp / completed
 * challenge count, and auto-assigns any newly-unlocked badge.
 * Call this after any XP change or challenge-completion approval.
 *
 * @param {String} userId
 * @returns {Promise<Array>} newly awarded badges (Badge docs)
 */
async function checkAndAwardBadges(userId) {
  const user = await User.findById(userId);
  if (!user) return [];

  const allBadges = await Badge.find({});
  if (!allBadges.length) return [];

  const alreadyAwarded = await UserBadge.find({ user: userId }).select('badge');
  const alreadyAwardedIds = new Set(alreadyAwarded.map((ub) => ub.badge.toString()));

  const candidateBadges = allBadges.filter(
    (b) => !alreadyAwardedIds.has(b._id.toString())
  );
  if (!candidateBadges.length) return [];

  let completedChallengeCount = null; // lazy-computed, only if needed

  const newlyAwarded = [];

  for (const badge of candidateBadges) {
    const rule = badge.unlockRule || {};
    let unlocked = false;

    if (rule.type === 'XP') {
      unlocked = (user.xp || 0) >= (rule.threshold || 0);
    } else if (rule.type === 'ChallengeCount') {
      if (completedChallengeCount === null) {
        completedChallengeCount = await ChallengeParticipation.countDocuments({
          employee: userId,
          approvalStatus: 'Approved',
        });
      }
      unlocked = completedChallengeCount >= (rule.threshold || 0);
    }

    if (unlocked) {
      try {
        await UserBadge.create({ user: userId, badge: badge._id });
        newlyAwarded.push(badge);
        await createNotification(
          userId,
          'BadgeUnlocked',
          `You unlocked the "${badge.name}" badge!`
        );
      } catch (err) {
        // unique index race (double-trigger) — ignore duplicate key errors
        if (err.code !== 11000) throw err;
      }
    }
  }

  return newlyAwarded;
}

module.exports = { checkAndAwardBadges };
