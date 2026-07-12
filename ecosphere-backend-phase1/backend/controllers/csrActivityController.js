const CSRActivity = require('../models/CSRActivity');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const activities = await CSRActivity.find(filter)
      .populate('category', 'name type')
      .populate('department', 'name code')
      .sort({ date: -1 });

    res.json({ success: true, data: activities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const activity = await CSRActivity.findById(req.params.id)
      .populate('category', 'name type')
      .populate('department', 'name code');
    if (!activity) return res.status(404).json({ success: false, error: 'Activity not found' });
    res.json({ success: true, data: activity });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const activity = await CSRActivity.create(req.body);
    res.status(201).json({ success: true, data: activity });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const activity = await CSRActivity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) return res.status(404).json({ success: false, error: 'Activity not found' });
    res.json({ success: true, data: activity });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const activity = await CSRActivity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ success: false, error: 'Activity not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
