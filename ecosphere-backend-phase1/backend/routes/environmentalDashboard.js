const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/environmentalGoalController');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/environmental/dashboard
router.get('/dashboard', ctrl.dashboard);

module.exports = router;
