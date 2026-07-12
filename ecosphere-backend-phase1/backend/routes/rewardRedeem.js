const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rewardController');
const auth = require('../middleware/auth');

router.use(auth);

// POST /api/rewards/:id/redeem
// NOTE: full Reward CRUD lives in Phase 1's routes/rewards.js.
// This router only adds the redeem action and should be mounted at /api/rewards
// alongside (not instead of) the Phase 1 CRUD router.
router.post('/:id/redeem', ctrl.redeem);

module.exports = router;
