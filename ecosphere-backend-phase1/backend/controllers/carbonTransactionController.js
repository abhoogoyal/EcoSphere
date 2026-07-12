const CarbonTransaction = require('../models/CarbonTransaction');
const EmissionFactor = require('../models/EmissionFactor');

// GET /api/carbon-transactions
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.sourceType) filter.sourceType = req.query.sourceType;

    const transactions = await CarbonTransaction.find(filter)
      .populate('department', 'name code')
      .populate('emissionFactor')
      .sort({ date: -1 });

    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/carbon-transactions/:id
exports.getOne = async (req, res) => {
  try {
    const txn = await CarbonTransaction.findById(req.params.id)
      .populate('department', 'name code')
      .populate('emissionFactor');
    if (!txn) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: txn });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/carbon-transactions  (manual entry — calculatedCO2e provided or derived)
exports.create = async (req, res) => {
  try {
    const body = { ...req.body, autoCalculated: false };

    if (!body.calculatedCO2e && body.emissionFactor && body.quantity) {
      const factor = await EmissionFactor.findById(body.emissionFactor);
      if (factor) body.calculatedCO2e = factor.factorValue * body.quantity;
    }

    const txn = await CarbonTransaction.create(body);
    res.status(201).json({ success: true, data: txn });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// POST /api/carbon-transactions/auto-calculate
// Looks up EmissionFactor, multiplies by quantity, links to source record.
exports.autoCalculate = async (req, res) => {
  try {
    const { department, sourceType, sourceRefId, emissionFactor, quantity, date } = req.body;

    if (!emissionFactor || quantity === undefined) {
      return res
        .status(400)
        .json({ success: false, error: 'emissionFactor and quantity are required' });
    }

    const factor = await EmissionFactor.findById(emissionFactor);
    if (!factor) {
      return res.status(404).json({ success: false, error: 'EmissionFactor not found' });
    }

    const calculatedCO2e = factor.factorValue * quantity;

    const txn = await CarbonTransaction.create({
      department,
      sourceType,
      sourceRefId,
      emissionFactor,
      quantity,
      calculatedCO2e,
      date: date || new Date(),
      autoCalculated: true,
    });

    res.status(201).json({ success: true, data: txn });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /api/carbon-transactions/:id
exports.update = async (req, res) => {
  try {
    const txn = await CarbonTransaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!txn) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: txn });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /api/carbon-transactions/:id
exports.remove = async (req, res) => {
  try {
    const txn = await CarbonTransaction.findByIdAndDelete(req.params.id);
    if (!txn) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
