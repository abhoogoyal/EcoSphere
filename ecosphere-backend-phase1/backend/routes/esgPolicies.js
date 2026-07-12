const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/esgPolicyController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', roleCheck(['Admin']), ctrl.create);
router.put('/:id', roleCheck(['Admin']), ctrl.update);
router.delete('/:id', roleCheck(['Admin']), ctrl.remove);

module.exports = router;
