const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const EnvironmentalGoal = require('../models/EnvironmentalGoal');
const CarbonTransaction = require('../models/CarbonTransaction');
const CSRActivity = require('../models/CSRActivity');
const EmployeeParticipation = require('../models/EmployeeParticipation');
const Challenge = require('../models/Challenge');
const ChallengeParticipation = require('../models/ChallengeParticipation');
const ESGPolicy = require('../models/ESGPolicy');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const Audit = require('../models/Audit');
const ComplianceIssue = require('../models/ComplianceIssue');
const { calculateOverallScore } = require('../utils/scoring');

// ---------- shared filter parsing ----------
function parseFilters(source) {
  return {
    department: source.department || undefined,
    startDate: source.startDate ? new Date(source.startDate) : undefined,
    endDate: source.endDate ? new Date(source.endDate) : undefined,
    employee: source.employee || undefined,
    challenge: source.challenge || undefined,
    category: source.category || undefined,
  };
}

function dateRangeFilter(field, filters) {
  const range = {};
  if (filters.startDate) range.$gte = filters.startDate;
  if (filters.endDate) range.$lte = filters.endDate;
  return Object.keys(range).length ? { [field]: range } : {};
}

// ---------- module report builders ----------
async function buildEnvironmentalReport(filters) {
  const goalFilter = {};
  if (filters.department) goalFilter.department = filters.department;
  const goals = await EnvironmentalGoal.find(goalFilter).populate('department', 'name code');

  const txnFilter = { ...dateRangeFilter('date', filters) };
  if (filters.department) txnFilter.department = filters.department;
  const transactions = await CarbonTransaction.find(txnFilter)
    .populate('department', 'name code')
    .populate('emissionFactor');

  const totalCO2e = transactions.reduce((sum, t) => sum + (t.calculatedCO2e || 0), 0);

  return {
    summary: {
      goalCount: goals.length,
      achievedGoals: goals.filter((g) => g.status === 'Achieved').length,
      transactionCount: transactions.length,
      totalCO2e,
    },
    rows: transactions.map((t) => ({
      department: t.department ? t.department.name : '',
      sourceType: t.sourceType,
      quantity: t.quantity,
      calculatedCO2e: t.calculatedCO2e,
      date: t.date ? t.date.toISOString().slice(0, 10) : '',
      autoCalculated: t.autoCalculated,
    })),
    goals,
  };
}

async function buildSocialReport(filters) {
  const activityFilter = {};
  if (filters.department) activityFilter.department = filters.department;
  if (filters.category) activityFilter.category = filters.category;
  activityFilter.date = dateRangeFilter('date', filters).date;
  if (!activityFilter.date) delete activityFilter.date;

  const activities = await CSRActivity.find(activityFilter)
    .populate('department', 'name code')
    .populate('category', 'name');

  const activityIds = activities.map((a) => a._id);
  const participationFilter = { activity: { $in: activityIds } };
  if (filters.employee) participationFilter.employee = filters.employee;

  const participations = await EmployeeParticipation.find(participationFilter)
    .populate('employee', 'name email')
    .populate('activity', 'title');

  return {
    summary: {
      activityCount: activities.length,
      participationCount: participations.length,
      approved: participations.filter((p) => p.approvalStatus === 'Approved').length,
      pending: participations.filter((p) => p.approvalStatus === 'Pending').length,
      totalPointsAwarded: participations.reduce((sum, p) => sum + (p.pointsEarned || 0), 0),
    },
    rows: participations.map((p) => ({
      employee: p.employee ? p.employee.name : '',
      activity: p.activity ? p.activity.title : '',
      approvalStatus: p.approvalStatus,
      pointsEarned: p.pointsEarned,
      completionDate: p.completionDate ? p.completionDate.toISOString().slice(0, 10) : '',
    })),
    activities,
  };
}

