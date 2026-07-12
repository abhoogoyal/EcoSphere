const User = require('../models/User');

// GET /api/leaderboard?limit=10&department=<id>
exports.getLeaderboard = async (req, res) => {
  try {
    const filter = { status: 'Active' };
    if (req.query.department) filter.department = req.query.department;

    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);

    const topUsers = await User.find(filter)
      .select('name email department xp points')
      .populate('department', 'name code')
      .sort({ xp: -1 })
      .limit(limit);

    const leaderboard = topUsers.map((u, i) => ({
      rank: i + 1,
      id: u._id,
      name: u.name,
      department: u.department,
      xp: u.xp,
      points: u.points,
    }));

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
