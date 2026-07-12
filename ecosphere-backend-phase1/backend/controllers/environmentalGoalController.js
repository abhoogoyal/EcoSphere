const EnvironmentalGoal = require('../models/EnvironmentalGoal');
const CarbonTransaction = require('../models/CarbonTransaction');
const Department = require('../models/Department');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.status) filter.status = req.query.status;

    const goals = await EnvironmentalGoal.find(filter).populate('department', 'name code');
    res.json({ success: true, data: goals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const goal = await EnvironmentalGoal.findById(req.params.id).populate('department', 'name code');
    if (!goal) return res.status(404).json({ success: false, error: 'Goal not found' });
    res.json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const goal = await EnvironmentalGoal.create(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const goal = await EnvironmentalGoal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!goal) return res.status(404).json({ success: false, error: 'Goal not found' });
    res.json({ success: true, data: goal });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const goal = await EnvironmentalGoal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ success: false, error: 'Goal not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/environmental/dashboard
// Aggregates goal progress + total emissions by department.
exports.dashboard = async (req, res) => {
  try {
    const departments = await Department.find({ status: 'Active' });

    const results = await Promise.all(
      departments.map(async (dept) => {
        const goals = await EnvironmentalGoal.find({ department: dept._id });
        const goalSummary = {
          total: goals.length,
          onTrack: goals.filter((g) => g.status === 'OnTrack').length,
          atRisk: goals.filter((g) => g.status === 'AtRisk').length,
          achieved: goals.filter((g) => g.status === 'Achieved').length,
          missed: goals.filter((g) => g.status === 'Missed').length,
        };

        const txns = await CarbonTransaction.find({ department: dept._id });
        const totalCO2e = txns.reduce((sum, t) => sum + (t.calculatedCO2e || 0), 0);

        return {
          department: { id: dept._id, name: dept.name, code: dept.code },
          goalSummary,
          totalCO2e,
          transactionCount: txns.length,
        };
      })
    );

    const orgTotalCO2e = results.reduce((sum, r) => sum + r.totalCO2e, 0);

    res.json({ success: true, data: { departments: results, orgTotalCO2e } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