async function buildGovernanceReport(filters) {
  const policies = await ESGPolicy.find({});
  const acknowledgements = await PolicyAcknowledgement.find(
    filters.employee ? { employee: filters.employee } : {}
  ).populate('employee', 'name email');

  const auditFilter = {};
  if (filters.department) auditFilter.department = filters.department;
  Object.assign(auditFilter, dateRangeFilter('auditDate', filters));
  const audits = await Audit.find(auditFilter).populate('department', 'name code');

  const auditIds = audits.map((a) => a._id);
  const issues = await ComplianceIssue.find({ audit: { $in: auditIds } })
    .populate('owner', 'name email')
    .populate('audit', 'title');

  return {
    summary: {
      policyCount: policies.length,
      acknowledgementCount: acknowledgements.length,
      auditCount: audits.length,
      openIssues: issues.filter((i) => i.status === 'Open').length,
      overdueIssues: issues.filter((i) => i.flaggedOverdue).length,
      resolvedIssues: issues.filter((i) => i.status === 'Resolved').length,
    },
    rows: issues.map((i) => ({
      audit: i.audit ? i.audit.title : '',
      severity: i.severity,
      status: i.status,
      owner: i.owner ? i.owner.name : '',
      dueDate: i.dueDate ? i.dueDate.toISOString().slice(0, 10) : '',
      flaggedOverdue: i.flaggedOverdue,
    })),
    audits,
  };
}

// ---------- export helpers ----------
function sendCSV(res, filename, rows) {
  if (!rows || !rows.length) {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
    return res.send('No data available for the selected filters.');
  }
  const parser = new Parser({ fields: Object.keys(rows[0]) });
  const csv = parser.parse(rows);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
  res.send(csv);
}

function sendPDF(res, filename, title, summary, rows) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc.fontSize(18).text(title, { underline: true });
  doc.moveDown();

  doc.fontSize(12).text('Summary', { underline: true });
  Object.entries(summary || {}).forEach(([key, value]) => {
    doc.fontSize(10).text(`${key}: ${value}`);
  });
  doc.moveDown();

  if (rows && rows.length) {
    doc.fontSize(12).text('Detail', { underline: true });
    const headers = Object.keys(rows[0]);
    doc.fontSize(9).text(headers.join(' | '));
    doc.moveDown(0.3);
    rows.slice(0, 200).forEach((row) => {
      doc.fontSize(8).text(headers.map((h) => String(row[h])).join(' | '));
    });
    if (rows.length > 200) {
      doc.moveDown();
      doc.fontSize(8).text(`...and ${rows.length - 200} more rows (see CSV export for full data).`);
    }
  }

  doc.end();
}

function respond(req, res, reportName, title, data) {
  const format = (req.query.format || req.body.format || 'json').toLowerCase();

  if (format === 'csv') return sendCSV(res, reportName, data.rows);
  if (format === 'pdf') return sendPDF(res, reportName, title, data.summary, data.rows);

  return res.json({ success: true, data });
}

// ---------- route handlers ----------
exports.environmental = async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const data = await buildEnvironmentalReport(filters);
    respond(req, res, 'environmental-report', 'Environmental Report', data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.social = async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const data = await buildSocialReport(filters);
    respond(req, res, 'social-report', 'Social Report', data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.governance = async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const data = await buildGovernanceReport(filters);
    respond(req, res, 'governance-report', 'Governance Report', data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.summary = async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const [environmental, social, governance, overallScore] = await Promise.all([
      buildEnvironmentalReport(filters),
      buildSocialReport(filters),
      buildGovernanceReport(filters),
      calculateOverallScore(),
    ]);

    const data = {
      summary: {
        ...environmental.summary,
        ...social.summary,
        ...governance.summary,
        overallESGScore: overallScore.totalScore,
      },
      rows: [
        ...environmental.rows.map((r) => ({ module: 'Environmental', ...r })),
        ...social.rows.map((r) => ({ module: 'Social', ...r })),
        ...governance.rows.map((r) => ({ module: 'Governance', ...r })),
      ],
    };

    respond(req, res, 'summary-report', 'ESG Summary Report', data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/reports/custom
// Body: { modules: ['environmental','social','governance'], department, startDate, endDate,
//         employee, challenge, category, format }
exports.custom = async (req, res) => {
  try {
    const filters = parseFilters(req.body);
    const modules = Array.isArray(req.body.modules) && req.body.modules.length
      ? req.body.modules
      : ['environmental', 'social', 'governance'];

    const results = {};
    if (modules.includes('environmental')) results.environmental = await buildEnvironmentalReport(filters);
    if (modules.includes('social')) results.social = await buildSocialReport(filters);
    if (modules.includes('governance')) results.governance = await buildGovernanceReport(filters);

    const summary = Object.values(results).reduce(
      (acc, r) => ({ ...acc, ...r.summary }),
      {}
    );
    const rows = Object.entries(results).flatMap(([moduleName, r]) =>
      r.rows.map((row) => ({ module: moduleName, ...row }))
    );

    respond(req, res, 'custom-report', 'Custom ESG Report', { summary, rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
