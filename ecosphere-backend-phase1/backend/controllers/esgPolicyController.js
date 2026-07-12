const ESGPolicy = require('../models/ESGPolicy');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const policies = await ESGPolicy.find(filter).sort({ effectiveDate: -1 });
    res.json({ success: true, data: policies });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const policy = await ESGPolicy.findById(req.params.id);
    if (!policy) return res.status(404).json({ success: false, error: 'Policy not found' });
    res.json({ success: true, data: policy });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const policy = await ESGPolicy.create(req.body);
    res.status(201).json({ success: true, data: policy });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const policy = await ESGPolicy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!policy) return res.status(404).json({ success: false, error: 'Policy not found' });
    res.json({ success: true, data: policy });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const policy = await ESGPolicy.findByIdAndDelete(req.params.id);
    if (!policy) return res.status(404).json({ success: false, error: 'Policy not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
