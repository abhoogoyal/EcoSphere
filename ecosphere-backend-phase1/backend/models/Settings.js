const mongoose = require('mongoose');

// NOTE: Also an ADDITION to the Section 0 contract, mirroring the plan's own
// line: "weights configurable per org via a Settings collection, default as
// above." There's exactly one Settings doc for the whole org (singleton).

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'global', unique: true },
    scoringWeights: {
      environmental: { type: Number, default: 0.4 },
      social: { type: Number, default: 0.3 },
      governance: { type: Number, default: 0.3 },
    },
    // Global toggle: CSRActivity itself has no evidenceRequired field in the
    // contract (only Challenge does), so this is the org-wide switch used by
    // employeeParticipationController's approve endpoint.
    requireEvidenceForCSR: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
