const Reward = require('../models/Reward');
const crudFactory = require('./crudFactory');

module.exports = crudFactory(Reward, 'Reward');
