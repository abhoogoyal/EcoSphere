const EmissionFactor = require('../models/EmissionFactor');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(EmissionFactor, 'EmissionFactor');
