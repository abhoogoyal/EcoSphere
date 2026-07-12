const Challenge = require('../models/Challenge');

// Allowed lifecycle transitions: Draft→Active→UnderReview→Completed, or →Archived from any state.
const ALLOWED_TRANSITIONS = {
  Draft: ['Active', 'Archived'],
  Active: ['UnderReview', 'Archived'],
  UnderReview: ['Completed', 'Archived'],
  Completed: ['Archived'],
  Archived: [], // terminal
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const challenges = await Challenge.find(filter).populate('category', 'name type');
    res.json({ success: true, data: challenges });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('category', 'name type');
    if (!challenge) return res.status(404).json({ success: false, error: 'Challenge not found' });
    res.json({ success: true, data: challenge });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = { ...req.body, status: req.body.status || 'Draft' };
    const challenge = await Challenge.create(body);
    res.status(201).json({ success: true, data: challenge });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /api/challenges/:id
// If `status` is included in the body, it's validated against ALLOWED_TRANSITIONS.
// Other fields are updated freely.
exports.update = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ success: false, error: 'Challenge not found' });

    if (req.body.status && req.body.status !== challenge.status) {
      const allowedNext = ALLOWED_TRANSITIONS[challenge.status] || [];
      if (!allowedNext.includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid transition: ${challenge.status} → ${req.body.status}. Allowed: ${
            allowedNext.length ? allowedNext.join(', ') : 'none (terminal state)'
          }`,
        });
      }
    }

    Object.assign(challenge, req.body);
    await challenge.save();

    res.json({ success: true, data: challenge });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) return res.status(404).json({ success: false, error: 'Challenge not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
