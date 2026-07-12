const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeParticipationController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create); // any authenticated employee logs their own participation
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.post('/:id/approve', roleCheck(['Admin', 'DeptHead']), ctrl.approve);

module.exports = router;
