const databaseConfig = require('./config/database');
const Sequelize = require('sequelize');

module.exports = new Sequelize(databaseConfig);