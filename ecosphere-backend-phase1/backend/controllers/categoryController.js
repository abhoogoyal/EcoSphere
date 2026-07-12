const Category = require('../models/Category');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Category, 'Category');
