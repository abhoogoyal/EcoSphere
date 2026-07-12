const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', ctrl.getLeaderboard);

module.exports = router;
