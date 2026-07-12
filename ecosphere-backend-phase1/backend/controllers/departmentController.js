const Department = require('../models/Department');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Department, 'Department', {
  populate: [
    { path: 'head', select: 'name email role' },
    { path: 'parentDepartment', select: 'name code' }
  ]
});
