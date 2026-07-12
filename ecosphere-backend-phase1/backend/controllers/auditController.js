const Audit = require('../models/Audit');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.status) filter.status = req.query.status;

    const audits = await Audit.find(filter)
      .populate('department', 'name code')
      .populate('auditor', 'name email')
      .sort({ auditDate: -1 });

    res.json({ success: true, data: audits });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id)
      .populate('department', 'name code')
      .populate('auditor', 'name email');
    if (!audit) return res.status(404).json({ success: false, error: 'Audit not found' });
    res.json({ success: true, data: audit });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json({ success: true, data: audit });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!audit) return res.status(404).json({ success: false, error: 'Audit not found' });
    res.json({ success: true, data: audit });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    if (!audit) return res.status(404).json({ success: false, error: 'Audit not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
