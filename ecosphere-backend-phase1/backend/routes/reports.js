const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/environmental', ctrl.environmental);
router.get('/social', ctrl.social);
router.get('/governance', ctrl.governance);
router.get('/summary', ctrl.summary);
router.post('/custom', ctrl.custom);

module.exports = router;
