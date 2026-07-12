const Badge = require('../models/Badge');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Badge, 'Badge');
