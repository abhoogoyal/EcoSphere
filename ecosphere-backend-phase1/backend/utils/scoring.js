// utils/scoring.js
// Placeholder for Phase 4 (Reporting & Scoring Engine).
// Implements: Overall ESG Score = (EnvironmentalScore * 0.4) + (SocialScore * 0.3) + (GovernanceScore * 0.3)
// Weights should eventually be configurable via a Settings collection; defaults below match Section 0.

const DEFAULT_WEIGHTS = {
  environmental: 0.4,
  social: 0.3,
  governance: 0.3
};

function calculateOverallScore(
  { environmentalScore = 0, socialScore = 0, governanceScore = 0 },
  weights = DEFAULT_WEIGHTS
) {
  return (
    environmentalScore * weights.environmental +
    socialScore * weights.social +
    governanceScore * weights.governance
  );
}

module.exports = { calculateOverallScore, DEFAULT_WEIGHTS };
