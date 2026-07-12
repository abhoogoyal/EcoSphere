const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/carbonTransactionController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.post('/auto-calculate', ctrl.autoCalculate);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
