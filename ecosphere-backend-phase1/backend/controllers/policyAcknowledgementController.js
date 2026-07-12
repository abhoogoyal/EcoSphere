const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.employee) filter.employee = req.query.employee;
    if (req.query.policy) filter.policy = req.query.policy;

    const acks = await PolicyAcknowledgement.find(filter)
      .populate('employee', 'name email department')
      .populate('policy', 'title version status');

    res.json({ success: true, data: acks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const ack = await PolicyAcknowledgement.findById(req.params.id)
      .populate('employee', 'name email department')
      .populate('policy', 'title version status');
    if (!ack) return res.status(404).json({ success: false, error: 'Acknowledgement not found' });
    res.json({ success: true, data: ack });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/policy-acknowledgements — an employee acknowledging a policy
exports.create = async (req, res) => {
  try {
    const body = { ...req.body, acknowledgedAt: req.body.acknowledgedAt || new Date() };
    const ack = await PolicyAcknowledgement.create(body);
    res.status(201).json({ success: true, data: ack });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const ack = await PolicyAcknowledgement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ack) return res.status(404).json({ success: false, error: 'Acknowledgement not found' });
    res.json({ success: true, data: ack });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const ack = await PolicyAcknowledgement.findByIdAndDelete(req.params.id);
    if (!ack) return res.status(404).json({ success: false, error: 'Acknowledgement not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
