const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/scoreController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/department/:id', ctrl.getDepartmentScore);
router.get('/overall', ctrl.getOverallScore);

module.exports = router;
