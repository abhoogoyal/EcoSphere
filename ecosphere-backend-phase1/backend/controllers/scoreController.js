const { calculateDepartmentScore, calculateOverallScore } = require('../utils/scoring');

// GET /api/scores/department/:id?period=YYYY-MM
exports.getDepartmentScore = async (req, res) => {
  try {
    const score = await calculateDepartmentScore(req.params.id, req.query.period);
    res.json({ success: true, data: score });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/scores/overall?period=YYYY-MM
exports.getOverallScore = async (req, res) => {
  try {
    const score = await calculateOverallScore(req.query.period);
    res.json({ success: true, data: score });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
