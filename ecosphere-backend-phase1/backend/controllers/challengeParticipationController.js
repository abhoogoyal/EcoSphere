const ChallengeParticipation = require('../models/ChallengeParticipation');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { createNotification } = require('../utils/notify');
const { checkAndAwardBadges } = require('../utils/badges');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.employee) filter.employee = req.query.employee;
    if (req.query.challenge) filter.challenge = req.query.challenge;
    if (req.query.approvalStatus) filter.approvalStatus = req.query.approvalStatus;

    const participations = await ChallengeParticipation.find(filter)
      .populate('employee', 'name email department xp')
      .populate('challenge', 'title xp status evidenceRequired');

    res.json({ success: true, data: participations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const participation = await ChallengeParticipation.findById(req.params.id)
      .populate('employee', 'name email department xp')
      .populate('challenge', 'title xp status evidenceRequired');
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = { ...req.body, approvalStatus: 'Pending' };
    const participation = await ChallengeParticipation.create(body);
    res.status(201).json({ success: true, data: participation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const participation = await ChallengeParticipation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const participation = await ChallengeParticipation.findByIdAndDelete(req.params.id);
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/challenge-participation/:id/approve
// Body: { approvalStatus: 'Approved' | 'Rejected' }
// Blocks approval if the challenge requires evidence and no proofUrl attached.
// Awards XP on approval, updates user.xp, then runs badge auto-award.
exports.approve = async (req, res) => {
  try {
    const { approvalStatus } = req.body;

    if (!['Approved', 'Rejected'].includes(approvalStatus)) {
      return res
        .status(400)
        .json({ success: false, error: 'approvalStatus must be Approved or Rejected' });
    }

    const participation = await ChallengeParticipation.findById(req.params.id);
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });

    const challenge = await Challenge.findById(participation.challenge);
    if (!challenge) return res.status(404).json({ success: false, error: 'Challenge not found' });

    let newlyAwardedBadges = [];

    if (approvalStatus === 'Approved') {
      if (challenge.evidenceRequired && !participation.proofUrl) {
        return res.status(400).json({
          success: false,
          error: 'Cannot approve: evidence (proofUrl) is required but missing',
        });
      }

      participation.xpAwarded = challenge.xp || 0;

      await User.findByIdAndUpdate(participation.employee, {
        $inc: { xp: participation.xpAwarded },
      });

      newlyAwardedBadges = await checkAndAwardBadges(participation.employee);
    }

    participation.approvalStatus = approvalStatus;
    await participation.save();

    await createNotification(
      participation.employee,
      'ChallengeApproval',
      `Your submission for "${challenge.title}" was ${approvalStatus.toLowerCase()}.`
    );

    res.json({
      success: true,
      data: { participation, newlyAwardedBadges },
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
