const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require('../controllers/departmentController');
const { protect } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router
  .route('/')
  .get(protect, getAll)
  .post(protect, roleCheck(['Admin']), createOne);

router
  .route('/:id')
  .get(protect, getOne)
  .put(protect, roleCheck(['Admin']), updateOne)
  .delete(protect, roleCheck(['Admin']), deleteOne);

module.exports = router;
