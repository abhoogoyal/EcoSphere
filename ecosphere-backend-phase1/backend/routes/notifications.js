const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/notificationController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', ctrl.getAll);
router.patch('/:id/read', ctrl.markRead);

module.exports = router;
