const EmployeeParticipation = require('../models/EmployeeParticipation');
const CSRActivity = require('../models/CSRActivity');
const Settings = require('../models/Settings');
const { createNotification } = require('../utils/notify');

// Default points awarded per approved CSR participation when pointsEarned isn't
// explicitly provided on approval. Kept simple/configurable inline.
const DEFAULT_CSR_POINTS = 10;

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.employee) filter.employee = req.query.employee;
    if (req.query.activity) filter.activity = req.query.activity;
    if (req.query.approvalStatus) filter.approvalStatus = req.query.approvalStatus;

    const participations = await EmployeeParticipation.find(filter)
      .populate('employee', 'name email department')
      .populate('activity', 'title status department');

    res.json({ success: true, data: participations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const participation = await EmployeeParticipation.findById(req.params.id)
      .populate('employee', 'name email department')
      .populate('activity', 'title status department');
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const body = { ...req.body, approvalStatus: 'Pending' };
    const participation = await EmployeeParticipation.create(body);
    res.status(201).json({ success: true, data: participation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const participation = await EmployeeParticipation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: participation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const participation = await EmployeeParticipation.findByIdAndDelete(req.params.id);
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/employee-participation/:id/approve
// Body: { approvalStatus: 'Approved' | 'Rejected', pointsEarned? }
// Blocks approval if evidence is required (org setting) and no proofUrl attached.
// Awards pointsEarned on approval.
exports.approve = async (req, res) => {
  try {
    const { approvalStatus, pointsEarned } = req.body;

    if (!['Approved', 'Rejected'].includes(approvalStatus)) {
      return res
        .status(400)
        .json({ success: false, error: 'approvalStatus must be Approved or Rejected' });
    }

    const participation = await EmployeeParticipation.findById(req.params.id);
    if (!participation)
      return res.status(404).json({ success: false, error: 'Participation not found' });

    if (approvalStatus === 'Approved') {
      const settings = await Settings.findOne({ key: 'global' });
      const evidenceRequired = settings ? settings.requireEvidenceForCSR : true;

      if (evidenceRequired && !participation.proofUrl) {
        return res.status(400).json({
          success: false,
          error: 'Cannot approve: evidence (proofUrl) is required but missing',
        });
      }

      participation.pointsEarned = pointsEarned ?? DEFAULT_CSR_POINTS;
      participation.completionDate = new Date();
    }

    participation.approvalStatus = approvalStatus;
    await participation.save();

    const activity = await CSRActivity.findById(participation.activity);
    await createNotification(
      participation.employee,
      'CSRApproval',
      `Your participation in "${activity ? activity.title : 'a CSR activity'}" was ${approvalStatus.toLowerCase()}.`
    );

    res.json({ success: true, data: participation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
