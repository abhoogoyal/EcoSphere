const ComplianceIssue = require('../models/ComplianceIssue');
const { createNotification } = require('../utils/notify');

// Recomputes flaggedOverdue for a set of issues (on-read check, no cron needed).
async function refreshOverdueFlags(issues) {
  const now = new Date();
  const updates = [];

  for (const issue of issues) {
    const shouldBeOverdue = issue.status === 'Open' && issue.dueDate && issue.dueDate < now;
    if (issue.flaggedOverdue !== shouldBeOverdue) {
      issue.flaggedOverdue = shouldBeOverdue;
      updates.push(issue.save());
    }
  }

  if (updates.length) await Promise.all(updates);
  return issues;
}

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.audit) filter.audit = req.query.audit;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.severity) filter.severity = req.query.severity;
    if (req.query.owner) filter.owner = req.query.owner;

    let issues = await ComplianceIssue.find(filter)
      .populate('audit', 'title department status')
      .populate('owner', 'name email');

    issues = await refreshOverdueFlags(issues);

    res.json({ success: true, data: issues });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    let issue = await ComplianceIssue.findById(req.params.id)
      .populate('audit', 'title department status')
      .populate('owner', 'name email');
    if (!issue) return res.status(404).json({ success: false, error: 'Compliance issue not found' });

    [issue] = await refreshOverdueFlags([issue]);

    res.json({ success: true, data: issue });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/compliance-issues — requires owner + dueDate.
exports.create = async (req, res) => {
  try {
    if (!req.body.owner || !req.body.dueDate) {
      return res
        .status(400)
        .json({ success: false, error: 'owner and dueDate are required to raise a compliance issue' });
    }

    const body = {
      ...req.body,
      status: req.body.status || 'Open',
      flaggedOverdue: false,
    };

    const issue = await ComplianceIssue.create(body);

    await createNotification(
      issue.owner,
      'ComplianceIssue',
      `A new compliance issue was raised and assigned to you: "${issue.description || issue._id}"`
    );

    res.status(201).json({ success: true, data: issue });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const issue = await ComplianceIssue.findById(req.params.id);
    if (!issue) return res.status(404).json({ success: false, error: 'Compliance issue not found' });

    Object.assign(issue, req.body);

    // Resolving/moving off Open clears the overdue flag; otherwise recompute.
    if (issue.status !== 'Open') {
      issue.flaggedOverdue = false;
    } else {
      issue.flaggedOverdue = !!(issue.dueDate && issue.dueDate < new Date());
    }

    await issue.save();
    res.json({ success: true, data: issue });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const issue = await ComplianceIssue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ success: false, error: 'Compliance issue not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
